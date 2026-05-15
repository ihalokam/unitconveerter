"use client";

import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { TrendingUp, Globe, Layers, Clock, ChevronDown, DollarSign, Info, Zap } from "lucide-react";

// ─── DATA v4 ───────────────────────────────────────────────────────────────

const NICHES = [
    { id: "finance", label: "Finance & Investing", group: "fin", tier: "H" },
    { id: "realestate", label: "Real Estate", group: "fin", tier: "H" },
    { id: "insurance", label: "Insurance / Legal", group: "fin", tier: "H" },
    { id: "saas", label: "SaaS / B2B Tech", group: "bus", tier: "H" },
    { id: "business", label: "Business & Marketing", group: "bus", tier: "H" },
    { id: "tech", label: "Technology", group: "tech", tier: "H" },
    { id: "ai", label: "AI & Software", group: "tech", tier: "H" },
    { id: "health", label: "Health & Medical", group: "edu", tier: "M" },
    { id: "education", label: "Education", group: "edu", tier: "M" },
    { id: "auto", label: "Automotive", group: "auto", tier: "M" },
    { id: "news", label: "News & Politics", group: "news", tier: "M" },
    { id: "sports", label: "Sports", group: "sports", tier: "M" },
    { id: "gaming", label: "Gaming", group: "gaming", tier: "L" },
    { id: "comedy", label: "Comedy", group: "vlog", tier: "L" },
    { id: "vlogs", label: "Vlogs & Lifestyle", group: "vlog", tier: "L" },
    { id: "music", label: "Music", group: "music", tier: "L" },
    { id: "kids", label: "Kids Content", group: "kids", tier: "S" },
    { id: "mixed", label: "Mixed / General", group: "sports", tier: "S" },
] as const;

const currentYear = new Date().getFullYear();

type NicheId = (typeof NICHES)[number]["id"];
type NicheGroup = (typeof NICHES)[number]["group"];
type NicheTier = (typeof NICHES)[number]["tier"];

const NM: Record<NicheGroup, number> = {
    fin: 2.6, bus: 1.9, tech: 1.6, edu: 1.2, auto: 1.3,
    news: 0.85, sports: 0.75, gaming: 0.65, vlog: 0.60, music: 0.32, kids: 0.30,
};

const LENGTHS = [
    { id: "u5", label: "< 5 min", durMult: 0.40, mvr: 0.35, note: "Pre-roll only", adBreaks: "0 mid-rolls" },
    { id: "5to8", label: "5–8 min", durMult: 0.65, mvr: 0.42, note: "Pre-roll only", adBreaks: "0 mid-rolls" },
    { id: "8to15", label: "8–15 min", durMult: 1.00, mvr: 0.50, note: "Mid-rolls enabled", adBreaks: "1–3 mid-rolls" },
    { id: "15to30", label: "15–30 min", durMult: 1.80, mvr: 0.55, note: "Multiple mid-rolls", adBreaks: "3–6 mid-rolls" },
    { id: "30p", label: "30+ min", durMult: 2.80, mvr: 0.60, note: "Max mid-rolls", adBreaks: "6–12 mid-rolls" },
] as const;

type LengthId = (typeof LENGTHS)[number]["id"];

