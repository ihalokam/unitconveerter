import Link from "next/link";
import { Shield, FileText, Info, Mail, Zap } from "lucide-react";
import { TOOL_REGISTRY } from "./HomeComponents/toolsData";

const COMPANY_LINKS = [
    { label: "About Us", href: "/about-us", icon: <Info size={13} /> },
    { label: "Contact", href: "/contact-us", icon: <Mail size={13} /> },
    { label: "Privacy Policy", href: "/privacy-policy", icon: <Shield size={13} /> },
    { label: "Terms of Service", href: "/terms-of-service", icon: <FileText size={13} /> },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-stone-200 bg-stone-50 mt-16">
            <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">

                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                                <Zap size={15} />
                            </div>

                            <span className="text-sm font-black tracking-tight font-mono text-stone-800">
                                STANDARD<span className="text-amber-500">CONVERT</span>
                            </span>
                        </div>

                        <p className="text-xs text-stone-500 leading-relaxed max-w-xs mb-4">
                            Free, privacy-first online tools for unit conversion, PDF editing and everyday
                            calculations. Everything runs in your browser — nothing is ever uploaded to a server.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {["No uploads", "No account", "100% free"].map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-500"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic tool columns from registry */}
                    {TOOL_REGISTRY.map((cat) => (
                        <div key={cat.id}>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-1.5">
                                <span aria-hidden>{cat.icon}</span>
                                {cat.label}
                            </p>

                            <ul className="space-y-2">
                                {cat.tools.map((tool) => (
                                    <li key={tool.href}>
                                        <Link
                                            href={tool.href}
                                            className="text-xs text-stone-600 hover:text-amber-600 font-medium transition-colors leading-relaxed"
                                        >
                                            {tool.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Products column */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">
                            Products
                        </p>

                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://datecalculator.site/"
                                    className="text-xs text-stone-600 hover:text-amber-600 font-medium transition-colors leading-relaxed"
                                >
                                    Date Calculator
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company column */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">
                            Company
                        </p>

                        <ul className="space-y-2">
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-600 font-medium transition-colors"
                                    >
                                        <span className="text-stone-400">
                                            {l.icon}
                                        </span>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-xs text-stone-400">
                        © <span suppressHydrationWarning>{year}</span> Standard Convert. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/privacy-policy"
                            className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms-of-service"
                            className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            Terms
                        </Link>

                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                            🔒 In-Browser Only
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}