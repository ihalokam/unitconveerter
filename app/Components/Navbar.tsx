"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Added for the logo
import {
    ChevronDown,
    Menu,
    X,
    Zap,
    Ruler,
    Weight,
    Thermometer,
    Droplets,
    Gauge,
} from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const bulkLinks = [
        { name: "Pressure", href: "/pressure-unit-converter-in-bulk-csv-excel-files", icon: <Gauge size={16} /> },
        { name: "Length & Distance", href: "/length-unit-converter-in-bulk-csv-excel-files", icon: <Ruler size={16} /> },
        { name: "Mass & Weight", href: "/mass-unit-converter-in-bulk-csv-excel-files", icon: <Weight size={16} /> },
        { name: "Temperature", href: "/temperature-unit-converter-in-bulk-csv-excel-files", icon: <Thermometer size={16} /> },
        { name: "Volume", href: "/volume-unit-converter-in-bulk-csv-excel-files", icon: <Droplets size={16} /> },
        { name: "Energy & Power", href: "/energy-unit-converter-in-bulk-csv-excel-files", icon: <Zap size={16} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO SECTION */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 group-hover:border-blue-600 transition-colors">
                        <Image
                            src="/logo.webp"
                            alt="Standard Convert Logo"
                            fill
                            sizes="36px"
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900 font-mono">
                        STANDARD<span className="text-blue-600">CONVERT</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/unit-converter"
                        className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition"
                    >
                        All-in-One
                    </Link>

                    {/* DROPDOWN CONTAINER */}
                    <div
                        className="relative py-5"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button
                            type="button"
                            className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition outline-none"
                        >
                            Bulk Conversion
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* DROPDOWN MENU */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-[100%] w-64 pt-2 z-50">
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-2 animate-in fade-in zoom-in-95 duration-200">
                                    {bulkLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                        >
                                            <div className="text-slate-400 group-hover:text-blue-600">
                                                {link.icon}
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">
                                                {link.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-6">
                    <Link
                        href="/unit-converter"
                        className="block text-lg font-black tracking-tight text-slate-900"
                        onClick={() => setMenuOpen(false)}
                    >
                        All in One Converter
                    </Link>

                    <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Bulk Tools
                        </p>

                        {bulkLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-700 font-bold"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}