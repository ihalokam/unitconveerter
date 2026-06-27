import React from "react";

const GAPS = [
    {
        eyebrow: "Complex elements",
        title: "Mermaid diagrams and LaTeX, rendered natively",
        body: "Most converters break the moment a .md file has a flowchart or an equation. This tool renders Mermaid fenced blocks to real SVG and LaTeX math through KaTeX before the page ever reaches print — so diagrams and equations show up exactly as they would on GitHub, not as broken code fences.",
        points: [
            "Flowcharts, sequence diagrams, Gantt and state diagrams",
            "Inline ($...$) and block ($$...$$) math",
            "Vector output — equations stay crisp and selectable",
        ],
    },
    {
        eyebrow: "Page layout",
        title: "Control exactly where a page breaks",
        body: "Markdown has no concept of a page. Left alone, a PDF export will slice a code block or a table row right down the middle. This converter applies break-inside: avoid to code blocks, tables, and diagrams automatically, and repeats table headers across page boundaries.",
        points: [
            "Code blocks and tables never split mid-block",
            "Headings stay attached to the content beneath them",
            "Table headers repeat on every page they span",
        ],
    },
    {
        eyebrow: "Styling",
        title: "Pick a layout instead of accepting one",
        body: "Default converters give you one look — usually a GitHub README in Times New Roman. Choose between a clean default, a tightened corporate report layout, a compact resume density, or a serif academic paper style, all from the export panel, no CSS editing required.",
        points: [
            "Four built-in print themes",
            "Adjustable page size and margins",
            "No CSS or template files to manage",
        ],
    },
];

export default function FeatureGaps() {
    return (
        <section id="feature-gaps" className="bg-white border-b border-neutral-200/80 selection:bg-neutral-900 selection:text-white">
            <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">

                {/* Section Header */}
                <div className="max-w-2xl mb-20">
                    <span className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-widest block bg-neutral-50 border border-neutral-200/60 rounded px-2 py-0.5 w-fit">
                        Architecture Differences
                    </span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-neutral-950 tracking-tight">
                        The parts other converters skip
                    </h2>
                </div>

                {/* Features List */}
                <div className="grid gap-16">
                    {GAPS.map((gap, i) => (
                        <article
                            key={gap.title}
                            className="group grid md:grid-cols-[140px_1fr] gap-4 md:gap-12 border-t border-neutral-200/60 pt-12 first:border-t-0 first:pt-0"
                        >
                            {/* Sequence Numbering */}
                            <div className="font-mono text-xl font-light text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200">
                                {String(i + 1).padStart(2, "0")}
                            </div>

                            {/* Feature Details Container */}
                            <div className="space-y-4">
                                <div>
                                    <span className="font-mono text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                                        {gap.eyebrow}
                                    </span>
                                    <h3 className="mt-1 text-xl font-semibold text-neutral-950 tracking-tight">
                                        {gap.title}
                                    </h3>
                                </div>

                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-3xl font-normal">
                                    {gap.body}
                                </p>

                                {/* Capability Point Pill Cards */}
                                <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                                    {gap.points.map((point) => (
                                        <li
                                            key={point}
                                            className="text-xs text-neutral-700 bg-neutral-50/60 border border-neutral-200/80 rounded-xl px-4 py-3 shadow-sm flex items-start gap-2.5 leading-relaxed transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300"
                                        >
                                            {/* Minimal check vector icon */}
                                            <svg
                                                className="h-3.5 w-3.5 text-neutral-400 mt-0.5 shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2.5"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}