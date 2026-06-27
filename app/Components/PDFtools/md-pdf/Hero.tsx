import React from "react";

const SAMPLE_LINES = [
    { type: "heading", text: "# Quarterly Engineering Report" },
    { type: "blank", text: "" },
    { type: "subheading", text: "## System Architecture" },
    { type: "fence", text: "```mermaid" },
    { type: "code", text: "graph LR" },
    { type: "code", text: "  A[Client] --> B[Edge]" },
    { type: "code", text: "  B --> C[Origin]" },
    { type: "fence", text: "```" },
    { type: "blank", text: "" },
    { type: "text", text: "Latency target: ", math: "$p_{99} < 200ms$" },
];

export default function Hero() {
    return (
        <section className="relative border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50 to-white overflow-hidden selection:bg-neutral-900 selection:text-white">

            {/* Ambient Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.4]" />

            <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                {/* Left Content Side */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] font-semibold tracking-wider text-neutral-600 uppercase">
                            100% client-side · zero server uploads
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-950 leading-[1.1] md:max-w-xl">
                        Markdown to PDF, <br />
                        <span className="text-neutral-500 font-normal">without losing the hard parts.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md font-normal">
                        Diagrams, equations, and dense code blocks render natively — and your pages break
                        exactly where you configure them to.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                        <a
                            href="#workspace"
                            className="rounded-xl bg-neutral-950 text-white px-5 py-3 text-sm font-semibold hover:bg-neutral-800 shadow-md shadow-neutral-950/10 transition-all duration-200 inline-block"
                        >
                            Start converting
                        </a>
                        <a
                            href="#feature-gaps"
                            className="rounded-xl bg-white border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm transition-all duration-200 inline-block"
                        >
                            See what it handles
                        </a>
                    </div>

                    {/* Meta Architecture Parameters Row */}
                    <dl className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-200/60 max-w-md">
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Mermaid</dt>
                            <dd className="mt-0.5 text-sm font-medium text-neutral-900">Native SVG</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">LaTeX</dt>
                            <dd className="mt-0.5 text-sm font-medium text-neutral-900">Via KaTeX</dd>
                        </div>
                        <div>
                            <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Breaks</dt>
                            <dd className="mt-0.5 text-sm font-medium text-neutral-900">Auto-avoid</dd>
                        </div>
                    </dl>
                </div>

                {/* Right Interactive Mock Terminal Card Side */}
                <div className="relative group w-full max-w-md lg:max-w-none mx-auto">

                    {/* Shadow Layer Backing */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200 to-neutral-300/40 rounded-xl blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-75" />

                    <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-neutral-700">

                        {/* Title Tab Bar Frame */}
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-900 bg-neutral-950/50">
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 border border-neutral-700/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 border border-neutral-700/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 border border-neutral-700/60" />
                            <span className="ml-2 font-mono text-xs font-medium text-neutral-500">document.md</span>
                        </div>

                        {/* Token Styled Markdown Code Terminal Panel */}
                        <pre className="px-6 py-6 font-mono text-[13px] leading-6 text-neutral-400 min-h-[260px] select-none overflow-x-auto">
                            {SAMPLE_LINES.map((line, i) => (
                                <div key={i} className="whitespace-pre">
                                    {line.type === "heading" && <span className="text-neutral-200 font-medium">{line.text}</span>}
                                    {line.type === "subheading" && <span className="text-neutral-300 font-medium">{line.text}</span>}
                                    {line.type === "fence" && <span className="text-neutral-600">{line.text}</span>}
                                    {line.type === "code" && <span className="text-emerald-400/90">{line.text}</span>}
                                    {line.type === "text" && (
                                        <span>
                                            <span className="text-neutral-400">{line.text}</span>
                                            <span className="text-amber-400/90 bg-amber-500/10 px-1 rounded border border-amber-500/20">{line.math}</span>
                                        </span>
                                    )}
                                    {line.type === "blank" && "\u00A0"}
                                </div>
                            ))}
                        </pre>
                    </div>

                    {/* Float Frame Render State Badge */}
                    <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 rounded-lg border border-neutral-200/80 bg-white px-3.5 py-2 shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">Compiler</span>
                        <span className="font-mono text-xs font-semibold text-neutral-900">Ready</span>
                    </div>
                </div>

            </div>
        </section>
    );
}