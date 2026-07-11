'use client';

import { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
    Ruler, Weight, Thermometer, Zap, Clock, Globe2,
    Gauge, Wind, Database, Droplets, ChevronRight,
    ArrowLeftRight, RefreshCw, TrendingUp, Square,
    Crosshair, Battery, Waves, Cpu
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SimpleUnit = { label: string; value: string; toBase: number };

type Category = {
    key: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    aliases: string[]; // extra slugs/keywords that should route to this category
    units: SimpleUnit[];
    convert?: (value: number, from: string, to: string) => number;
};

// ─── Unit Data ────────────────────────────────────────────────────────────────

const FALLBACK_RATES: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.1, JPY: 156.4,
    CNY: 7.24, AUD: 1.53, CAD: 1.37, CHF: 0.91,
    SGD: 1.35, AED: 3.67, SAR: 3.75,
};

const CATEGORIES: Category[] = [
    {
        key: 'length', label: 'Length', icon: <Ruler size={18} />, color: '#3b82f6',
        aliases: ['distance', 'meters', 'feet'],
        units: [
            { label: 'Millimeter (mm)', value: 'mm', toBase: 0.001 },
            { label: 'Centimeter (cm)', value: 'cm', toBase: 0.01 },
            { label: 'Meter (m)', value: 'm', toBase: 1 },
            { label: 'Kilometer (km)', value: 'km', toBase: 1000 },
            { label: 'Inch (in)', value: 'in', toBase: 0.0254 },
            { label: 'Foot (ft)', value: 'ft', toBase: 0.3048 },
            { label: 'Yard (yd)', value: 'yd', toBase: 0.9144 },
            { label: 'Mile (mi)', value: 'mi', toBase: 1609.344 },
            { label: 'Nautical Mile', value: 'nmi', toBase: 1852 },
        ],
    },
    {
        key: 'mass', label: 'Mass', icon: <Weight size={18} />, color: '#8b5cf6',
        aliases: ['weight', 'kg', 'kilogram'],
        units: [
            { label: 'Milligram (mg)', value: 'mg', toBase: 0.000001 },
            { label: 'Gram (g)', value: 'g', toBase: 0.001 },
            { label: 'Kilogram (kg)', value: 'kg', toBase: 1 },
            { label: 'Tonne (t)', value: 'tonne', toBase: 1000 },
            { label: 'Ounce (oz)', value: 'oz', toBase: 0.028349523125 },
            { label: 'Pound (lb)', value: 'lb', toBase: 0.45359237 },
            { label: 'Stone', value: 'stone', toBase: 6.35029318 },
        ],
    },
    {
        key: 'temperature', label: 'Temperature', icon: <Thermometer size={18} />, color: '#ef4444',
        aliases: ['temp', 'celsius', 'fahrenheit'],
        units: [
            { label: 'Celsius (°C)', value: 'c', toBase: 1 },
            { label: 'Fahrenheit (°F)', value: 'f', toBase: 1 },
            { label: 'Kelvin (K)', value: 'k', toBase: 1 },
        ],
        convert: (v, from, to) => {
            let c = from === 'f' ? (v - 32) * 5 / 9 : from === 'k' ? v - 273.15 : v;
            if (to === 'f') return c * 9 / 5 + 32;
            if (to === 'k') return c + 273.15;
            return c;
        },
    },
    {
        key: 'area', label: 'Area', icon: <Square size={18} />, color: '#10b981',
        aliases: ['acreage', 'square-feet', 'sqft'],
        units: [
            { label: 'Square Millimeter (mm²)', value: 'mm2', toBase: 0.000001 },
            { label: 'Square Centimeter (cm²)', value: 'cm2', toBase: 0.0001 },
            { label: 'Square Meter (m²)', value: 'm2', toBase: 1 },
            { label: 'Square Kilometer (km²)', value: 'km2', toBase: 1000000 },
            { label: 'Square Inch (in²)', value: 'in2', toBase: 0.00064516 },
            { label: 'Square Foot (ft²)', value: 'ft2', toBase: 0.09290304 },
            { label: 'Square Yard (yd²)', value: 'yd2', toBase: 0.83612736 },
            { label: 'Square Mile (mi²)', value: 'mi2', toBase: 2589988.110336 },
            { label: 'Acre', value: 'acre', toBase: 4046.8564224 },
            { label: 'Hectare (ha)', value: 'hectare', toBase: 10000 },
        ],
    },
    {
        key: 'volume', label: 'Volume', icon: <Waves size={18} />, color: '#06b6d4',
        aliases: ['liters', 'gallons'],
        units: [
            { label: 'Milliliter (ml)', value: 'ml', toBase: 0.001 },
            { label: 'Liter (L)', value: 'l', toBase: 1 },
            { label: 'Cubic Meter (m³)', value: 'm3', toBase: 1000 },
            { label: 'Cubic Inch (in³)', value: 'in3', toBase: 0.016387064 },
            { label: 'Cubic Foot (ft³)', value: 'ft3', toBase: 28.316846592 },
            { label: 'Gallon (US)', value: 'gal-us', toBase: 3.785411784 },
            { label: 'Gallon (UK)', value: 'gal-uk', toBase: 4.54609 },
            { label: 'Fluid Ounce (US)', value: 'fl-oz', toBase: 0.0295735296 },
        ],
    },
    {
        key: 'speed', label: 'Speed', icon: <Wind size={18} />, color: '#f59e0b',
        aliases: ['velocity', 'mph', 'kmh'],
        units: [
            { label: 'Meters/second (m/s)', value: 'mps', toBase: 1 },
            { label: 'Kilometers/hour (km/h)', value: 'kmh', toBase: 0.27778 },
            { label: 'Miles/hour (mph)', value: 'mph', toBase: 0.44704 },
            { label: 'Knots (kn)', value: 'knot', toBase: 0.514444 },
            { label: 'Feet/second (ft/s)', value: 'fps', toBase: 0.3048 },
        ],
    },
    {
        key: 'time', label: 'Time', icon: <Clock size={18} />, color: '#6366f1',
        aliases: ['duration'],
        units: [
            { label: 'Millisecond (ms)', value: 'ms', toBase: 0.001 },
            { label: 'Second (s)', value: 's', toBase: 1 },
            { label: 'Minute (min)', value: 'min', toBase: 60 },
            { label: 'Hour (hr)', value: 'hr', toBase: 3600 },
            { label: 'Day', value: 'day', toBase: 86400 },
            { label: 'Week', value: 'week', toBase: 604800 },
            { label: 'Month (avg)', value: 'month', toBase: 2629800 },
            { label: 'Year', value: 'year', toBase: 31557600 },
        ],
    },
    {
        key: 'energy', label: 'Energy', icon: <Zap size={18} />, color: '#eab308',
        aliases: ['calories', 'joules', 'kwh-energy'],
        units: [
            { label: 'Joule (J)', value: 'j', toBase: 1 },
            { label: 'Kilojoule (kJ)', value: 'kj', toBase: 1000 },
            { label: 'Calorie (cal)', value: 'cal', toBase: 4.184 },
            { label: 'Kilocalorie (kcal)', value: 'kcal', toBase: 4184 },
            { label: 'Watt-hour (Wh)', value: 'wh', toBase: 3600 },
            { label: 'Kilowatt-hour (kWh)', value: 'kwh', toBase: 3600000 },
            { label: 'BTU', value: 'btu', toBase: 1055.06 },
        ],
    },
    {
        key: 'power', label: 'Power', icon: <Battery size={18} />, color: '#f97316',
        aliases: ['watts', 'horsepower'],
        units: [
            { label: 'Watt (W)', value: 'w', toBase: 1 },
            { label: 'Kilowatt (kW)', value: 'kw', toBase: 1000 },
            { label: 'Megawatt (MW)', value: 'mw', toBase: 1000000 },
            { label: 'Horsepower (hp)', value: 'hp', toBase: 745.69987 },
            { label: 'BTU/hour', value: 'btuh', toBase: 0.29307107 },
        ],
    },
    {
        key: 'pressure', label: 'Pressure', icon: <Gauge size={18} />, color: '#84cc16',
        aliases: ['psi', 'bar', 'atm'],
        units: [
            { label: 'Pascal (Pa)', value: 'pa', toBase: 1 },
            { label: 'Kilopascal (kPa)', value: 'kpa', toBase: 1000 },
            { label: 'Bar', value: 'bar', toBase: 100000 },
            { label: 'PSI', value: 'psi', toBase: 6894.75729 },
            { label: 'Atmosphere (atm)', value: 'atm', toBase: 101325 },
            { label: 'mmHg (Torr)', value: 'mmhg', toBase: 133.322 },
        ],
    },
    {
        key: 'data', label: 'Data', icon: <Database size={18} />, color: '#ec4899',
        aliases: ['storage', 'bytes', 'digital'],
        units: [
            { label: 'Bit (b)', value: 'bit', toBase: 0.125 },
            { label: 'Byte (B)', value: 'byte', toBase: 1 },
            { label: 'Kilobyte (KB)', value: 'kb', toBase: 1024 },
            { label: 'Megabyte (MB)', value: 'mb', toBase: 1048576 },
            { label: 'Gigabyte (GB)', value: 'gb', toBase: 1073741824 },
            { label: 'Terabyte (TB)', value: 'tb', toBase: 1099511627776 },
            { label: 'Petabyte (PB)', value: 'pb', toBase: 1125899906842624 },
        ],
    },
    {
        key: 'angle', label: 'Angle', icon: <Crosshair size={18} />, color: '#14b8a6',
        aliases: ['degrees', 'radians'],
        units: [
            { label: 'Degree (°)', value: 'deg', toBase: Math.PI / 180 },
            { label: 'Radian (rad)', value: 'rad', toBase: 1 },
            { label: 'Gradian (grad)', value: 'grad', toBase: Math.PI / 200 },
            { label: 'Arcminute (′)', value: 'arcmin', toBase: Math.PI / 10800 },
            { label: 'Arcsecond (″)', value: 'arcsec', toBase: Math.PI / 648000 },
        ],
    },
    {
        key: 'fuel', label: 'Fuel', icon: <Droplets size={18} />, color: '#0ea5e9',
        aliases: ['mpg', 'fuel-economy', 'mileage'],
        units: [
            { label: 'km/L', value: 'kml', toBase: 1 },
            { label: 'mpg (US)', value: 'mpg-us', toBase: 0.425143707 },
            { label: 'mpg (UK)', value: 'mpg-uk', toBase: 0.354006189 },
            { label: 'L/100km', value: 'l100km', toBase: 1 },
        ],
        convert: (v, from, to) => {
            const fuelCat = CATEGORIES.find(c => c.key === 'fuel')!;
            const toKpl = (val: number, u: string) => u === 'l100km' ? (val === 0 ? Infinity : 100 / val) : val * (fuelCat.units.find(u2 => u2.value === u)?.toBase ?? 1);
            const fromKpl = (val: number, u: string) => u === 'l100km' ? (val === 0 ? Infinity : 100 / val) : val / (fuelCat.units.find(u2 => u2.value === u)?.toBase ?? 1);
            return fromKpl(toKpl(v, from), to);
        },
    },
    {
        key: 'currency', label: 'Currency', icon: <Globe2 size={18} />, color: '#22c55e',
        aliases: ['money', 'exchange-rate', 'forex', 'usd', 'eur'],
        units: Object.keys(FALLBACK_RATES).map(code => ({ label: code, value: code, toBase: 1 })),
    },
    {
        key: 'cpu', label: 'Frequency', icon: <Cpu size={18} />, color: '#a855f7',
        aliases: ['hertz', 'clock-speed'],
        units: [
            { label: 'Hertz (Hz)', value: 'hz', toBase: 1 },
            { label: 'Kilohertz (kHz)', value: 'khz', toBase: 1000 },
            { label: 'Megahertz (MHz)', value: 'mhz', toBase: 1000000 },
            { label: 'Gigahertz (GHz)', value: 'ghz', toBase: 1000000000 },
        ],
    },
];

