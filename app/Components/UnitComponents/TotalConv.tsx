'use client';

import { useEffect, useState, useCallback, useMemo, useRef, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
    ChevronRight, ArrowLeftRight, RefreshCw, TrendingUp,
} from 'lucide-react';
import {
    CATEGORIES,
    FALLBACK_RATES,
    convertUnits,
    resolveCategoryFromSlug,
    type SimpleUnit,
    type Category,
} from '@/app/lib/unit-convert/units-data';
// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatResult(value: number): string {
    if (!Number.isFinite(value)) return '—';
    if (value === 0) return '0';
    const abs = Math.abs(value);
    if (abs >= 1e15 || (abs < 1e-6 && abs > 0)) return value.toExponential(6);
    if (abs >= 1000) return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(value);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(value);
}

// ─── Sub-components (unchanged) ────────────────────────────────────────────────

interface CategoryTabProps {
    category: Category;
    active: boolean;
    onClick: () => void;
}

function CategoryTab({ category, active, onClick }: CategoryTabProps) {
    return (
        <button
            onClick={onClick}
            style={active ? { borderColor: category.color, background: `${category.color}15`, color: category.color } : undefined}
            className={`flex items-center gap-2 rounded-xl border-[1.5px] px-3 py-2.5 text-[0.85rem] font-medium transition-all duration-150 whitespace-nowrap
                ${active ? 'border-transparent font-bold' : 'border-transparent text-stone-500 hover:bg-stone-50'}`}
        >
            <span style={{ color: active ? category.color : '#94a3b8' }} className="shrink-0">
                {category.icon}
            </span>
            {category.label}
        </button>
    );
}

interface SelectFieldProps {
    label: string;
    value: string;
    units: SimpleUnit[];
    onChange: (v: string) => void;
    accentColor: string;
}

