"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    FileText,
} from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const bulkLinks = [
        {
            name: "Pressure",
            href: "/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files",
            icon: <Gauge className="w-4 h-4" />,
        },
        {
            name: "Length & Distance",
            href: "/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files",
            icon: <Ruler className="w-4 h-4" />,
        },
        {
            name: "Mass & Weight",
            href: "/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files",
            icon: <Weight className="w-4 h-4" />,
        },
        {
            name: "Temperature",
            href: "/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files",
            icon: <Thermometer className="w-4 h-4" />,
        },
        {
            name: "Volume",
            href: "/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files",
            icon: <Droplets className="w-4 h-4" />,
        },
        {
            name: "Energy & Power",
            href: "/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files",
            icon: <Zap className="w-4 h-4" />,
        },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* LOGO SECTION */}
                <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
                    <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 group-hover:border-blue-500 group-hover:shadow-sm transition-all duration-200">
                        <Image
                            src="/logo.webp"
                            alt="Standard Convert Logo"
                            fill
                            sizes="36px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={true}
                        />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 font-mono">
                        STANDARD<span className="text-blue-600 font-extrabold">CONVERT</span>
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-1 lg:gap-2">
                    <Link
                        href="/unit-converter"
                        className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                        All-in-One
                    </Link>

                    <Link
                        href="/pdf-tools"
                        className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                        PDF Tools
                    </Link>

                    <Link
                        href="/calculator"
                        className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                    >
                        Calculators
                    </Link>

                    {/* DROPDOWN CONTAINER */}
                    <div
                        className="relative"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button
                            type="button"
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors outline-none cursor-pointer ${dropdownOpen
                                    ? "text-blue-600 bg-slate-50"
                                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                                }`}
                        >
                            <span>Bulk Conversion</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                                    }`}
                            />
                        </button>

                        {/* DROPDOWN MENU */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-full pt-1.5 w-72 z-50">
                                <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-2 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-3 py-1.5 mb-1">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                            Bulk Conversion Tools
                                        </p>
                                    </div>
                                    {bulkLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            prefetch={false}
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-all duration-150 group"
                                        >
                                            <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {link.icon}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
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
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-4 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1">
                        <Link
                            href="/unit-converter"
                            className="block px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            All in One Converter
                        </Link>

                        <Link
                            href="/pdf-tools"
                            className="block px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            PDF Tools
                        </Link>

                        <Link
                            href="/calculator"
                            className="block px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Creator Calculators
                        </Link>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                        <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Bulk Tools
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {bulkLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 p-2.5 bg-slate-50/80 hover:bg-blue-50/80 rounded-xl text-slate-700 hover:text-blue-600 transition group"
                                >
                                    <div className="p-1.5 rounded-lg bg-white text-slate-500 shadow-sm group-hover:text-blue-600">
                                        {link.icon}
                                    </div>
                                    <span className="text-sm font-semibold">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}