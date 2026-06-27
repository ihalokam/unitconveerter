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

    const totalLines = markdown.split("\n").length;

    return (
        <section id="workspace" className="bg-neutral-50/70 border-b border-neutral-200/80 selection:bg-neutral-900 selection:text-white">
            <div className="mx-auto max-w-6xl px-6 py-20">

                {/* Workspace Intro Header */}
                <div className="max-w-2xl mb-12">
                    <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
                        Workspace Engine
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold text-neutral-950 tracking-tight">
                        Write, preview, export
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                        Paste your markdown tree or import a local file structure. Your layout configuration and string data run entirely sandbox-isolated within your current tab context.
                    </p>
                </div>

                {/* Error Banner Notification */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200/80 bg-red-50/60 p-4 text-sm text-red-800 flex items-center gap-3 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                        <span className="font-medium tracking-tight">{error}</span>
                    </div>
                )}

                {/* Main Split Window Interface Frame */}
                <div className="grid lg:grid-cols-2 gap-px bg-neutral-200/80 rounded-2xl overflow-hidden border border-neutral-200 shadow-xl shadow-neutral-200/40">

                    {/* Code Editor Column Pane */}
                    <div className="bg-white flex flex-col relative group">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50/60 sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-neutral-700">source.md</span>
                                <span className="font-mono text-[10px] bg-neutral-200/60 text-neutral-500 rounded px-1.5 py-0.5">
                                    {totalLines} lines
                                </span>
                            </div>
                            <label className="font-mono text-xs font-medium text-neutral-500 hover:text-neutral-950 cursor-pointer transition-colors border border-neutral-200 bg-white shadow-sm hover:shadow rounded-md px-2.5 py-1">
                                Import File
                                <input
                                    type="file"
                                    accept=".md,.markdown"
                                    className="hidden"
                                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                                />
                            </label>
                        </div>

                        {/* Simulated IDE Line Counter Split Frame */}
                        <div className="flex flex-1 min-h-[520px] bg-white relative">
                            <div className="w-12 border-r border-neutral-100 bg-neutral-50/40 py-4 select-none text-right pr-3 font-mono text-[11px] text-neutral-300 leading-6 hidden sm:block">
                                {Array.from({ length: Math.max(totalLines, 1) }).map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                spellCheck={false}
                                className="flex-1 min-h-[520px] resize-none px-5 py-4 font-mono text-[13px] leading-6 text-neutral-800 outline-none placeholder:text-neutral-300"
                                placeholder="# Start typing Markdown..."
                            />
                        </div>
                    </div>

                    {/* Preview Viewport Output Pane */}
                    <div className="bg-white flex flex-col relative">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50/60 sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-semibold text-neutral-700">compiled_preview</span>
                                <span className={`inline-block h-2 w-2 rounded-full transition-colors ${isRendering ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`} />
                            </div>
                            <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-500 font-medium">
                                <span>{stats.wordCount} words</span>
                                <span className="text-neutral-300">|</span>
                                <span>{stats.readingTimeMin}m read</span>
                            </div>
                        </div>
                        <div
                            ref={previewRef}
                            className="flex-1 min-h-[520px] max-h-[640px] overflow-y-auto px-6 py-5 prose-preview bg-neutral-50/30"
                            dangerouslySetInnerHTML={{ __html: html || "<p style='color:#a3a3a3; font-family:monospace; font-size:13px;'>No input buffer string streams detected.</p>" }}
                        />
                    </div>
                </div>

                {/* Operational Parameters & Compilation Control Panel */}
                <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-md shadow-neutral-100">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">

                        {/* File Name Configuration Input */}
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Document Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-800 outline-none bg-neutral-50/50 focus:bg-white focus:border-neutral-900 transition-all font-medium"
                            />
                        </div>

                        {/* Page Geometry Controls */}
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Page Geometry</label>
                            <div className="flex rounded-xl border border-neutral-200 bg-neutral-50/50 p-1 w-full">
                                {PAGE_SIZES.map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => setPageSize(s.value)}
                                        className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all ${pageSize === s.value ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-950"}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Layout Margin Grid Configuration */}
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Layout Margins</label>
                            <div className="flex rounded-xl border border-neutral-200 bg-neutral-50/50 p-1 w-full">
                                {MARGINS.map((m) => (
                                    <button
                                        key={m.value}
                                        onClick={() => setMargin(m.value)}
                                        className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all uppercase tracking-wide ${margin === m.value ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-950"}`}
                                    >
                                        {m.value.substring(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Typographic Theme Profiler Dropdown Selector */}
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Style Profiler Theme</label>
                            <div className="relative">
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as PrintOptions["theme"])}
                                    className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none bg-neutral-50/50 focus:bg-white focus:border-neutral-900 transition-all font-medium appearance-none cursor-pointer text-neutral-800"
                                >
                                    {THEMES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.label} ({t.hint})
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics Engine Status Bars */}
                    <div className="mt-8 pt-6 border-t border-neutral-200/60 grid md:grid-cols-[1fr_auto] items-center gap-4">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <p className="text-xs text-neutral-500 leading-relaxed font-normal max-w-md">
                                Exports natively using targeted vector page layouts. Select <span className="font-semibold text-neutral-800">Save as PDF</span> within your operating system print sub-dialog workspace.
                            </p>

                            {(stats.mermaidCount > 0 || stats.mathCount > 0) && (
                                <div className="flex flex-wrap items-center gap-3 border-l border-neutral-200 pl-6 hidden md:flex">
                                    {stats.mermaidCount > 0 && (
                                        <span className="font-mono text-[11px] font-medium bg-neutral-50 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded-md">
                                            {stats.mermaidCount} vectors
                                        </span>
                                    )}
                                    {stats.mathCount > 0 && (
                                        <span className="font-mono text-[11px] font-medium bg-neutral-50 text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded-md">
                                            {stats.mathCount} LaTeX bundles
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Primary Compilation Trigger Execution Button */}
                        <div className="w-full md:w-auto">
                            <button
                                onClick={handleExport}
                                disabled={!html || isExporting}
                                className="w-full md:w-auto rounded-xl bg-neutral-950 text-white px-6 py-3.5 text-sm font-semibold hover:bg-neutral-800 disabled:opacity-35 disabled:cursor-not-allowed shadow-md shadow-neutral-950/10 transition-all"
                            >
                                {isExporting ? "Opening dialog..." : "Export System Document"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}