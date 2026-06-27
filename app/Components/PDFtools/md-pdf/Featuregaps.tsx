const GAPS = [
    {
        eyebrow: "Complex elements",
        title: "Mermaid diagrams and LaTeX, rendered natively",
        body:
            "Most converters break the moment a .md file has a flowchart or an equation. This tool renders Mermaid fenced blocks to real SVG and LaTeX math through KaTeX before the page ever reaches print — so diagrams and equations show up exactly as they would on GitHub, not as broken code fences.",
        points: [
            "Flowcharts, sequence diagrams, Gantt and state diagrams",
            "Inline ($...$) and block ($$...$$) math",
            "Vector output — equations stay crisp and selectable",
        ],
    },
    {
        eyebrow: "Page layout",
        title: "Control exactly where a page breaks",
        body:
            "Markdown has no concept of a page. Left alone, a PDF export will slice a code block or a table row right down the middle. This converter applies break-inside: avoid to code blocks, tables, and diagrams automatically, and repeats table headers across page boundaries.",
        points: [
            "Code blocks and tables never split mid-block",
            "Headings stay attached to the content beneath them",
            "Table headers repeat on every page they span",
        ],
    },
    {
        eyebrow: "Styling",
        title: "Pick a layout instead of accepting one",
        body:
            "Default converters give you one look — usually a GitHub README in Times New Roman. Choose between a clean default, a tightened corporate report layout, a compact resume density, or a serif academic paper style, all from the export panel, no CSS editing required.",
        points: [
            "Four built-in print themes",
            "Adjustable page size and margins",
            "No CSS or template files to manage",
        ],
    },
];

export default function FeatureGaps() {
    return (
        <section id="feature-gaps" className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="max-w-2xl mb-14">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">
                        Why this is different
                    </span>
                    <h2 className="mt-2 text-3xl font-semibold text-neutral-950 tracking-tight">
                        The parts other converters skip
                    </h2>
                </div>

                <div className="grid gap-10">
                    {GAPS.map((gap, i) => (
                        <article
                            key={gap.title}
                            className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 border-t border-neutral-200 pt-10 first:border-t-0 first:pt-0"
                        >
                            <div className="font-mono text-sm text-neutral-400 md:w-16">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div>
                                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">
                                    {gap.eyebrow}
                                </span>
                                <h3 className="mt-1.5 text-xl font-semibold text-neutral-950">{gap.title}</h3>
                                <p className="mt-3 text-neutral-600 leading-relaxed max-w-2xl">{gap.body}</p>
                                <ul className="mt-4 grid sm:grid-cols-3 gap-3">
                                    {gap.points.map((point) => (
                                        <li
                                            key={point}
                                            className="text-sm text-neutral-700 border border-neutral-200 rounded-lg px-3 py-2.5"
                                        >
                                            {point}
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