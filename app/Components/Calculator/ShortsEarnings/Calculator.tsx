"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp, Globe, DollarSign, ChevronDown, Search, Zap, Tag } from "lucide-react";

const COUNTRY_RPM: Record<string, { rpm: number; flag: string }> = {
    "India": { rpm: 0.02, flag: "🇮🇳" },
    "United States": { rpm: 0.21, flag: "🇺🇸" },
    "Brazil": { rpm: 0.04, flag: "🇧🇷" },
    "Indonesia": { rpm: 0.015, flag: "🇮🇩" },
    "Mexico": { rpm: 0.035, flag: "🇲🇽" },
    "Japan": { rpm: 0.115, flag: "🇯🇵" },
    "Germany": { rpm: 0.125, flag: "🇩🇪" },
    "Vietnam": { rpm: 0.02, flag: "🇻🇳" },
    "Philippines": { rpm: 0.025, flag: "🇵🇭" },
    "Turkey": { rpm: 0.03, flag: "🇹🇷" },
    "Pakistan": { rpm: 0.012, flag: "🇵🇰" },
    "United Kingdom": { rpm: 0.13, flag: "🇬🇧" },
    "Egypt": { rpm: 0.012, flag: "🇪🇬" },
    "France": { rpm: 0.08, flag: "🇫🇷" },
    "Bangladesh": { rpm: 0.01, flag: "🇧🇩" },
    "Thailand": { rpm: 0.035, flag: "🇹🇭" },
    "South Korea": { rpm: 0.17, flag: "🇰🇷" },
    "Italy": { rpm: 0.07, flag: "🇮🇹" },
    "Spain": { rpm: 0.06, flag: "🇪🇸" },
    "Canada": { rpm: 0.12, flag: "🇨🇦" },
};

const PROMO_BONUS = 0.01;

const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(v);

const compact = (n: number) =>
    Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

