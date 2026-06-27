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
        <section className="bg-neutral-50 border-t border-neutral-200">
            <div className="mx-auto max-w-3xl px-6 py-20">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">FAQ</span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-950 mb-10">Common questions</h2>

                <div className="space-y-6">
                    {FAQS.map((item) => (
                        <div key={item.q} className="border-b border-neutral-200 pb-6 last:border-b-0">
                            <h3 className="text-base font-medium text-neutral-950">{item.q}</h3>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}