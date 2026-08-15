import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { TOOL_REGISTRY, type Category } from "./toolsData";

// ─── Tool Card ────────────────────────────────────────────────────────────────
function ToolCard({ tool }: { tool: Category["tools"][number] }) {
    return (
        <Link
            href={tool.href}
            className="group flex flex-col gap-2.5 p-4 rounded-2xl border border-stone-200 bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50 transition-all duration-200"
        >
            <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
                    {tool.name}
                </span>
                {tool.badge && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                        {tool.badge}
                    </span>
                )}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed flex-1">{tool.description}</p>
            <span className="text-xs font-semibold text-amber-500 group-hover:text-amber-600 transition-colors">
                Open tool →
            </span>
        </Link>
    );
}

// ─── Category Section ─────────────────────────────────────────────────────────
function CategorySection({ category }: { category: Category }) {
    const categoryRegistryLinks: Record<Category["id"], string> = {
        "unit-converters": "/bulk-unit-converter",
        "pdf-tools": "/pdf-tools",
        calculators: "/calculator",
    };

    return (
        <section id={category.id} className="scroll-mt-20">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
                <span className="text-base" aria-hidden>{category.icon}</span>
                <h2 className="text-sm font-bold text-stone-700 tracking-tight">
                    <Link href={categoryRegistryLinks[category.id]} className="hover:text-amber-700 transition-colors">
                        {category.label}
                    </Link>
                </h2>
                <span className="ml-auto text-xs text-stone-400 font-medium tabular-nums">
                    {category.tools.length} tool{category.tools.length !== 1 ? "s" : ""}
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.tools.map((tool) => (
                    <ToolCard key={tool.href} tool={tool} />
                ))}
            </div>
        </section>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ToolIndex() {
    const totalTools = TOOL_REGISTRY.reduce((sum, c) => sum + c.tools.length, 0);

    return (
        <div className="min-h-screen bg-[#faf9f7] text-stone-900 flex flex-col">
            <Navbar />

            {/* ── Hero ── */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
                    {/* Pill */}
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-5">
                        <span>✦</span> Free Tools — No Sign-up
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-3 max-w-2xl">
                        Every tool you need,<br className="hidden sm:block" /> all in one place.
                    </h1>
                    <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-xl">
                        {totalTools} free tools for unit conversion, PDF editing and everyday calculations.
                        Everything runs locally in your browser — no file uploads, no accounts.
                    </p>

                    {/* Category jump links */}
                    <nav aria-label="Jump to category" className="flex flex-wrap gap-2">
                        {TOOL_REGISTRY.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.id}`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                                <span aria-hidden>{cat.icon}</span>
                                {cat.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* ── Tool index ── */}
            <div className="flex-1 max-w-5xl w-full mx-auto px-5 py-12 space-y-12">
                {TOOL_REGISTRY.map((cat) => (
                    <CategorySection key={cat.id} category={cat} />
                ))}

                {/* ── About section (helps AdSense "low value content") ── */}
                <section className="rounded-2xl border border-stone-200 bg-white px-6 py-7 space-y-3">
                    <h2 className="text-sm font-bold text-stone-800">About Standard Convert</h2>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">
                        Standard Convert is a growing collection of precision tools built for everyday use —
                        from engineers converting units in bulk spreadsheets to students calculating ages
                        and developers editing PDFs. Every tool is free, ad-light, and runs entirely in
                        your browser. Your data never leaves your device.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                        {[
                            "Privacy-first",
                            "No file uploads",
                            "No account needed",
                            "Works offline after load",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="text-[11px] font-semibold px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-full text-stone-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