function EarningCard({ period, value, highlight = false }: { period: string; value: number; highlight?: boolean }) {
    return (
        <div
            className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-200 ${highlight
                ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            <span
                className={`text-xs font-semibold uppercase tracking-wider ${highlight ? "text-red-100" : "text-slate-500"
                    }`}
            >
                {period}
            </span>
            <div className="mt-3">
                <span className={`text-3xl font-extrabold tracking-tight ${highlight ? "text-white" : "text-slate-900"}`}>
                    {fmt(value)}
                </span>
            </div>
            {highlight && <Zap size={40} className="absolute -right-2 -bottom-2 text-white/10 rotate-12 pointer-events-none" />}
        </div>
    );
}

export default function Calculator() {
    const [rawViews, setRawViews] = useState("1000000");
    const [country, setCountry] = useState("United States");
    const [hasPromo, setHasPromo] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const monthlyViews = parseFloat(rawViews) || 0;
    const selected = COUNTRY_RPM[country];
    const effectiveRpm = selected.rpm + (hasPromo ? PROMO_BONUS : 0);

    const earnings = useMemo(() => {
        const monthly = (monthlyViews / 1000) * effectiveRpm;
        return { daily: monthly / 30, monthly, yearly: monthly * 12 };
    }, [monthlyViews, effectiveRpm]);

    const filtered = Object.entries(COUNTRY_RPM).filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 pb-12">
            <div className="mx-auto max-w-2xl px-6 py-8 space-y-6">

                {/* Views Input Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300">
                    <label className="mb-3 flex items-center gap-2">
                        <TrendingUp size={16} className="text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Monthly Avg. Views
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={
                                rawViews
                                    ? Number(rawViews).toLocaleString(
                                        typeof window !== "undefined"
                                            ? navigator.language
                                            : "en-US"
                                    )
                                    : ""
                            }
                            onChange={(e) =>
                                setRawViews(e.target.value.replace(/[^0-9]/g, ""))
                            }
                            placeholder="e.g. 1,000,000"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-2xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all"
                        />
                        {monthlyViews > 0 && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                {compact(monthlyViews)} / mo
                            </span>
                        )}
                    </div>
                </div>

                {/* Country Selector Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300">
                    <label className="mb-3 flex items-center gap-2">
                        <Globe size={16} className="text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Audience Country
                        </span>
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setOpen((p) => !p)}
                            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-left transition-all outline-none focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-xl">{selected.flag}</span>
                                <span className="font-semibold text-slate-900">{country}</span>
                                <span className="rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                                    ${selected.rpm.toFixed(3)} RPM
                                </span>
                            </span>
                            <ChevronDown size={18} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>

                        {open && (
                            <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                                <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 bg-slate-50">
                                    <Search size={16} className="text-slate-400" />
                                    <input
                                        autoFocus
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search country…"
                                        className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                                    />
                                </div>
                                <ul className="max-h-56 overflow-y-auto py-1">
                                    {filtered.map(([name, data]) => (
                                        <li key={name}>
                                            <button
                                                onClick={() => { setCountry(name); setOpen(false); setSearch(""); }}
                                                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${country === name ? "bg-red-50/60 font-semibold text-red-600" : "text-slate-700"}`}
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <span>{data.flag}</span>
                                                    <span>{name}</span>
                                                </span>
                                                <span className="text-xs font-medium text-slate-500">
                                                    ${data.rpm.toFixed(3)}/1K
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                    {filtered.length === 0 && (
                                        <li className="py-6 text-center text-xs font-medium text-slate-400">
                                            No matching countries found
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Promotion Toggle Card */}
                <div
                    className={`rounded-2xl border p-6 transition-all cursor-pointer select-none shadow-sm ${hasPromo
                        ? "border-red-200 bg-red-50/40"
                        : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    onClick={() => setHasPromo((p) => !p)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`rounded-xl p-2.5 ${hasPromo ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                <Tag size={18} />
                            </div>
                            <div>
                                <p className={`text-xs font-bold uppercase tracking-wider ${hasPromo ? "text-red-600" : "text-slate-500"}`}>
                                    Sponsorship / Promotion
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                    Does this channel contain sponsored content?
                                </p>
                            </div>
                        </div>

                        {/* Toggle Switch */}
                        <div className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${hasPromo ? "bg-red-600" : "bg-slate-200"}`}>
                            <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${hasPromo ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                    </div>

                    {hasPromo && (
                        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-600/10 border border-red-200/60 px-3.5 py-2 text-xs font-semibold text-red-700">
                            <Zap size={14} className="text-red-600" fill="currentColor" />
                            <span>+$0.010 / 1K RPM Sponsorship bonus applied</span>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Estimated Revenue
                        </span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <EarningCard period="Daily" value={earnings.daily} />
                        <EarningCard period="Monthly" value={earnings.monthly} highlight />
                        <EarningCard period="Yearly" value={earnings.yearly} />
                    </div>

                    {/* Breakdown Params Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs text-slate-600 shadow-sm">
                        <div>
                            <span className="text-slate-400">Base RPM:</span>{" "}
                            <span className="font-semibold text-slate-800">${selected.rpm.toFixed(3)}</span>
                        </div>
                        {hasPromo && (
                            <div>
                                <span className="text-slate-400">Promo Bonus:</span>{" "}
                                <span className="font-semibold text-red-600">+$0.010</span>
                            </div>
                        )}
                        <div>
                            <span className="text-slate-400">Effective RPM:</span>{" "}
                            <span className="font-semibold text-slate-900">${effectiveRpm.toFixed(3)}</span>
                        </div>
                        <div>
                            <span className="text-slate-400">Views:</span>{" "}
                            <span className="font-semibold text-slate-800">{compact(monthlyViews)}</span>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400">
                    Estimates only · Actual earnings depend on audience retention, engagement, and advertiser demand.
                </p>
            </div>
        </div>
    );
}