// ─── URL → Category resolution ────────────────────────────────────────────────
// Lets a person land directly on the right converter, e.g. /?unit=pressure,
// /?unit=pressure-converter, /pressure-converter, or /convert/psi-to-bar

function slugify(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function resolveCategoryFromSlug(raw: string | null): string | null {
    if (!raw) return null;
    const slug = slugify(raw.replace(/-?converter$/i, ''));
    if (!slug) return null;

    for (const cat of CATEGORIES) {
        const candidates = [cat.key, slugify(cat.label), ...cat.aliases.map(slugify)];
        if (candidates.includes(slug)) return cat.key;
        // also match "psi-to-bar" style slugs by checking unit values
        const unitValues = cat.units.map(u => slugify(u.value));
        if (slug.includes('-to-') && slug.split('-to-').some(part => unitValues.includes(part))) {
            return cat.key;
        }
    }
    return null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatResult(value: number): string {
    if (!Number.isFinite(value)) return '—';
    if (value === 0) return '0';
    const abs = Math.abs(value);
    if (abs >= 1e15 || (abs < 1e-6 && abs > 0)) return value.toExponential(6);
    if (abs >= 1000) return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(value);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(value);
}

function convertUnits(value: number, from: SimpleUnit, to: SimpleUnit, category: Category, rates: Record<string, number>, fromKey: string, toKey: string): number | null {
    if (!Number.isFinite(value)) return null;
    if (category.key === 'currency') {
        const fRate = rates[fromKey], tRate = rates[toKey];
        if (!fRate || !tRate) return null;
        return (value / fRate) * tRate;
    }
    if (category.convert) return category.convert(value, fromKey, toKey);
    return (value * from.toBase) / to.toBase;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
                ${active ? 'border-transparent font-bold' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
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

// ─── All Units Table ──────────────────────────────────────────────────────────

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
                        <div key={unit.value} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
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

function TotalConvInner() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const initialCatKey = useMemo(() => {
        const fromQuery = searchParams.get('unit') ?? searchParams.get('category') ?? searchParams.get('type');
        const fromPath = pathname?.split('/').filter(Boolean).pop() ?? null;
        return resolveCategoryFromSlug(fromQuery) ?? resolveCategoryFromSlug(fromPath) ?? 'length';
    }, [searchParams, pathname]);

    const [activeCatKey, setActiveCatKey] = useState(initialCatKey);
    const [inputValue, setInputValue] = useState('1');
    const [fromKey, setFromKey] = useState('m');
    const [toKey, setToKey] = useState('ft');
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

    // Re-sync if the URL changes (e.g. person clicks a different "X converter" link)
    useEffect(() => { setActiveCatKey(initialCatKey); }, [initialCatKey]);

    useEffect(() => {
        setFromKey(category.units[0].value);
        setToKey((category.units[1] ?? category.units[0]).value);
        setShowAllUnits(false);
    }, [activeCatKey, category]);

    const handleSwap = () => { setFromKey(toKey); setToKey(fromKey); };

    return (
        <div className="min-h-screen font-sans text-slate-800" style={{ background: 'linear-gradient(160deg, #f0f9ff 0%, #fafafa 40%, #fff7ed 100%)' }}>
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

                {/* ── Category Grid (wraps — no horizontal scroll, every category visible) ── */}
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
                        {/* ── Input Row ── */}
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

                        {/* ── From / Swap / To ── */}
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

                        {/* ── Result ── */}
                        <ResultDisplay
                            result={result}
                            toUnit={toUnit}
                            fromValue={inputValue}
                            fromUnit={fromUnit}
                            accentColor={category.color}
                        />

                        {/* ── All units toggle ── */}
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
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4">
                            <span className="text-[0.82rem] font-semibold text-slate-400">{item.label}</span>
                            <span className="text-lg font-extrabold text-slate-900">{item.value}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default function TotalConv() {
    return (
        <Suspense fallback={null}>
            <TotalConvInner />
        </Suspense>
    );
}