const COUNTRIES = [
    { code: "US", name: "United States", flag: "🇺🇸", tier: 1, base: 7.5 },
    { code: "AU", name: "Australia", flag: "🇦🇺", tier: 1, base: 7.6 },
    { code: "CH", name: "Switzerland", flag: "🇨🇭", tier: 1, base: 8.2 },
    { code: "NO", name: "Norway", flag: "🇳🇴", tier: 1, base: 7.0 },
    { code: "SE", name: "Sweden", flag: "🇸🇪", tier: 1, base: 6.3 },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", tier: 1, base: 6.4 },
    { code: "NL", name: "Netherlands", flag: "🇳🇱", tier: 1, base: 6.0 },
    { code: "CA", name: "Canada", flag: "🇨🇦", tier: 1, base: 5.5 },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿", tier: 1, base: 5.1 },
    { code: "DE", name: "Germany", flag: "🇩🇪", tier: 1, base: 5.0 },
    { code: "PL", name: "Poland", flag: "🇵🇱", tier: 2, base: 5.0 },
    { code: "FR", name: "France", flag: "🇫🇷", tier: 2, base: 4.7 },
    { code: "SG", name: "Singapore", flag: "🇸🇬", tier: 2, base: 4.6 },
    { code: "AE", name: "UAE", flag: "🇦🇪", tier: 2, base: 4.0 },
    { code: "JP", name: "Japan", flag: "🇯🇵", tier: 2, base: 3.5 },
    { code: "KR", name: "South Korea", flag: "🇰🇷", tier: 2, base: 3.2 },
    { code: "IT", name: "Italy", flag: "🇮🇹", tier: 2, base: 2.8 },
    { code: "ES", name: "Spain", flag: "🇪🇸", tier: 2, base: 2.5 },
    { code: "BR", name: "Brazil", flag: "🇧🇷", tier: 2, base: 1.6 },
    { code: "MX", name: "Mexico", flag: "🇲🇽", tier: 2, base: 1.5 },
    { code: "TR", name: "Turkey", flag: "🇹🇷", tier: 2, base: 1.3 },
    { code: "IN", name: "India", flag: "🇮🇳", tier: 3, base: 1.60 },
    { code: "TH", name: "Thailand", flag: "🇹🇭", tier: 3, base: 1.10 },
    { code: "ID", name: "Indonesia", flag: "🇮🇩", tier: 3, base: 0.90 },
    { code: "PH", name: "Philippines", flag: "🇵🇭", tier: 3, base: 0.85 },
    { code: "VN", name: "Vietnam", flag: "🇻🇳", tier: 3, base: 0.75 },
    { code: "PK", name: "Pakistan", flag: "🇵🇰", tier: 3, base: 0.60 },
    { code: "EG", name: "Egypt", flag: "🇪🇬", tier: 3, base: 0.55 },
    { code: "BD", name: "Bangladesh", flag: "🇧🇩", tier: 3, base: 0.45 },
];

const TIER_BADGE: Record<NicheTier, string> = {
    H: "bg-emerald-50 text-emerald-600 border-emerald-100",
    M: "bg-amber-50 text-amber-500 border-amber-100",
    L: "bg-slate-100 text-slate-400 border-slate-200",
    S: "bg-purple-50 text-purple-500 border-purple-100",
};
const TIER_NAME: Record<NicheTier, string> = {
    H: "High CPM", M: "Mid CPM", L: "Low CPM", S: "Special",
};

const fv = (n: number) =>
    n >= 1e9 ? (n / 1e9).toFixed(1) + "B"
        : n >= 1e6 ? (n / 1e6).toFixed(1) + "M"
            : n >= 1e3 ? (n / 1e3).toFixed(0) + "K"
                : String(n);

const fc = (n: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", maximumFractionDigits: 0,
    }).format(n);

// ─── Label sub-component ────────────────────────────────────────────────────

interface LabelProps {
    icon: ReactNode;
    text: string;
    htmlFor?: string;
}