function SelectField({ label, value, units, onChange, accentColor }: SelectFieldProps) {
    return (
        <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ ['--tw-ring-color' as string]: accentColor }}
                    className="w-full cursor-pointer appearance-none rounded-2xl border-[1.5px] border-slate-200 bg-white px-4 py-3.5 pr-10 text-[0.95rem] font-medium text-slate-800 outline-none transition-colors focus:ring-[3px]"
                    onFocus={e => { e.currentTarget.style.borderColor = accentColor; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                    {units.map(u => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                </select>
                <ChevronRight size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
            </div>
        </div>
    );
}

interface ResultDisplayProps {
    result: number | null;
    toUnit: SimpleUnit;
    fromValue: string;
    fromUnit: SimpleUnit;
    accentColor: string;
}

function ResultDisplay({ result, toUnit, fromValue, fromUnit, accentColor }: ResultDisplayProps) {
    const isValid = result !== null && fromValue.trim() !== '';
    return (
        <div
            style={{ background: `linear-gradient(135deg, ${accentColor}08 0%, ${accentColor}15 100%)`, borderColor: `${accentColor}30` }}
            className="flex min-h-[120px] flex-col justify-center gap-2 rounded-[18px] border-[1.5px] px-8 py-7"
        >
            <div style={{ color: accentColor }} className="text-xs font-bold uppercase tracking-widest">
                Result
            </div>
            <div className={`break-all font-mono text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight ${isValid ? 'text-slate-900' : 'text-slate-300'}`}>
                {isValid ? formatResult(result!) : '—'}
            </div>
            {isValid && (
                <div className="text-sm font-medium text-slate-500">
                    {fromValue} {fromUnit.label} = {formatResult(result!)} {toUnit.label}
                </div>
            )}
        </div>
    );
}

interface AllUnitsTableProps {
    category: Category;
    inputValue: number;
    fromUnit: SimpleUnit;
    rates: Record<string, number>;
    fromKey: string;
}

function AllUnitsTable({ category, inputValue, fromUnit, rates, fromKey }: AllUnitsTableProps) {
    if (!Number.isFinite(inputValue) || inputValue === 0) return null;

    return (
        <div className="mt-2">
            <div className="mb-2.5 text-[0.78rem] font-bold uppercase tracking-wider text-slate-400">
                All conversions for {inputValue} {fromUnit.label}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
                {category.units.map(unit => {
                    if (unit.value === fromKey) return null;
                    const result = convertUnits(inputValue, fromUnit, unit, category, rates, fromKey, unit.value);
                    if (result === null) return null;
                    return (
                        <div key={unit.value} className="flex items-center justify-between gap-2 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3">
                            <span className="text-[0.82rem] font-medium text-slate-500">{unit.label}</span>
                            <span className="font-mono text-sm font-bold text-slate-800">
                                {formatResult(result)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface TotalConvProps {
    // Optional server-resolved starting point (e.g. from /convert/lbs-to-kg).
    // When provided, these win over URL-param guessing and skip the default
    // length/m/ft state entirely, so the SSR'd HTML already matches intent.
    initialCategoryKey?: string;
    initialFromKey?: string;
    initialToKey?: string;
}

function TotalConvInner({ initialCategoryKey, initialFromKey, initialToKey }: TotalConvProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const resolvedInitialCatKey = useMemo(() => {
        if (initialCategoryKey && CATEGORIES.some(c => c.key === initialCategoryKey)) return initialCategoryKey;
        const fromQuery = searchParams.get('unit') ?? searchParams.get('category') ?? searchParams.get('type');
        const fromPath = pathname?.split('/').filter(Boolean).pop() ?? null;
        return resolveCategoryFromSlug(fromQuery) ?? resolveCategoryFromSlug(fromPath) ?? 'length';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only ever computed once — later category changes go through the tab click handler

    const [activeCatKey, setActiveCatKey] = useState(resolvedInitialCatKey);
    const [inputValue, setInputValue] = useState('1');

    const initialCategory = useMemo(
        () => CATEGORIES.find(c => c.key === resolvedInitialCatKey) ?? CATEGORIES[0],
        [resolvedInitialCatKey]
    );
    const [fromKey, setFromKey] = useState(
        () => (initialFromKey && initialCategory.units.some(u => u.value === initialFromKey))
            ? initialFromKey
            : initialCategory.units[0].value
    );
    const [toKey, setToKey] = useState(
        () => (initialToKey && initialCategory.units.some(u => u.value === initialToKey))
            ? initialToKey
            : (initialCategory.units[1] ?? initialCategory.units[0]).value
    );

    const [rates, setRates] = useState(FALLBACK_RATES);
    const [rateStatus, setRateStatus] = useState<'idle' | 'loading' | 'live' | 'error'>('idle');
    const [rateDate, setRateDate] = useState('');
    const [showAllUnits, setShowAllUnits] = useState(false);

    const category = useMemo(() => CATEGORIES.find(c => c.key === activeCatKey)!, [activeCatKey]);
    const fromUnit = useMemo(() => category.units.find(u => u.value === fromKey) ?? category.units[0], [category, fromKey]);
    const toUnit = useMemo(() => category.units.find(u => u.value === toKey) ?? category.units[1] ?? category.units[0], [category, toKey]);

    const numericValue = useMemo(() => {
        const n = Number(inputValue);
        return Number.isFinite(n) ? n : null;
    }, [inputValue]);

    const result = useMemo(() => {
        if (numericValue === null || inputValue.trim() === '') return null;
        return convertUnits(numericValue, fromUnit, toUnit, category, rates, fromKey, toKey);
    }, [numericValue, fromUnit, toUnit, category, rates, fromKey, toKey, inputValue]);

    const fetchRates = useCallback(async () => {
        setRateStatus('loading');
        try {
            const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
            if (!res.ok) throw new Error();
            const data = await res.json() as { rates?: Record<string, number>; time_last_update_utc?: string };
            if (!data.rates) throw new Error();
            setRates({ ...FALLBACK_RATES, ...data.rates });
            setRateStatus('live');
            if (data.time_last_update_utc) setRateDate(data.time_last_update_utc.slice(0, 16));
        } catch {
            setRates(FALLBACK_RATES);
            setRateStatus('error');
        }
    }, []);

    useEffect(() => { void fetchRates(); }, [fetchRates]);

    // Only reset from/to units when the person actively switches a category
    // tab — not on first mount, so a server-provided initial pair (or a
    // deep-linked category) survives instead of being clobbered back to
    // the category's first two units.
    const didMount = useRef(false);
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        setFromKey(category.units[0].value);
        setToKey((category.units[1] ?? category.units[0]).value);
        setShowAllUnits(false);
    }, [activeCatKey, category]);

    const handleSwap = () => { setFromKey(toKey); setToKey(fromKey); };

    return (
        <div className="min-h-screen font-sans text-stone-800 bg-[#faf9f7]">
            <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

                {/* ── Header ── */}
                <header className="mb-9">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div className="mb-2.5 flex items-center gap-2.5">
                                <div
                                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}99)` }}
                                    className="flex h-9 w-9 items-center justify-center rounded-[10px] text-white"
                                >
                                    <TrendingUp size={18} />
                                </div>
                                <span className="text-[0.78rem] font-bold uppercase tracking-widest text-slate-400">
                                    Unit Converter
                                </span>
                            </div>
                            <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
                                Convert anything,<br />
                                <span style={{ color: category.color }}>instantly.</span>
                            </h1>
                        </div>
                        {activeCatKey === 'currency' && (
                            <div className="flex flex-col items-end gap-1.5">
                                <div
                                    className={`rounded-full px-3 py-1 text-[0.78rem] font-semibold
                                        ${rateStatus === 'live' ? 'bg-green-100 text-green-800'
                                            : rateStatus === 'loading' ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'}`}
                                >
                                    {rateStatus === 'live' ? `● Live · ${rateDate}` : rateStatus === 'loading' ? '● Fetching…' : '● Fallback rates'}
                                </div>
                                <button
                                    onClick={() => void fetchRates()}
                                    disabled={rateStatus === 'loading'}
                                    className="flex items-center gap-1.5 rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-2 text-[0.82rem] font-semibold text-slate-600 disabled:opacity-60"
                                >
                                    <RefreshCw size={14} className={rateStatus === 'loading' ? 'animate-spin' : ''} />
                                    Refresh
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* ── Category Grid ── */}
                <div className="mb-7 grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                    {CATEGORIES.map(cat => (
                        <CategoryTab
                            key={cat.key}
                            category={cat}
                            active={activeCatKey === cat.key}
                            onClick={() => setActiveCatKey(cat.key)}
                        />
                    ))}
                </div>

                {/* ── Main Card ── */}
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04),0_20px_60px_-10px_rgba(0,0,0,0.07)]">
                    <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}60)` }} />

                    <div className="p-5 sm:p-7 lg:p-9">
                        <div className="mb-6">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                Value
                            </label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Enter a number…"
                                style={{ ['--tw-ring-color' as string]: category.color }}
                                className="w-full rounded-2xl border-[1.5px] border-slate-200 bg-slate-50 px-5 py-4 font-mono text-[clamp(1.1rem,3vw,1.5rem)] font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-[3px]"
                                onFocus={e => { e.currentTarget.style.borderColor = category.color; }}
                                onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                            />
                        </div>

                        <div className="mb-6 flex flex-wrap items-end gap-3">
                            <SelectField label="From" value={fromKey} units={category.units} onChange={setFromKey} accentColor={category.color} />

                            <button
                                onClick={handleSwap}
                                style={{ borderColor: `${category.color}40`, background: `${category.color}10`, color: category.color }}
                                className="mb-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] transition-transform duration-300 hover:rotate-180 hover:scale-110"
                                title="Swap units"
                            >
                                <ArrowLeftRight size={18} />
                            </button>

                            <SelectField label="To" value={toKey} units={category.units} onChange={setToKey} accentColor={category.color} />
                        </div>

                        <ResultDisplay
                            result={result}
                            toUnit={toUnit}
                            fromValue={inputValue}
                            fromUnit={fromUnit}
                            accentColor={category.color}
                        />

                        {numericValue !== null && numericValue !== 0 && category.units.length > 2 && (
                            <div className="mt-5">
                                <button
                                    onClick={() => setShowAllUnits(v => !v)}
                                    style={{ color: category.color }}
                                    className="flex items-center gap-1.5 py-1 text-[0.82rem] font-bold"
                                >
                                    <ChevronRight size={16} className={`transition-transform duration-200 ${showAllUnits ? 'rotate-90' : 'rotate-0'}`} />
                                    {showAllUnits ? 'Hide' : 'Show'} all {category.units.length - 1} conversions
                                </button>

                                {showAllUnits && (
                                    <div className="mt-4">
                                        <AllUnitsTable
                                            category={category}
                                            inputValue={numericValue}
                                            fromUnit={fromUnit}
                                            rates={rates}
                                            fromKey={fromKey}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Info Strip ── */}
                <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                    {[
                        { label: 'Categories', value: `${CATEGORIES.length}` },
                        { label: 'Units in this category', value: `${category.units.length}` },
                        { label: 'Total unit types', value: `${CATEGORIES.reduce((s, c) => s + c.units.length, 0)}+` },
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-5 py-4">
                            <span className="text-[0.82rem] font-semibold text-stone-400">{item.label}</span>
                            <span className="text-lg font-extrabold text-stone-900">{item.value}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default function TotalConv(props: TotalConvProps) {
    return (
        <Suspense fallback={null}>
            <TotalConvInner {...props} />
        </Suspense>
    );
}