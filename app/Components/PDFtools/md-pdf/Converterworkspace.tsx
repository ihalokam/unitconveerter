"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    renderMarkdownToHtml,
    exportToPdf,
    type PageSize,
    type PageMargin,
    type PrintOptions,
} from "@/app/Components/PDFtools/md-pdf/Markdownengine";

const DEFAULT_MARKDOWN = `# Project Handoff Notes

A short example showing the parts most converters get wrong.

## Architecture

\`\`\`mermaid
graph LR
  A[Client] -->|fetch| B[Edge Function]
  B --> C[(Database)]
  B --> D[Cache]
\`\`\`

## The math that usually breaks

Inline: latency budget is $p_{99} < 200\\text{ms}$.

Block:

$$
\\text{throughput} = \\frac{\\text{requests}}{\\text{seconds}}
$$

## A table that shouldn't get sliced in half

| Service | Owner | SLA |
|---|---|---|
| Edge | Platform | 99.95% |
| Database | Data | 99.9% |
| Cache | Platform | 99.5% |

\`\`\`js
function retry(fn, attempts = 3) {
  return fn().catch((e) => (attempts > 1 ? retry(fn, attempts - 1) : Promise.reject(e)));
}
\`\`\`

> Code blocks, tables, and diagrams above are all marked \`break-inside: avoid\` —
> try exporting and see that none of them get cut across a page edge.
`;

const PAGE_SIZES: { value: PageSize; label: string }[] = [
    { value: "a4", label: "A4" },
    { value: "letter", label: "Letter" },
];

const MARGINS: { value: PageMargin; label: string }[] = [
    { value: "narrow", label: "Narrow" },
    { value: "normal", label: "Normal" },
    { value: "wide", label: "Wide" },
];

const THEMES: { value: PrintOptions["theme"]; label: string; hint: string }[] = [
    { value: "default", label: "Default", hint: "Clean, neutral" },
    { value: "report", label: "Report", hint: "Corporate, tight" },
    { value: "resume", label: "Resume", hint: "Compact, dense" },
    { value: "academic", label: "Academic", hint: "Serif, paper-style" },
];

export default function ConverterWorkspace() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
    const [html, setHtml] = useState("");
    const [stats, setStats] = useState({ wordCount: 0, readingTimeMin: 0, mermaidCount: 0, mathCount: 0 });
    const [isRendering, setIsRendering] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("report");
    const [pageSize, setPageSize] = useState<PageSize>("a4");
    const [margin, setMargin] = useState<PageMargin>("normal");
    const [theme, setTheme] = useState<PrintOptions["theme"]>("default");

    const previewRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const runRender = useCallback(async (source: string) => {
        setIsRendering(true);
        try {
            const result = await renderMarkdownToHtml(source);
            setHtml(result.html);
            setStats({
                wordCount: result.wordCount,
                readingTimeMin: result.readingTimeMin,
                mermaidCount: result.mermaidCount,
                mathCount: result.mathCount,
            });
            setError(null);
        } catch {
            setError("Couldn't render this document. Check your Markdown syntax.");
        } finally {
            setIsRendering(false);
        }
    }, []);

    // Debounced live preview — re-renders 400ms after the user stops typing,
    // not on every keystroke, since mermaid/katex parsing isn't free.
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => runRender(markdown), 400);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [markdown, runRender]);

    const handleFileUpload = (file: File) => {
        if (!file.name.endsWith(".md") && !file.name.endsWith(".markdown")) {
            setError("Upload a .md or .markdown file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => setMarkdown((e.target?.result as string) ?? "");
        reader.readAsText(file);
    };

    const handleExport = () => {
        if (!html) return;
        setIsExporting(true);
        try {
            exportToPdf(html, { title, pageSize, margin, theme });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Export failed.");
        } finally {
            setTimeout(() => setIsExporting(false), 600);
        }
    };



    return (
        <section id="workspace" className="bg-neutral-50 border-b border-neutral-200">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-8">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">Workspace</span>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-950">Write, preview, export</h2>
                    <p className="mt-1 text-neutral-600">
                        Paste Markdown or drop a file. Your content never leaves this tab.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-px bg-neutral-200 rounded-xl overflow-hidden border border-neutral-200">
                    {/* Editor pane */}
                    <div className="bg-white flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                            <span className="font-mono text-xs text-neutral-500">source.md</span>
                            <label className="font-mono text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors">
                                Upload file
                                <input
                                    type="file"
                                    accept=".md,.markdown"
                                    className="hidden"
                                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                                />
                            </label>
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            spellCheck={false}
                            className="flex-1 min-h-[480px] resize-none px-5 py-4 font-mono text-[13px] leading-6 text-neutral-800 outline-none"
                            placeholder="# Start typing Markdown..."
                        />
                    </div>

                    {/* Preview pane */}
                    <div className="bg-white flex flex-col">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                            <span className="font-mono text-xs text-neutral-500">
                                {isRendering ? "rendering…" : "preview"}
                            </span>
                            <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                                <span>{stats.wordCount} words</span>
                                <span>·</span>
                                <span>{stats.readingTimeMin} min read</span>
                            </div>
                        </div>
                        <div
                            ref={previewRef}
                            className="flex-1 min-h-[480px] overflow-auto px-6 py-5 prose-preview"
                            dangerouslySetInnerHTML={{ __html: html || "<p style='color:#a3a3a3'>Nothing to preview yet.</p>" }}
                        />
                    </div>
                </div>

                {/* Export controls */}
                <div className="mt-6 rounded-xl border border-neutral-200 bg-white px-6 py-5">
                    <div className="flex flex-wrap items-end gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-neutral-500">File name</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-40 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-neutral-500">Page size</label>
                            <div className="flex rounded-md border border-neutral-300 overflow-hidden">
                                {PAGE_SIZES.map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => setPageSize(s.value)}
                                        className={`px-3 py-2 text-sm transition-colors ${pageSize === s.value ? "bg-neutral-950 text-white" : "bg-white text-neutral-600 hover:bg-neutral-50"
                                            }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-neutral-500">Margins</label>
                            <div className="flex rounded-md border border-neutral-300 overflow-hidden">
                                {MARGINS.map((m) => (
                                    <button
                                        key={m.value}
                                        onClick={() => setMargin(m.value)}
                                        className={`px-3 py-2 text-sm transition-colors ${margin === m.value ? "bg-neutral-950 text-white" : "bg-white text-neutral-600 hover:bg-neutral-50"
                                            }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-neutral-500">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as PrintOptions["theme"])}
                                className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 bg-white"
                            >
                                {THEMES.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label} — {t.hint}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                onClick={handleExport}
                                disabled={!html || isExporting}
                                title="Vector text, clean page breaks. Opens your browser's print dialog — choose 'Save as PDF'."
                                className="rounded-lg bg-neutral-950 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                {isExporting ? "Opening print dialog…" : "Export to PDF"}
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-neutral-500 border-t border-neutral-100 pt-4">
                        Opens your browser&apos;s print dialog in a clean popup — select{" "}
                        <span className="font-medium text-neutral-700">Save as PDF</span> as the destination.
                        Vector text, clean page breaks around code, tables and diagrams are all preserved.
                    </p>

                    {(stats.mermaidCount > 0 || stats.mathCount > 0) && (
                        <div className="mt-3 flex gap-4 font-mono text-xs text-neutral-500">
                            {stats.mermaidCount > 0 && <span>{stats.mermaidCount} diagram(s) rendered</span>}
                            {stats.mathCount > 0 && <span>{stats.mathCount} equation(s) rendered</span>}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}