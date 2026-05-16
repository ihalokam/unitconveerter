"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
    Upload,
    FileImage,
    Trash2,
    Download,
    GripVertical,
    ChevronUp,
    ChevronDown,
    RotateCw,
    ZoomIn,
    Printer,
    X,
    CheckCircle,
    AlertCircle,
    Settings,
    Layers,
    FileOutput,
    Moon,
    Sun,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageItem {
    id: string;
    file: File;
    url: string;
    rotation: number;
    name: string;
    sizeKB: number;
}

type PageSize = "A4" | "Letter" | "Legal" | "A3" | "fit";
type Orientation = "portrait" | "landscape" | "auto";
type Quality = "low" | "medium" | "high";
type Margin = "none" | "small" | "normal" | "large";

interface PrintOptions {
    pageSize: PageSize;
    orientation: Orientation;
    quality: Quality;
    margin: Margin;
    fitToPage: boolean;
    grayscale: boolean;
    filename: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZES: Record<PageSize, [number, number]> = {
    A4: [595, 842],
    Letter: [612, 792],
    Legal: [612, 1008],
    A3: [842, 1191],
    fit: [0, 0],
};

const MARGIN_PX: Record<Margin, number> = {
    none: 0,
    small: 14,
    normal: 28,
    large: 56,
};

const QUALITY_SCALE: Record<Quality, number> = {
    low: 0.6,
    medium: 0.82,
    high: 0.95,
};

// ─── Tiny PDF Writer (no lib, browser-only) ──────────────────────────────────

function buildPDF(
    pages: { dataUrl: string; w: number; h: number }[],
    options: PrintOptions
): Uint8Array {
    const enc = new TextEncoder();
    const parts: Uint8Array[] = [];
    let offset = 0;
    const offsets: number[] = [];

    const push = (s: string) => {
        const b = enc.encode(s);
        parts.push(b);
        offset += b.length;
    };

    const pushRaw = (b: Uint8Array) => {
        parts.push(b);
        offset += b.length;
    };

    push("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n");

    // We'll collect image xobject streams and their object ids
    const imgObjIds: number[] = [];
    const imgStreams: { id: number; stream: Uint8Array; w: number; h: number }[] = [];

    let objCount = 1; // 1-based

    // obj 1 = catalog, 2 = pages node, then images and page objects
    // We'll do a two-pass: first assign ids, then write

    const catalogId = objCount++;
    const pagesNodeId = objCount++;

    for (let i = 0; i < pages.length; i++) {
        imgObjIds.push(objCount++);
    }
    const pageIds: number[] = [];
    for (let i = 0; i < pages.length; i++) {
        pageIds.push(objCount++);
    }

    // ── Write Catalog ──
    offsets[catalogId] = offset;
    push(`${catalogId} 0 obj\n<</Type /Catalog /Pages ${pagesNodeId} 0 R>>\nendobj\n`);

    // ── Write Pages Node ──
    offsets[pagesNodeId] = offset;
    push(
        `${pagesNodeId} 0 obj\n<</Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length}>>\nendobj\n`
    );

    // ── Write Images ──
    for (let i = 0; i < pages.length; i++) {
        const { dataUrl, w, h } = pages[i];
        // strip header, decode base64
        const base64 = dataUrl.split(",")[1];
        const binaryStr = atob(base64);
        const imgBytes = new Uint8Array(binaryStr.length);
        for (let j = 0; j < binaryStr.length; j++) imgBytes[j] = binaryStr.charCodeAt(j);

        const id = imgObjIds[i];
        offsets[id] = offset;
        push(
            `${id} 0 obj\n<</Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length}>>\nstream\n`
        );
        pushRaw(imgBytes);
        push("\nendstream\nendobj\n");
    }

    // ── Write Pages ──
    for (let i = 0; i < pages.length; i++) {
        const { w: iw, h: ih } = pages[i];
        const imgId = imgObjIds[i];
        const pageId = pageIds[i];

        let pw: number, ph: number;
        if (options.pageSize === "fit") {
            pw = iw;
            ph = ih;
        } else {
            [pw, ph] = PAGE_SIZES[options.pageSize];
            if (options.orientation === "landscape" || (options.orientation === "auto" && iw > ih)) {
                [pw, ph] = [ph, pw];
            }
        }

        const mg = MARGIN_PX[options.margin];
        const availW = pw - mg * 2;
        const availH = ph - mg * 2;

        let drawW: number, drawH: number, dx: number, dy: number;
        if (options.fitToPage) {
            const scale = Math.min(availW / iw, availH / ih);
            drawW = iw * scale;
            drawH = ih * scale;
            dx = mg + (availW - drawW) / 2;
            dy = mg + (availH - drawH) / 2;
        } else {
            drawW = Math.min(iw, availW);
            drawH = Math.min(ih, availH);
            dx = mg;
            dy = mg + (availH - drawH);
        }

        const content = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /Im${i} Do Q`;
        const contentBytes = enc.encode(content);

        // content stream obj
        const contentId = objCount++;
        offsets[contentId] = offset;
        push(
            `${contentId} 0 obj\n<</Length ${contentBytes.length}>>\nstream\n`
        );
        pushRaw(contentBytes);
        push("\nendstream\nendobj\n");

        offsets[pageId] = offset;
        push(
            `${pageId} 0 obj\n<</Type /Page /Parent ${pagesNodeId} 0 R /MediaBox [0 0 ${pw.toFixed(2)} ${ph.toFixed(2)}] /Contents ${contentId} 0 R /Resources <</XObject <</Im${i} ${imgId} 0 R>>>>>>\nendobj\n`
        );
    }

    // ── xref + trailer ──
    const xrefOffset = offset;
    const totalObjs = objCount; // all ids 1-based, total is objCount-1 objects + 1 for free
    push(`xref\n0 ${totalObjs}\n`);
    push("0000000000 65535 f \n");
    for (let id = 1; id < totalObjs; id++) {
        push(`${(offsets[id] ?? 0).toString().padStart(10, "0")} 00000 n \n`);
    }
    push(
        `trailer\n<</Size ${totalObjs} /Root ${catalogId} 0 R>>\nstartxref\n${xrefOffset}\n%%EOF\n`
    );

    // Combine
    const total = parts.reduce((s, p) => s + p.length, 0);
    const out = new Uint8Array(total);
    let pos = 0;
    for (const p of parts) {
        out.set(p, pos);
        pos += p.length;
    }
    return out;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImageToPdf() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const [preview, setPreview] = useState<ImageItem | null>(null);
    const [showSettings, setShowSettings] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState("");
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dark, setDark] = useState(false);

    const [opts, setOpts] = useState<PrintOptions>({
        pageSize: "A4",
        orientation: "portrait",
        quality: "high",
        margin: "normal",
        fitToPage: true,
        grayscale: false,
        filename: "images-to-pdf",
    });

    const dropRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const dragItem = useRef<string | null>(null);

    // ── Dark mode toggle ──
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    // ── File ingestion ──
    const ingestFiles = useCallback((files: FileList | File[]) => {
        const valid = Array.from(files).filter((f) =>
            f.type.startsWith("image/")
        );
        if (!valid.length) return;
        const items: ImageItem[] = valid.map((f) => ({
            id: crypto.randomUUID(),
            file: f,
            url: URL.createObjectURL(f),
            rotation: 0,
            name: f.name,
            sizeKB: Math.round(f.size / 1024),
        }));
        setImages((prev) => [...prev, ...items]);
        setPdfBlob(null);
        setError(null);
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            ingestFiles(e.dataTransfer.files);
        },
        [ingestFiles]
    );

    // ── Reorder ──
    const moveItem = (fromId: string, toId: string) => {
        setImages((prev) => {
            const arr = [...prev];
            const from = arr.findIndex((i) => i.id === fromId);
            const to = arr.findIndex((i) => i.id === toId);
            if (from === -1 || to === -1) return prev;
            const [item] = arr.splice(from, 1);
            arr.splice(to, 0, item);
            return arr;
        });
    };

    const shift = (id: string, dir: -1 | 1) => {
        setImages((prev) => {
            const arr = [...prev];
            const idx = arr.findIndex((i) => i.id === id);
            const next = idx + dir;
            if (next < 0 || next >= arr.length) return prev;
            [arr[idx], arr[next]] = [arr[next], arr[idx]];
            return arr;
        });
        setPdfBlob(null);
    };

    const rotate = (id: string) => {
        setImages((prev) =>
            prev.map((img) =>
                img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
            )
        );
        setPdfBlob(null);
    };

    const remove = (id: string) => {
        setImages((prev) => {
            const img = prev.find((i) => i.id === id);
            if (img) URL.revokeObjectURL(img.url);
            return prev.filter((i) => i.id !== id);
        });
        setPdfBlob(null);
    };

    const clearAll = () => {
        images.forEach((img) => URL.revokeObjectURL(img.url));
        setImages([]);
        setPdfBlob(null);
        setError(null);
    };

    // ── Processing ──
    const renderImageToJpeg = (
        img: HTMLImageElement,
        rotation: number,
        quality: number,
        grayscale: boolean
    ): Promise<{ dataUrl: string; w: number; h: number }> => {
        return new Promise((resolve) => {
            const swapped = rotation === 90 || rotation === 270;
            const w = swapped ? img.naturalHeight : img.naturalWidth;
            const h = swapped ? img.naturalWidth : img.naturalHeight;
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d")!;
            if (grayscale) {
                ctx.filter = "grayscale(1)";
            }
            ctx.save();
            ctx.translate(w / 2, h / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
            ctx.restore();
            const dataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve({ dataUrl, w, h });
            canvas.width = 0;
            canvas.height = 0;
        });
    };

    const loadImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((res, rej) => {
            const img = new Image();
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = url;
        });

    const generate = async () => {
        if (!images.length) return;
        setProcessing(true);
        setPdfBlob(null);
        setError(null);
        setProgress(0);

        const PROCESSING_STEPS = images.length;
        const EXTRA_SECONDS = 10;
        const startTime = Date.now();

        try {
            const pages: { dataUrl: string; w: number; h: number }[] = [];
            const quality = QUALITY_SCALE[opts.quality];

            for (let i = 0; i < images.length; i++) {
                setProgressLabel(`Processing image ${i + 1} of ${images.length}…`);
                const imgEl = await loadImage(images[i].url);
                const page = await renderImageToJpeg(
                    imgEl,
                    images[i].rotation,
                    quality,
                    opts.grayscale
                );
                pages.push(page);

                // progress 0→80% over actual image processing
                setProgress(Math.round(((i + 1) / PROCESSING_STEPS) * 80));
                await new Promise((r) => setTimeout(r, 0)); // yield to UI
            }

            setProgressLabel("Building PDF…");
            setProgress(85);

            // Build PDF in a small delay to let UI update
            await new Promise((r) => setTimeout(r, 80));
            const pdfBytes = buildPDF(pages, opts);
            const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });

            const elapsedMs = Date.now() - startTime;
            const remainMs = Math.max(0, EXTRA_SECONDS * 1000 - elapsedMs);

            // Animate remaining progress 85→100 over remainMs
            const steps = 30;
            const stepMs = remainMs / steps;
            for (let s = 0; s <= steps; s++) {
                setProgress(85 + Math.round((s / steps) * 15));
                setProgressLabel(
                    s < steps
                        ? `Finalizing… ${(((steps - s) * stepMs) / 1000).toFixed(1)}s`
                        : "Done!"
                );
                await new Promise((r) => setTimeout(r, stepMs));
            }

            setPdfBlob(blob);
        } catch (e) {
            setError(String(e));
        } finally {
            setProcessing(false);
            setProgress(0);
        }
    };

    const download = () => {
        if (!pdfBlob) return;
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${opts.filename || "output"}.pdf`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    // ─── Render ───────────────────────────────────────────────────────────────

    const isEmpty = images.length === 0;

    return (
        <div
            className={`transition-colors duration-300 ${dark ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}
        >
            {/* ── Header ── */}
            <header
                className={`sticky top-0 z-30 border-b backdrop-blur-sm ${dark ? "bg-gray-950/90 border-gray-800" : "bg-slate-50/90 border-slate-200"}`}
            >
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <FileOutput size={16} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold leading-none">Image → PDF</h1>
                            <p className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                100% on-device · private
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {images.length > 0 && (
                            <button
                                onClick={() => setShowSettings((v) => !v)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${showSettings ? "bg-blue-600 text-white border-blue-600" : dark ? "border-gray-700 hover:bg-gray-800" : "border-slate-200 hover:bg-slate-100"}`}
                            >
                                <Settings size={13} />
                                Settings
                            </button>
                        )}
                        <button
                            onClick={() => setDark((v) => !v)}
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${dark ? "border-gray-700 hover:bg-gray-800" : "border-slate-200 hover:bg-slate-100"}`}
                        >
                            {dark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pt-6 pb-2 space-y-4">
                {/* ── Drop Zone ── */}
                <div
                    ref={dropRef}
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center py-10 gap-3
            ${dark ? "border-gray-700 hover:border-blue-500 hover:bg-gray-900" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/40"}`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dark ? "bg-gray-800" : "bg-slate-100"}`}>
                        <Upload size={22} className="text-blue-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">Drop images here or click to browse</p>
                        <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            JPG, PNG, WEBP, GIF — any number of files
                        </p>
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && ingestFiles(e.target.files)}
                    />
                </div>

                {/* ── Settings Panel ── */}
                {showSettings && images.length > 0 && (
                    <div className={`rounded-2xl border p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"}`}>
                        <div className="space-y-1">
                            <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Page Size</label>
                            <select
                                value={opts.pageSize}
                                onChange={(e) => setOpts((o) => ({ ...o, pageSize: e.target.value as PageSize }))}
                                className={`w-full text-sm rounded-lg border px-2 py-1.5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}
                            >
                                {(["A4", "Letter", "Legal", "A3", "fit"] as PageSize[]).map((s) => (
                                    <option key={s} value={s}>{s === "fit" ? "Fit to Image" : s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Orientation</label>
                            <select
                                value={opts.orientation}
                                onChange={(e) => setOpts((o) => ({ ...o, orientation: e.target.value as Orientation }))}
                                className={`w-full text-sm rounded-lg border px-2 py-1.5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}
                            >
                                <option value="auto">Auto</option>
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Quality</label>
                            <select
                                value={opts.quality}
                                onChange={(e) => setOpts((o) => ({ ...o, quality: e.target.value as Quality }))}
                                className={`w-full text-sm rounded-lg border px-2 py-1.5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}
                            >
                                <option value="low">Low (smaller file)</option>
                                <option value="medium">Medium</option>
                                <option value="high">High (larger file)</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Margin</label>
                            <select
                                value={opts.margin}
                                onChange={(e) => setOpts((o) => ({ ...o, margin: e.target.value as Margin }))}
                                className={`w-full text-sm rounded-lg border px-2 py-1.5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}
                            >
                                <option value="none">None</option>
                                <option value="small">Small</option>
                                <option value="normal">Normal</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Filename</label>
                            <input
                                type="text"
                                value={opts.filename}
                                onChange={(e) => setOpts((o) => ({ ...o, filename: e.target.value }))}
                                className={`w-full text-sm rounded-lg border px-2 py-1.5 ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"}`}
                                placeholder="output"
                            />
                        </div>