function Label({ icon, text, htmlFor }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="flex items-center gap-1.5 mb-3 cursor-pointer">
            <span className="text-blue-500">{icon}</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-slate-400">
                {text}
            </span>
        </label>
    );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function Calculator() {
    const [views, setViews] = useState(500_000);
    const [raw, setRaw] = useState("500000");
    const [country, setCountry] = useState("IN");
    const [niche, setNiche] = useState<NicheId>("education");
    const [length, setLength] = useState<LengthId>("8to15");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const C = COUNTRIES.find(c => c.code === country);
    const N = NICHES.find(n => n.id === niche);
    const L = LENGTHS.find(l => l.id === length);

    const est = useMemo(() => {
        if (!C || !N || !L) return { mid: 0, low: 0, high: 0, rpm: 0, monViews: 0 };
        const rpm = C.base * NM[N.group] * L.durMult;
        const monViews = views * L.mvr;
        const mid = (monViews / 1000) * rpm;
        return { mid, low: mid * 0.55, high: mid * 1.70, rpm, monViews };
    }, [views, C, N, L]);

    const durationChart = useMemo(() => {
        if (!C || !N) return [];
        return LENGTHS.map(l => {
            const rpm = C.base * NM[N.group] * l.durMult;
            const mid = (views * l.mvr / 1000) * rpm;
            return { label: l.label, mid, adBreaks: l.adBreaks };
        });
    }, [views, C, N]);

    const maxDur = Math.max(...durationChart.map(d => d.mid), 0);

    const usData = COUNTRIES.find(c => c.code === "US");
    const usBase = usData?.base ?? 7.5;

    const usRpm = useMemo(() => {
        if (!N || !L) return 0;
        return usBase * NM[N.group] * L.durMult;
    }, [N, L, usBase]);

    const logVal = Math.log10(Math.max(views, 100));

    return (
        <div className="min-h-screen bg-[#f7f8fa] font-sans">



            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
                    <div className="space-y-4">

                        {/* VIEWS */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5">
                            <Label htmlFor="views-input" icon={<TrendingUp size={12} />} text="Monthly Long-form Video Views" />
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    id="views-input"
                                    type="text"
                                    value={raw}
                                    onChange={e => {
                                        setRaw(e.target.value);
                                        const n = parseInt(e.target.value.replace(/,/g, ""), 10);
                                        if (!isNaN(n) && n >= 100 && n <= 1e9) setViews(n);
                                    }}
                                    placeholder="e.g. 500000"
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xl font-black text-slate-900 tracking-tight focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                />
                                <div className="bg-blue-600 text-white rounded-xl px-4 py-2.5 font-mono font-bold text-sm min-w-[60px] text-center">
                                    {fv(views)}
                                </div>
                            </div>
                            <input
                                type="range" min={2} max={9} step={0.01} value={logVal}
                                onChange={e => {
                                    const v = Math.round(Math.pow(10, parseFloat(e.target.value)));
                                    setViews(v);
                                    setRaw(String(v));
                                }}
                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right,#2563eb ${((logVal - 2) / 7) * 100}%,#e2e8f0 ${((logVal - 2) / 7) * 100}%)`,
                                }}
                            />
                            <div className="flex justify-between mt-1.5">
                                {["100", "1K", "10K", "100K", "1M", "10M", "100M", "1B"].map(l => (
                                    <span key={l} className="text-[9px] font-mono text-slate-300">{l}</span>
                                ))}
                            </div>
                        </div>

                        {/* COUNTRY */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5 relative">
                            <Label icon={<Globe size={12} />} text="Primary Audience Country" />
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="w-full flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 hover:border-blue-400 transition-colors text-left"
                            >
                                <span className="text-lg">{C?.flag}</span>
                                <span className="flex-1 text-sm font-semibold text-slate-800">{C?.name}</span>
                                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${C?.tier === 1 ? "bg-blue-50 text-blue-600 border-blue-100"
                                    : C?.tier === 2 ? "bg-amber-50 text-amber-500 border-amber-100"
                                        : "bg-slate-100 text-slate-400 border-slate-200"
                                    }`}>Tier {C?.tier}</span>
                                <span className="font-mono text-xs text-slate-400">avg ${C?.base.toFixed(1)} RPM</span>
                                <ChevronDown size={13} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                            </button>

                            {open && (
                                <div className="absolute z-30 left-5 right-5 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden">
                                    <div className="p-2.5 border-b border-slate-100">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Search country…"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="w-full text-sm px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="max-h-52 overflow-y-auto">
                                        {COUNTRIES
                                            .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                                            .map(c => (
                                                <button
                                                    key={c.code}
                                                    type="button"
                                                    onClick={() => { setCountry(c.code); setOpen(false); setSearch(""); }}
                                                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors ${c.code === country ? "bg-blue-50" : ""}`}
                                                >
                                                    <span className="text-base">{c.flag}</span>
                                                    <span className={`flex-1 text-sm font-medium ${c.code === country ? "text-blue-600" : "text-slate-700"}`}>
                                                        {c.name}
                                                    </span>
                                                    <span className="font-mono text-[9px] text-slate-400">${c.base.toFixed(1)} avg RPM</span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NICHE */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5">
                            <Label icon={<Layers size={12} />} text="Channel Niche" />
                            <div className="flex flex-wrap gap-2">
                                {NICHES.map(n => {
                                    const active = n.id === niche;
                                    return (
                                        <button
                                            key={n.id}
                                            type="button"
                                            onClick={() => setNiche(n.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all ${active
                                                ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                                                : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                                                }`}
                                        >
                                            {n.label}
                                            {!active && (
                                                <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${TIER_BADGE[n.tier]}`}>
                                                    {TIER_NAME[n.tier]}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* LENGTH */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-5">
                            <Label icon={<Clock size={12} />} text="Average Video Length" />
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                                {LENGTHS.map(l => {
                                    const active = l.id === length;
                                    return (
                                        <button
                                            key={l.id}
                                            type="button"
                                            onClick={() => setLength(l.id)}
                                            className={`py-3 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${active
                                                ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                                                : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                                                }`}
                                        >
                                            <span>{l.label}</span>
                                            <span className={`text-[8px] font-normal ${active ? "opacity-80 text-white" : "text-slate-400"}`}>
                                                {l.adBreaks}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* DURATION REVENUE CHART */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center gap-1.5 mb-3">
                                    <Zap size={11} className="text-blue-500" />
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                                        Revenue by Duration — {C?.flag} {C?.name}, {N?.label}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {durationChart.map((d, i) => {
                                        const pct = maxDur > 0 ? (d.mid / maxDur) * 100 : 0;
                                        const isActive = LENGTHS[i].id === length;
                                        return (
                                            <div key={d.label} className="flex items-center gap-3">
                                                <span className={`text-[10px] font-mono w-14 shrink-0 ${isActive ? "text-blue-600 font-bold" : "text-slate-400"}`}>
                                                    {d.label}
                                                </span>
                                                <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${isActive ? "bg-blue-600" : "bg-slate-300"}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                                <span className={`text-[10px] font-mono font-bold w-16 text-right shrink-0 ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                                                    {fc(d.mid)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[9px] text-slate-400 mt-2 font-mono">
                                    30+ min earns {(durationChart[4]?.mid / Math.max(durationChart[2]?.mid ?? 1, 1)).toFixed(1)}× more than 8–15 min due to mid-roll compounding
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="space-y-4">

                        <div className="bg-blue-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-1.5 mb-1">
                                <DollarSign size={12} className="text-blue-300" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300">
                                    Monthly Estimate
                                </span>
                            </div>
                            <div className="text-4xl font-black tracking-tighter mt-1.5">{fc(est.mid)}</div>
                            <div className="text-sm text-blue-200 mt-0.5">{fc(est.low)} – {fc(est.high)}</div>
                            <div className="border-t border-blue-500/60 mt-5 pt-4">
                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 mb-1">Annual</div>
                                <div className="text-2xl font-black tracking-tight">{fc(est.mid * 12)}</div>
                                <div className="text-xs text-blue-300 mt-0.5">{fc(est.low * 12)} – {fc(est.high * 12)}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-5 divide-y divide-slate-50">
                            {([
                                { label: "Ad RPM (Monetized)", val: `$${est.rpm.toFixed(2)}` },
                                { label: "Total RPM (Overall)", val: `$${((est.mid / (views / 1000)) || 0).toFixed(2)}` },
                                { label: "Monetized Views", val: fv(est.monViews) },
                                { label: "Country Base RPM", val: `$${C?.base.toFixed(1)}` },
                                { label: `Niche Mult (${N?.group})`, val: `×${N ? NM[N.group].toFixed(1) : "—"}` },
                                { label: `Duration Mult (${L?.label})`, val: `×${L?.durMult.toFixed(2)}` },
                            ] as const).map(m => (
                                <div key={m.label} className="flex items-center justify-between py-2.5">
                                    <span className="text-xs text-slate-500">{m.label}</span>
                                    <span className="font-mono text-sm font-bold text-slate-900">{m.val}</span>
                                </div>
                            ))}
                        </div>

                        {country !== "US" && (
                            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    Same views with US audience
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xl font-black text-slate-700">
                                        {fc((views * (L?.mvr ?? 0) / 1000) * usRpm)}
                                    </span>
                                    <span className="text-xs text-slate-400">/month</span>
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1">
                                    {(usRpm / (est.rpm || 1)).toFixed(1)}× more than {C?.name} audience
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-900 rounded-2xl p-5">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-3">Per Views</div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                {([["1K", 1_000], ["100K", 100_000], ["1M", 1_000_000]] as [string, number][]).map(([lbl, m]) => (
                                    <div key={lbl} className="bg-slate-800 rounded-xl py-3">
                                        <div className="text-sm font-black text-white">{fc((est.mid / views) * m)}</div>
                                        <div className="text-[9px] font-mono text-slate-500 mt-0.5 uppercase">{lbl} views</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                            <div className="flex gap-2">
                                <Info size={13} className="text-amber-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 mb-1">
                                        Seasonal Variance
                                    </p>
                                    <p className="text-[11px] text-amber-700 leading-relaxed">
                                        Q4 (Oct–Dec) pays <strong>40–80% more</strong>. January RPM drops 30–50%. Range above reflects both extremes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                            {currentYear} creator-reported data. Excludes sponsorships &amp; memberships.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    appearance: none; width: 16px; height: 16px; border-radius: 50%;
                    background: #2563eb; cursor: pointer; border: 2px solid white;
                    box-shadow: 0 0 0 2px #2563eb;
                }
                input[type=range]::-moz-range-thumb {
                    width: 16px; height: 16px; border-radius: 50%;
                    background: #2563eb; cursor: pointer; border: 2px solid white;
                    box-shadow: 0 0 0 2px #2563eb;
                }
            `}</style>
        </div>
    );
}