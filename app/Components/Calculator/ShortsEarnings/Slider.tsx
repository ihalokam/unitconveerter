"use client";

import React, { useState, useMemo } from "react";
import { Zap, DollarSign, TrendingUp } from "lucide-react";

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
            className={`relative flex flex-col gap-3 rounded-3xl border p-6 transition-all duration-300
        hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-600
        ${highlight ? "bg-blue-600 border-blue-600" : "bg-slate-50 border-slate-100"}`}
        >
            <span
                className={`font-mono text-[10px] font-black uppercase tracking-[0.35em]
          ${highlight ? "text-blue-200" : "text-slate-400"}`}
            >
                {period}
            </span>
            <span
                className={`text-3xl font-black tracking-tighter
          ${highlight ? "text-white" : "text-slate-900"}`}
            >
                {fmt(value)}
            </span>
            {highlight && (
                <Zap size={48} className="absolute -right-2 -top-2 text-white/10 rotate-12" />
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
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #2563eb;
          box-shadow: 0 2px 12px rgba(37,99,235,0.22);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .range-${id}::-webkit-slider-thumb:hover {
          transform: scale(1.18);
          box-shadow: 0 4px 20px rgba(37,99,235,0.32);
        }
        .range-${id}::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #2563eb;
          cursor: pointer;
        }
      `}</style>

            <div className="relative w-full flex items-center">
                {/* Track background */}
                <div className="absolute inset-x-0 h-1.5 rounded-full bg-slate-200 pointer-events-none">
                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-75"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <input
                    type="range"
                    className={`range-${id} relative w-full`}
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
        <div className="min-h-screen bg-white font-sans">


            {/* ── Body ── */}
            <div className="mx-auto max-w-2xl px-6 py-10 space-y-5">

                {/* Slider 1 — Monthly Views */}
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={13} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                                Monthly Views
                            </span>
                        </div>
                        <span className="rounded-xl bg-blue-600 px-3 py-1 font-mono text-xs font-black text-white tracking-tight">
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

                    <div className="mt-3 flex justify-between">
                        <span className="font-mono text-[10px] font-black text-slate-300 uppercase tracking-widest">1K</span>
                        <span className="font-mono text-[10px] font-black text-slate-300 uppercase tracking-widest">1B</span>
                    </div>
                </div>

                {/* Slider 2 — RPM */}
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DollarSign size={13} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                                RPM Rate
                            </span>
                        </div>
                        <span className="rounded-xl bg-blue-600 px-3 py-1 font-mono text-xs font-black text-white tracking-tight">
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

                    <div className="mt-3 flex justify-between">
                        <span className="font-mono text-[10px] font-black text-slate-300 uppercase tracking-widest">$0.000</span>
                        <span className="font-mono text-[10px] font-black text-slate-300 uppercase tracking-widest">$1.000</span>
                    </div>
                </div>

                {/* ── Earnings ── */}
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

                    {/* Params pill row */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-3xl border border-slate-100 bg-slate-50 px-6 py-4">
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Views/mo </span>
                            <span className="font-mono text-[10px] font-black text-slate-700">{compactViews(monthlyViews)}</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">RPM </span>
                            <span className="font-mono text-[10px] font-black text-slate-700">${rpm.toFixed(3)}/1K</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Monthly </span>
                            <span className="font-mono text-[10px] font-black text-blue-600">{fmt(earnings.monthly)}</span>
                        </div>
                    </div>
                </div>

                <p className="pb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    Estimates only · Drag sliders to explore scenarios
                </p>
            </div>
        </div>
    );
}