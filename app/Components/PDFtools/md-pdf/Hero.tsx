import React from "react";

const SAMPLE_LINES = [
    "# Quarterly Engineering Report",
    "",
    "## System Architecture",
    "```mermaid",
    "graph LR",
    "  A[Client] --> B[Edge]",
    "  B --> C[Origin]",
    "```",
    "",
    "Latency target: $p_{99} < 200ms$",
];

/**
 * Hero component fully optimized for Server-Side Rendering (SSR).
 * Handles the visual presentation and layout entirely on the server.
 */
export default function Hero() {
    return (
        <section className="relative border-b border-neutral-200 bg-white overflow-hidden">
            <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-xs tracking-wide text-neutral-600">
                            100% client-side · nothing uploaded
                        </span>
                    </div>

                    <h1 className="font-sans text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-950 leading-[1.1]">
                        Markdown to PDF,
                        <br />
                        without losing the hard parts.
                    </h1>

                    <p className="mt-5 text-lg text-neutral-600 leading-relaxed max-w-md">
                        Diagrams, equations, and code blocks render correctly — and your pages break
                        where you want them to. Runs entirely in your browser.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#workspace"
                            className="rounded-lg bg-neutral-950 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors inline-block"
                        >
                            Start converting
                        </a>
                        <a
                            href="#feature-gaps"
                            className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:border-neutral-400 transition-colors inline-block"
                        >
                            See what it handles
                        </a>
                    </div>

                    <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                        <div>
                            <dt className="font-mono text-xs text-neutral-500">Mermaid</dt>
                            <dd className="text-sm font-medium text-neutral-900">Native render</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-xs text-neutral-500">LaTeX</dt>
                            <dd className="text-sm font-medium text-neutral-900">Via KaTeX</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-xs text-neutral-500">Breaks</dt>
                            <dd className="text-sm font-medium text-neutral-900">You control</dd>
                        </div>
                    </dl>
                </div>

                <div className="relative">
                    <div className="rounded-xl border border-neutral-200 bg-neutral-950 shadow-2xl shadow-neutral-300/40 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-2 font-mono text-xs text-neutral-400">report.md</span>
                        </div>
                        <pre className="px-5 py-5 font-mono text-[13px] leading-6 text-neutral-300 min-h-[260px]">
                            {SAMPLE_LINES.map((line, i) => (
                                <div key={i} className="whitespace-pre">
                                    {line || "\u00A0"}
                                </div>
                            ))}
                        </pre>
                    </div>
                    <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 shadow-lg">
                        <span className="font-mono text-xs text-neutral-500">render</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-xs font-medium text-neutral-900">ready</span>
                    </div>
                </div>
            </div>
        </section>
    );
}