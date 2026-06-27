import React from "react";

const FAQS = [
    {
        q: "How do I convert markdown with Mermaid diagrams to PDF without losing formatting?",
        a: "Paste or upload your .md file into the workspace above. Any fenced ```mermaid code block is parsed and rendered to an inline SVG diagram before export, so it appears in the PDF as a real vector diagram rather than raw code text.",
    },
    {
        q: "How do I stop markdown code blocks from breaking across pages in a PDF?",
        a: "This happens automatically here. Code blocks, tables, and diagrams are exported with a break-inside: avoid rule, so the print engine keeps each one on a single page instead of slicing it at the page edge.",
    },
    {
        q: "Can I use a custom CSS theme for my markdown PDF?",
        a: "Pick from four built-in print themes (default, report, resume, academic) in the export panel. Each adjusts font sizing, heading treatment, and density without you writing any CSS.",
    },
    {
        q: "Does this upload my file to a server?",
        a: "No. Parsing, diagram rendering, and PDF export all run in your browser. The file you open or paste never leaves your device.",
    },
    {
        q: "What markdown features are supported?",
        a: "Standard CommonMark plus GitHub Flavored Markdown — headings, tables, task lists, fenced code with syntax highlighting, blockquotes, images, and links — alongside Mermaid diagrams and KaTeX math.",
    },
];

export default function Faq() {
    return (
        <section className="bg-neutral-50 border-t border-neutral-200/80 selection:bg-neutral-900 selection:text-white">
            <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">

                {/* Section Header */}
                <div className="max-w-2xl mb-16 md:mb-24">
                    <span className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-widest block bg-neutral-100 border border-neutral-200/60 rounded px-2 py-0.5 w-fit">
                        Documentation
                    </span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-neutral-950 tracking-tight">
                        Common questions
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="divide-y divide-neutral-200/70 border-t border-b border-neutral-200/70">
                    {FAQS.map((item) => (
                        <div
                            key={item.q}
                            className="grid md:grid-cols-[300px_1fr] gap-4 md:gap-12 py-8 md:py-10 first:pt-6 last:pb-6"
                        >
                            {/* Question Column */}
                            <div>
                                <h3 className="text-base font-semibold text-neutral-950 tracking-tight leading-snug">
                                    {item.q}
                                </h3>
                            </div>

                            {/* Answer Column */}
                            <div className="bg-white/50 border border-neutral-200/50 rounded-xl p-5 shadow-sm md:p-6 md:bg-transparent md:border-0 md:rounded-none md:p-0 md:shadow-none">
                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}