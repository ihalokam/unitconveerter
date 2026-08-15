"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { TOOL_REGISTRY } from "./HomeComponents/toolsData";

// Top-level nav items (non-dropdown)
const TOP_LINKS = [
    { label: "Unit Converter", href: "/unit-converter" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handle(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-stone-200"
        >
            <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 group-hover:border-amber-400 transition-colors">
                        <Image src="/logo.webp" alt="Standard Convert" fill sizes="32px" className="object-cover" priority />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-stone-900 font-mono hidden sm:block">
                        STANDARD<span className="text-amber-500">CONVERT</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                    {/* Static links */}
                    {TOP_LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-stone-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                            {l.label}
                        </Link>
                    ))}

                    {/* Dynamic dropdowns from TOOL_REGISTRY */}
                    {TOOL_REGISTRY.map((cat) => (
                        <div key={cat.id} className="relative">
                            <button
                                type="button"
                                onMouseEnter={() => setActiveDropdown(cat.id)}
                                onMouseLeave={() => setActiveDropdown(null)}
                                onClick={() => setActiveDropdown(activeDropdown === cat.id ? null : cat.id)}
                                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeDropdown === cat.id
                                        ? "text-amber-700 bg-amber-50"
                                        : "text-stone-600 hover:text-amber-700 hover:bg-amber-50"
                                    }`}
                            >
                                <span className="text-sm" aria-hidden>{cat.icon}</span>
                                {cat.label}
                                <ChevronDown
                                    size={13}
                                    className={`transition-transform duration-200 ${activeDropdown === cat.id ? "rotate-180 text-amber-500" : "text-stone-400"}`}
                                />
                            </button>

                            {/* Dropdown panel */}
                            {activeDropdown === cat.id && (
                                <div
                                    className="absolute top-full left-0 pt-2 w-64 z-50"
                                    onMouseEnter={() => setActiveDropdown(cat.id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-100 py-2 overflow-hidden">
                                        <p className="px-4 pt-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                            {cat.label}
                                        </p>
                                        {cat.tools.map((tool) => (
                                            <Link
                                                key={tool.href}
                                                href={tool.href}
                                                onClick={() => setActiveDropdown(null)}
                                                className="flex items-center justify-between px-4 py-2 hover:bg-amber-50 group transition-colors"
                                            >
                                                <span className="text-sm text-stone-700 group-hover:text-amber-700 font-medium">
                                                    {tool.name}
                                                </span>
                                                {tool.badge && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 group-hover:bg-white">
                                                        {tool.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href="/unit-converter"
                    className="hidden md:inline-flex items-center gap-1.5 shrink-0 text-xs font-bold px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white transition-colors shadow-sm shadow-amber-300/40"
                >
                    Try Now
                </Link>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                    onClick={() => setMobileOpen((p) => !p)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-stone-100 bg-white divide-y divide-stone-100">
                    {/* Static links */}
                    <div className="px-4 py-3 space-y-1">
                        {TOP_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Tool categories */}
                    {TOOL_REGISTRY.map((cat) => (
                        <div key={cat.id} className="px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 px-3">
                                {cat.icon} {cat.label}
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                                {cat.tools.map((tool) => (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-3 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors truncate"
                                    >
                                        {tool.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}