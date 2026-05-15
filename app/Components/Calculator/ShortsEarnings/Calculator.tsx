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
        <div className={`relative flex flex-col gap-3 rounded-3xl border p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-600 ${highlight ? "bg-blue-600 border-blue-600" : "bg-slate-50 border-slate-100"
            }`}>
            <span className={`font-mono text-[10px] font-black uppercase tracking-[0.35em] ${highlight ? "text-blue-200" : "text-slate-400"}`}>
                {period}
            </span>
            <span className={`text-3xl font-black tracking-tighter ${highlight ? "text-white" : "text-slate-900"}`}>
                {fmt(value)}
            </span>
            {highlight && <Zap size={48} className="absolute -right-2 -top-2 text-white/10 rotate-12" />}
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
        <div className="min-h-screen bg-white font-sans">


            {/* Body */}
            <div className="mx-auto max-w-2xl px-6 py-10 space-y-5">

                {/* Views */}
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100">
                    <label className="mb-4 flex items-center gap-2">
                        <TrendingUp size={13} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                            Monthly Avg. Views
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={Number(rawViews).toLocaleString()}
                            onChange={(e) => setRawViews(e.target.value.replace(/[^0-9]/g, ""))}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-2xl font-black tracking-tighter text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        {monthlyViews > 0 && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                {compact(monthlyViews)}/mo
                            </span>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100">
                    <label className="mb-4 flex items-center gap-2">
                        <Globe size={13} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                            Audience Country
                        </span>
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setOpen((p) => !p)}
                            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition-all outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-2xl">{selected.flag}</span>
                                <span className="font-black tracking-tight text-slate-900">{country}</span>
                                <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                                    ${selected.rpm.toFixed(3)}/1K
                                </span>
                            </span>
                            <ChevronDown size={17} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>

                        {open && (
                            <div className="absolute z-50 mt-2 w-full rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-blue-100 overflow-hidden">
                                <div className="flex items-center gap-2 border-b border-slate-100 p-3">
                                    <Search size={14} className="text-slate-400" />
                                    <input
                                        autoFocus
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search country…"
                                        className="flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
                                    />
                                </div>
                                <ul className="max-h-60 overflow-y-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {filtered.map(([name, data]) => (
                                        <li key={name}>
                                            <button
                                                onClick={() => { setCountry(name); setOpen(false); setSearch(""); }}
                                                className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-slate-50 ${country === name ? "bg-blue-50" : ""}`}
                                            >
                                                <span className="text-xl">{data.flag}</span>
                                                <span className={`flex-1 text-sm font-black tracking-tight ${country === name ? "text-blue-600" : "text-slate-800"}`}>
                                                    {name}
                                                </span>
                                                <span className="font-mono text-[10px] font-black text-slate-400">
                                                    ${data.rpm.toFixed(3)}/1K
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                    {filtered.length === 0 && (
                                        <li className="py-6 text-center font-mono text-[10px] font-black uppercase tracking-widest text-slate-300">
                                            No results
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Promotion Toggle */}
                <div
                    className={`rounded-3xl border p-6 transition-all duration-300 cursor-pointer select-none ${hasPromo
                        ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100"
                        : "border-slate-100 bg-slate-50 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100"
                        }`}
                    onClick={() => setHasPromo((p) => !p)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Tag size={14} className={hasPromo ? "text-blue-600" : "text-slate-400"} />
                            <div>
                                <p className={`font-mono text-[10px] font-black uppercase tracking-[0.35em] ${hasPromo ? "text-blue-600" : "text-slate-400"}`}>
                                    Product Promotion
                                </p>
                                <p className="mt-0.5 text-sm font-black tracking-tight text-slate-900">
                                    Does this channel have sponsored content?
                                </p>
                            </div>
                        </div>
                        {/* Toggle */}
                        <div className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${hasPromo ? "bg-blue-600" : "bg-slate-200"}`}>
                            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${hasPromo ? "translate-x-6" : "translate-x-1"}`} />
                        </div>
                    </div>
                    {hasPromo && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2">
                            <Zap size={11} className="text-white" fill="currentColor" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white">
                                +$0.010 / 1K RPM bonus applied
                            </span>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                        <DollarSign size={13} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                            Estimated Earnings
                        </span>
                        <span className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <EarningCard period="Daily" value={earnings.daily} />
                        <EarningCard period="Monthly" value={earnings.monthly} highlight />
                        <EarningCard period="Yearly" value={earnings.yearly} />
                    </div>

                    {/* Params row */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-3xl border border-slate-100 bg-slate-50 px-6 py-4">
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Base RPM </span>
                            <span className="font-mono text-[10px] font-black text-slate-700">${selected.rpm.toFixed(3)}/1K</span>
                        </div>
                        {hasPromo && (
                            <div>
                                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Promo Bonus </span>
                                <span className="font-mono text-[10px] font-black text-blue-600">+$0.010/1K</span>
                            </div>
                        )}
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Effective RPM </span>
                            <span className="font-mono text-[10px] font-black text-slate-900">${effectiveRpm.toFixed(3)}/1K</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Views/mo </span>
                            <span className="font-mono text-[10px] font-black text-slate-700">{compact(monthlyViews)}</span>
                        </div>
                    </div>
                </div>

                <p className="pb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    Estimates only · Actual earnings vary · Median Shorts RPM data
                </p>
            </div>
        </div>
    );
}