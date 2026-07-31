"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, DollarSign, TrendingUp, Equal } from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(v);

// Logarithmic scale for views: 0→100 maps 1K→1B
const LOG_MIN = Math.log10(1_000);
const LOG_MAX = Math.log10(1_000_000_000);

function sliderToViews(s: number): number {
    return Math.round(Math.pow(10, LOG_MIN + (s / 100) * (LOG_MAX - LOG_MIN)));
}

function compactViews(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EarningCard({
    period,
    value,
    highlight = false,
}: {
    period: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div
            className={`relative flex flex-col gap-2 rounded-2xl border p-5 transition-all duration-300 ${highlight
                    ? "bg-slate-900 border-slate-800 text-white shadow-lg shadow-slate-900/10"
                    : "bg-white border-slate-200 text-slate-900 shadow-sm hover:border-slate-300"
                }`}
        >
            <span
                className={`text-[11px] font-bold uppercase tracking-wider ${highlight ? "text-red-400" : "text-slate-500"
                    }`}
            >
                {period}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {fmt(value)}
            </span>
            {highlight && (
                <Sparkles
                    size={40}
                    className="absolute -right-2 -bottom-2 text-red-500/10 rotate-12 pointer-events-none"
                />
            )}
        </div>
    );
}

function RangeSlider({
    id,
    value,
    min,
    max,
    step,
    onChange,
}: {
    id: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
}) {
    const pct = ((value - min) / (max - min)) * 100;

    return (
        <>
            <style>{`
        .range-${id} {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          background: transparent;
          outline: none;
          cursor: pointer;
        }
        .range-${id}::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #dc2626;
          box-shadow: 0 2px 8px rgba(220,38,38,0.25);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .range-${id}::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(220,38,38,0.35);
        }
        .range-${id}::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #dc2626;
          cursor: pointer;
        }
      `}</style>

            <div className="relative w-full flex items-center py-2">
                {/* Track background */}
                <div className="absolute inset-x-0 h-2 rounded-full bg-slate-100 pointer-events-none">
                    <div
                        className="h-full rounded-full bg-red-600 transition-all duration-75"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <input
                    type="range"
                    className={`range-${id} relative w-full z-10`}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
            </div>
        </>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Slider() {
    // viewSlider: 0–100 (log-mapped to 1K–1B)
    const [viewSlider, setViewSlider] = useState(45); // ~10M
    // rpm: 0.000–1.000, step 0.001
    const [rpm, setRpm] = useState(0.05);

    const monthlyViews = sliderToViews(viewSlider);

    const earnings = useMemo(() => {
        const monthly = (monthlyViews / 1000) * rpm;
        return { daily: monthly / 30, monthly, yearly: monthly * 12 };
    }, [monthlyViews, rpm]);

    return (
        <div className="bg-slate-50/50 min-h-screen py-10 font-sans">
            {/* ── Body ── */}
            <div className="mx-auto max-w-2xl px-6 space-y-6">

                {/* Slider 1 — Monthly Views */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-red-200">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-red-600" />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Monthly Views
                            </span>
                        </div>
                        <span className="rounded-lg bg-red-50 border border-red-100 px-3 py-1 text-xs font-extrabold text-red-600">
                            {compactViews(monthlyViews)}
                        </span>
                    </div>

                    <RangeSlider
                        id="views"
                        value={viewSlider}
                        min={0}
                        max={100}
                        step={0.5}
                        onChange={setViewSlider}
                    />

                    <div className="mt-2 flex justify-between">
                        <span className="text-[11px] font-semibold text-slate-400">1K Views</span>
                        <span className="text-[11px] font-semibold text-slate-400">1B Views</span>
                    </div>
                </div>

                {/* Slider 2 — RPM */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-red-200">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-red-600" />
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                RPM Rate
                            </span>
                        </div>
                        <span className="rounded-lg bg-red-50 border border-red-100 px-3 py-1 text-xs font-extrabold text-red-600">
                            ${rpm.toFixed(3)} / 1K
                        </span>
                    </div>

                    <RangeSlider
                        id="rpm"
                        value={rpm}
                        min={0}
                        max={1}
                        step={0.001}
                        onChange={setRpm}
                    />

                    <div className="mt-2 flex justify-between">
                        <span className="text-[11px] font-semibold text-slate-400">$0.000</span>
                        <span className="text-[11px] font-semibold text-slate-400">$1.000</span>
                    </div>
                </div>

                {/* ── Earnings Cards ── */}
                <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                        <Equal size={16} className="text-red-600" />
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Estimated Revenue Breakdown
                        </span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <EarningCard period="Daily" value={earnings.daily} />
                        <EarningCard period="Monthly" value={earnings.monthly} highlight />
                        <EarningCard period="Yearly" value={earnings.yearly} />
                    </div>

                    {/* Parameters summary badge */}
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm text-xs">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-medium">Views/mo:</span>
                            <span className="font-bold text-slate-900">{compactViews(monthlyViews)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-medium">RPM:</span>
                            <span className="font-bold text-slate-900">${rpm.toFixed(3)}/1K</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-medium">Monthly Est:</span>
                            <span className="font-bold text-red-600">{fmt(earnings.monthly)}</span>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400">
                    *Estimates for reference only. Actual earnings depend on audience geo, retention, and monetization policies.
                </p>
            </div>
        </div>
    );
}