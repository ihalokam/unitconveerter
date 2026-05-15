'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
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
        units: [
            { label: 'km/L', value: 'kml', toBase: 1 },
            { label: 'mpg (US)', value: 'mpg-us', toBase: 0.425143707 },
            { label: 'mpg (UK)', value: 'mpg-uk', toBase: 0.354006189 },
            { label: 'L/100km', value: 'l100km', toBase: 1 },
        ],
        convert: (v, from, to) => {
            const toKpl = (val: number, u: string) => u === 'l100km' ? (val === 0 ? Infinity : 100 / val) : val * (CATEGORIES.find(c => c.key === 'fuel')!.units.find(u2 => u2.value === u)?.toBase ?? 1);
            const fromKpl = (val: number, u: string) => u === 'l100km' ? (val === 0 ? Infinity : 100 / val) : val / (CATEGORIES.find(c => c.key === 'fuel')!.units.find(u2 => u2.value === u)?.toBase ?? 1);
            return fromKpl(toKpl(v, from), to);
        },
    },
    {
        key: 'currency', label: 'Currency', icon: <Globe2 size={18} />, color: '#22c55e',
        units: Object.keys(FALLBACK_RATES).map(code => ({ label: code, value: code, toBase: 1 })),
    },
    {
        key: 'cpu', label: 'Frequency', icon: <Cpu size={18} />, color: '#a855f7',
        units: [
            { label: 'Hertz (Hz)', value: 'hz', toBase: 1 },
            { label: 'Kilohertz (kHz)', value: 'khz', toBase: 1000 },
            { label: 'Megahertz (MHz)', value: 'mhz', toBase: 1000000 },
            { label: 'Gigahertz (GHz)', value: 'ghz', toBase: 1000000000 },
        ],
    },
];

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
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: active ? `1.5px solid ${category.color}` : '1.5px solid transparent',
                background: active ? `${category.color}15` : 'transparent',
                color: active ? category.color : '#64748b',
                fontWeight: active ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
            }}
        >
            <span style={{ color: active ? category.color : '#94a3b8', flexShrink: 0 }}>{category.icon}</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
            </label>
            <div style={{ position: 'relative' }}>
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '14px 40px 14px 16px',
                        borderRadius: '14px',
                        border: `1.5px solid #e2e8f0`,
                        background: '#fff',
                        color: '#1e293b',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        cursor: 'pointer',
                        appearance: 'none',
                        outline: 'none',
                        transition: 'border-color 0.15s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}20`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    {units.map(u => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                </select>
                <ChevronRight size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%) rotate(90deg)', color: '#94a3b8', pointerEvents: 'none' }} />
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
        <div style={{
            borderRadius: '18px',
            background: `linear-gradient(135deg, ${accentColor}08 0%, ${accentColor}15 100%)`,
            border: `1.5px solid ${accentColor}30`,
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minHeight: '120px',
            justifyContent: 'center',
        }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accentColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Result
            </div>
            <div style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: isValid ? '#0f172a' : '#cbd5e1',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                fontFamily: "'DM Mono', 'Fira Mono', 'Consolas', monospace",
                wordBreak: 'break-all',
            }}>
                {isValid ? formatResult(result!) : '—'}
            </div>
            {isValid && (
                <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>
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
        <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                All conversions for {inputValue} {fromUnit.label}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                {category.units.map(unit => {
                    if (unit.value === fromKey) return null;
                    const result = convertUnits(inputValue, fromUnit, unit, category, rates, fromKey, unit.value);
                    if (result === null) return null;
                    return (
                        <div key={unit.value} style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: '#f8fafc',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>{unit.label}</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', fontFamily: "'DM Mono', monospace" }}>
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

export default function TotalConv() {
    const [activeCatKey, setActiveCatKey] = useState('length');
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

    useEffect(() => {
        setFromKey(category.units[0].value);
        setToKey((category.units[1] ?? category.units[0]).value);
        setShowAllUnits(false);
    }, [activeCatKey, category]);

    const handleSwap = () => { setFromKey(toKey); setToKey(fromKey); };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .unit-converter-conv, .unit-converter-conv * { box-sizing: border-box; }
        .unit-converter-conv .cat-scroll::-webkit-scrollbar { height: 4px; }
        .unit-converter-conv .cat-scroll::-webkit-scrollbar-track { background: transparent; }
        .unit-converter-conv .cat-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .unit-converter-conv .swap-btn:hover { transform: scale(1.08) rotate(180deg) !important; }
        .unit-converter-conv .swap-btn { transition: transform 0.3s ease !important; }
        .unit-converter-conv select option { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

            <div className="unit-converter-conv" style={{
                minHeight: '100vh',
                background: 'linear-gradient(160deg, #f0f9ff 0%, #fafafa 40%, #fff7ed 100%)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#1e293b',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(20px, 4vw, 48px) clamp(16px, 4vw, 32px)' }}>

                    {/* ── Header ── */}
                    <header style={{ marginBottom: '36px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: `linear-gradient(135deg, ${category.color}, ${category.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        <TrendingUp size={18} />
                                    </div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        Unit Converter
                                    </span>
                                </div>
                                <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#0f172a' }}>
                                    Convert anything,<br />
                                    <span style={{ color: category.color }}>instantly.</span>
                                </h1>
                            </div>
                            {activeCatKey === 'currency' && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                    <div style={{
                                        fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px',
                                        background: rateStatus === 'live' ? '#dcfce7' : rateStatus === 'loading' ? '#fef9c3' : '#fee2e2',
                                        color: rateStatus === 'live' ? '#166534' : rateStatus === 'loading' ? '#854d0e' : '#991b1b',
                                    }}>
                                        {rateStatus === 'live' ? `● Live · ${rateDate}` : rateStatus === 'loading' ? '● Fetching…' : '● Fallback rates'}
                                    </div>
                                    <button
                                        onClick={() => void fetchRates()}
                                        disabled={rateStatus === 'loading'}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                                            borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#fff',
                                            color: '#475569', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        <RefreshCw size={14} style={{ animation: rateStatus === 'loading' ? 'spin 1s linear infinite' : 'none' }} />
                                        Refresh
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* ── Category Tabs ── */}
                    <div className="cat-scroll" style={{ overflowX: 'auto', marginBottom: '28px', paddingBottom: '4px' }}>
                        <div style={{ display: 'flex', gap: '6px', width: 'max-content' }}>
                            {CATEGORIES.map(cat => (
                                <CategoryTab
                                    key={cat.key}
                                    category={cat}
                                    active={activeCatKey === cat.key}
                                    onClick={() => setActiveCatKey(cat.key)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Main Card ── */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '24px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(0,0,0,0.07)',
                        overflow: 'hidden',
                    }}>
                        {/* Top bar accent */}
                        <div style={{ height: '3px', background: `linear-gradient(90deg, ${category.color}, ${category.color}60)` }} />

                        <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
                            {/* ── Input Row ── */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                                    Value
                                </label>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    placeholder="Enter a number…"
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '16px',
                                        border: `1.5px solid #e2e8f0`,
                                        background: '#fafafa',
                                        color: '#0f172a',
                                        fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                        fontFamily: "'DM Mono', monospace",
                                        fontWeight: 500,
                                        outline: 'none',
                                        transition: 'all 0.15s',
                                    }}
                                    onFocus={e => { e.currentTarget.style.borderColor = category.color; e.currentTarget.style.boxShadow = `0 0 0 3px ${category.color}20`; e.currentTarget.style.background = '#fff'; }}
                                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#fafafa'; }}
                                />
                            </div>

                            {/* ── From / Swap / To ── */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <SelectField label="From" value={fromKey} units={category.units} onChange={setFromKey} accentColor={category.color} />

                                <button
                                    className="swap-btn"
                                    onClick={handleSwap}
                                    style={{
                                        width: 48, height: 48, borderRadius: '14px', flexShrink: 0, marginBottom: '2px',
                                        border: `1.5px solid ${category.color}40`,
                                        background: `${category.color}10`,
                                        color: category.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
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
                                <div style={{ marginTop: '20px' }}>
                                    <button
                                        onClick={() => setShowAllUnits(v => !v)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            fontSize: '0.82rem', fontWeight: 700, color: category.color,
                                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '4px 0',
                                        }}
                                    >
                                        <ChevronRight size={16} style={{ transform: showAllUnits ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                                        {showAllUnits ? 'Hide' : 'Show'} all {category.units.length - 1} conversions
                                    </button>

                                    {showAllUnits && (
                                        <div style={{ marginTop: '16px' }}>
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
                    <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        {[
                            { label: 'Categories', value: `${CATEGORIES.length}` },
                            { label: 'Units in this category', value: `${category.units.length}` },
                            { label: 'Total unit types', value: `${CATEGORIES.reduce((s, c) => s + c.units.length, 0)}+` },
                        ].map(item => (
                            <div key={item.label} style={{
                                padding: '16px 20px',
                                borderRadius: '16px',
                                background: '#fff',
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>{item.label}</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </>
    );
}