                        <div className="flex flex-col gap-2 justify-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={opts.fitToPage}
                                    onChange={(e) => setOpts((o) => ({ ...o, fitToPage: e.target.checked }))}
                                    className="w-3.5 h-3.5 accent-blue-600"
                                />
                                <span className="text-xs">Fit to page</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={opts.grayscale}
                                    onChange={(e) => setOpts((o) => ({ ...o, grayscale: e.target.checked }))}
                                    className="w-3.5 h-3.5 accent-blue-600"
                                />
                                <span className="text-xs">Grayscale</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* ── Image Grid ── */}
                {!isEmpty && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Layers size={14} className="text-blue-500" />
                                <span className="text-sm font-medium">{images.length} image{images.length > 1 ? "s" : ""}</span>
                                <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>· drag to reorder</span>
                            </div>
                            <button
                                onClick={clearAll}
                                className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg border transition-colors ${dark ? "border-gray-700 hover:bg-red-900/40 text-red-400" : "border-slate-200 hover:bg-red-50 text-red-500"}`}
                            >
                                <Trash2 size={11} />
                                Clear all
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {images.map((img, idx) => (
                                <div
                                    key={img.id}
                                    draggable
                                    onDragStart={() => { dragItem.current = img.id; setDraggingId(img.id); }}
                                    onDragEnd={() => { dragItem.current = null; setDraggingId(null); setDragOverId(null); }}
                                    onDragOver={(e) => { e.preventDefault(); setDragOverId(img.id); }}
                                    onDrop={(e) => { e.preventDefault(); if (dragItem.current && dragItem.current !== img.id) moveItem(dragItem.current, img.id); setDragOverId(null); }}
                                    className={`relative rounded-xl border overflow-hidden group transition-all duration-150 select-none
                    ${draggingId === img.id ? "opacity-40 scale-95" : ""}
                    ${dragOverId === img.id && draggingId !== img.id ? "ring-2 ring-blue-500" : ""}
                    ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"}`}
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-[3/4] overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-gray-800">
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            draggable={false}
                                            style={{ transform: `rotate(${img.rotation}deg)`, maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                            className="transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                                        {idx + 1}
                                    </div>

                                    {/* Drag handle */}
                                    <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-grab ${dark ? "bg-gray-800/90" : "bg-white/90"} shadow`}>
                                            <GripVertical size={12} />
                                        </div>
                                    </div>

                                    {/* Bottom bar */}
                                    <div className={`px-2 py-1.5 border-t ${dark ? "border-gray-800" : "border-slate-100"}`}>
                                        <p className="text-[10px] truncate font-medium leading-none mb-0.5">{img.name}</p>
                                        <p className={`text-[9px] ${dark ? "text-gray-500" : "text-gray-400"}`}>{img.sizeKB} KB</p>
                                    </div>

                                    {/* Action overlay */}
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pb-1">
                                        <ActionBtn onClick={() => shift(img.id, -1)} disabled={idx === 0} dark={dark} title="Move up">
                                            <ChevronUp size={12} />
                                        </ActionBtn>
                                        <ActionBtn onClick={() => shift(img.id, 1)} disabled={idx === images.length - 1} dark={dark} title="Move down">
                                            <ChevronDown size={12} />
                                        </ActionBtn>
                                        <ActionBtn onClick={() => rotate(img.id)} dark={dark} title="Rotate 90°">
                                            <RotateCw size={12} />
                                        </ActionBtn>
                                        <ActionBtn onClick={() => setPreview(img)} dark={dark} title="Preview">
                                            <ZoomIn size={12} />
                                        </ActionBtn>
                                        <ActionBtn onClick={() => remove(img.id)} dark={dark} danger title="Remove">
                                            <Trash2 size={12} />
                                        </ActionBtn>
                                    </div>
                                </div>
                            ))}

                            {/* Add more tile */}
                            <div
                                onClick={() => fileRef.current?.click()}
                                className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors
                  ${dark ? "border-gray-700 hover:border-blue-500 hover:bg-gray-900" : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/40"}`}
                            >
                                <FileImage size={20} className={dark ? "text-gray-600" : "text-slate-400"} />
                                <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Add more</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Progress ── */}
                {processing && (
                    <div className={`rounded-2xl border p-5 space-y-3 ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200"}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{progressLabel}</span>
                            <span className="text-sm font-semibold tabular-nums text-blue-500">{progress}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-gray-800" : "bg-slate-100"}`}>
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                                    style={{ animationDelay: `${i * 120}ms` }}
                                />
                            ))}
                            <span className={`text-xs ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                Processing on your device…
                            </span>
                        </div>
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${dark ? "bg-red-950/30 border-red-800" : "bg-red-50 border-red-200"}`}>
                        <AlertCircle size={16} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                )}

                {/* ── Success ── */}
                {pdfBlob && !processing && (
                    <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${dark ? "bg-green-950/30 border-green-800" : "bg-green-50 border-green-200"}`}>
                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                        <p className="text-sm text-green-600 flex-1">
                            PDF ready · {(pdfBlob.size / 1024).toFixed(1)} KB
                        </p>
                    </div>
                )}

                {/* ── Action Bar ── */}
                {!isEmpty && (
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            onClick={generate}
                            disabled={processing}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all
                ${processing
                                    ? "bg-blue-400 cursor-not-allowed text-white"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-500/20"}`}
                        >
                            <Printer size={15} />
                            {processing ? "Processing…" : pdfBlob ? "Re-generate PDF" : "Generate PDF"}
                        </button>

                        {pdfBlob && (
                            <button
                                onClick={download}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all"
                            >
                                <Download size={15} />
                                Download
                            </button>
                        )}
                    </div>
                )}

                {/* ── Empty state ── */}
                {isEmpty && (
                    <div className="text-center py-8 space-y-1">
                        <FileImage size={32} className={`mx-auto mb-3 ${dark ? "text-gray-700" : "text-slate-300"}`} />
                        <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>No images added yet</p>
                        <p className={`text-xs ${dark ? "text-gray-600" : "text-gray-300"}`}>
                            Supports JPG · PNG · WEBP · GIF
                        </p>
                    </div>
                )}
            </main>

            {/* ── Preview Modal ── */}
            {preview && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setPreview(null)}
                >
                    <div
                        className={`relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl ${dark ? "bg-gray-900" : "bg-white"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-sm font-medium truncate">{preview.name}</span>
                            <button onClick={() => setPreview(null)} className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                                <X size={14} />
                            </button>
                        </div>
                        <div className="p-4 flex items-center justify-center min-h-[300px]">
                            <img
                                src={preview.url}
                                alt={preview.name}
                                style={{ transform: `rotate(${preview.rotation}deg)`, maxHeight: "60vh", maxWidth: "100%" }}
                                className="object-contain rounded-lg transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Small helper button ───────────────────────────────────────────────────────

function ActionBtn({
    onClick,
    children,
    disabled,
    dark,
    danger,
    title,
}: {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    dark?: boolean;
    danger?: boolean;
    title?: string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors shadow
        ${disabled ? "opacity-30 cursor-not-allowed" : ""}
        ${danger
                    ? dark ? "bg-red-900/80 text-red-300 hover:bg-red-800" : "bg-red-100 text-red-500 hover:bg-red-200"
                    : dark ? "bg-gray-800/90 text-gray-300 hover:bg-gray-700" : "bg-white/90 text-gray-600 hover:bg-gray-100"}`}
        >
            {children}
        </button>
    );
}