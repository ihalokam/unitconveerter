import React from 'react';
import {
    Ruler, Weight, Thermometer, Zap, Clock, Globe2,
    Gauge, Wind, Database, Droplets, Square,
    Crosshair, Battery, Waves, Cpu
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SimpleUnit = { label: string; value: string; toBase: number };

export type Category = {
    key: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    aliases: string[];
    units: SimpleUnit[];
    convert?: (value: number, from: string, to: string) => number;
};

// ─── Unit Data ────────────────────────────────────────────────────────────────

export const FALLBACK_RATES: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.1, JPY: 156.4,
    CNY: 7.24, AUD: 1.53, CAD: 1.37, CHF: 0.91,
    SGD: 1.35, AED: 3.67, SAR: 3.75,
};

export const CATEGORIES: Category[] = [
    {
        key: 'length', label: 'Length', icon: React.createElement(Ruler, { size: 18 }), color: '#3b82f6',
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
        key: 'mass', label: 'Mass', icon: React.createElement(Weight, { size: 18 }), color: '#8b5cf6',
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
        key: 'temperature', label: 'Temperature', icon: React.createElement(Thermometer, { size: 18 }), color: '#ef4444',
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
        key: 'area', label: 'Area', icon: React.createElement(Square, { size: 18 }), color: '#10b981',
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
        key: 'volume', label: 'Volume', icon: React.createElement(Waves, { size: 18 }), color: '#06b6d4',
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
        key: 'speed', label: 'Speed', icon: React.createElement(Wind, { size: 18 }), color: '#f59e0b',
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
        key: 'time', label: 'Time', icon: React.createElement(Clock, { size: 18 }), color: '#6366f1',
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
        key: 'energy', label: 'Energy', icon: React.createElement(Zap, { size: 18 }), color: '#eab308',
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
        key: 'power', label: 'Power', icon: React.createElement(Battery, { size: 18 }), color: '#f97316',
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
        key: 'pressure', label: 'Pressure', icon: React.createElement(Gauge, { size: 18 }), color: '#84cc16',
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
        key: 'data', label: 'Data', icon: React.createElement(Database, { size: 18 }), color: '#ec4899',
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
        key: 'angle', label: 'Angle', icon: React.createElement(Crosshair, { size: 18 }), color: '#14b8a6',
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
        key: 'fuel', label: 'Fuel', icon: React.createElement(Droplets, { size: 18 }), color: '#0ea5e9',
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
        key: 'currency', label: 'Currency', icon: React.createElement(Globe2, { size: 18 }), color: '#22c55e',
        aliases: ['money', 'exchange-rate', 'forex', 'usd', 'eur'],
        units: Object.keys(FALLBACK_RATES).map(code => ({ label: code, value: code, toBase: 1 })),
    },
    {
        key: 'cpu', label: 'Frequency', icon: React.createElement(Cpu, { size: 18 }), color: '#a855f7',
        aliases: ['hertz', 'clock-speed'],
        units: [
            { label: 'Hertz (Hz)', value: 'hz', toBase: 1 },
            { label: 'Kilohertz (kHz)', value: 'khz', toBase: 1000 },
            { label: 'Megahertz (MHz)', value: 'mhz', toBase: 1000000 },
            { label: 'Gigahertz (GHz)', value: 'ghz', toBase: 1000000000 },
        ],
    },
];

export function convertUnits(value: number, from: SimpleUnit, to: SimpleUnit, category: Category, rates: Record<string, number>, fromKey: string, toKey: string): number | null {
    if (!Number.isFinite(value)) return null;
    if (category.key === 'currency') {
        const fRate = rates[fromKey], tRate = rates[toKey];
        if (!fRate || !tRate) return null;
        return (value / fRate) * tRate;
    }
    if (category.convert) return category.convert(value, fromKey, toKey);
    return (value * from.toBase) / to.toBase;
}

// ─── Slug helpers ─────────────────────────────────────────────────────────────

export function slugify(s: string | null | undefined): string {
    if (!s) return '';
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function resolveCategoryFromSlug(raw: string | null): string | null {
    if (!raw) return null;
    const slug = slugify(raw.replace(/-?converter$/i, ''));
    if (!slug) return null;

    for (const cat of CATEGORIES) {
        const candidates = [cat.key, slugify(cat.label), ...cat.aliases.map(slugify)];
        if (candidates.includes(slug)) return cat.key;
        const unitValues = cat.units.map(u => slugify(u.value));
        if (slug.includes('-to-') && slug.split('-to-').some(part => unitValues.includes(part))) {
            return cat.key;
        }
    }
    return null;
}

// ─── Unit-pair slug resolution (e.g. "cm-to-feet", "lbs-to-kg") ───────────────
// Search queries use natural words ("feet", "pounds"), not our internal unit
// codes ("ft", "lb") — this alias table bridges the two so /convert/[pair]
// can resolve real search phrasing to an actual from/to unit pair.

type UnitAlias = { category: string; unit: string };
const UNIT_ALIASES: Record<string, UnitAlias> = {};

function alias(category: string, unit: string, words: string[]) {
    for (const w of words) UNIT_ALIASES[slugify(w)] = { category, unit };
}

alias('length', 'mm', ['mm', 'millimeter', 'millimeters', 'millimetre', 'millimetres']);
alias('length', 'cm', ['cm', 'centimeter', 'centimeters', 'centimetre', 'centimetres']);
alias('length', 'm', ['m', 'meter', 'meters', 'metre', 'metres']);
alias('length', 'km', ['km', 'kilometer', 'kilometers', 'kilometre', 'kilometres']);
alias('length', 'in', ['in', 'inch', 'inches']);
alias('length', 'ft', ['ft', 'foot', 'feet']);
alias('length', 'yd', ['yd', 'yard', 'yards']);
alias('length', 'mi', ['mi', 'mile', 'miles']);
alias('length', 'nmi', ['nmi', 'nauticalmile', 'nauticalmiles']);

alias('mass', 'mg', ['mg', 'milligram', 'milligrams']);
alias('mass', 'g', ['g', 'gram', 'grams']);
alias('mass', 'kg', ['kg', 'kilogram', 'kilograms', 'kilo', 'kilos']);
alias('mass', 'tonne', ['tonne', 'tonnes', 'ton', 'tons']);
alias('mass', 'oz', ['oz', 'ounce', 'ounces']);
alias('mass', 'lb', ['lb', 'lbs', 'pound', 'pounds']);
alias('mass', 'stone', ['stone', 'stones']);

alias('temperature', 'c', ['c', 'celsius']);
alias('temperature', 'f', ['f', 'fahrenheit']);
alias('temperature', 'k', ['k', 'kelvin']);

alias('volume', 'ml', ['ml', 'milliliter', 'milliliters', 'millilitre', 'millilitres']);
alias('volume', 'l', ['l', 'liter', 'liters', 'litre', 'litres']);
alias('volume', 'gal-us', ['gal', 'gallon', 'gallons']);
alias('volume', 'fl-oz', ['floz', 'fluidounce', 'fluidounces']);

alias('speed', 'kmh', ['kmh', 'kmph', 'kilometersperhour']);
alias('speed', 'mph', ['mph', 'milesperhour']);

export type ResolvedPair = { categoryKey: string; fromKey: string; toKey: string };

export function resolvePairFromSlug(raw: string): ResolvedPair | null {
    const slug = slugify(raw);
    const parts = slug.split('-to-');
    if (parts.length !== 2) return null;
    const from = UNIT_ALIASES[parts[0]];
    const to = UNIT_ALIASES[parts[1]];
    if (!from || !to || from.category !== to.category) return null;
    return { categoryKey: from.category, fromKey: from.unit, toKey: to.unit };
}

export function unitDisplayName(categoryKey: string, unitValue: string): string {
    const category = CATEGORIES.find(c => c.key === categoryKey);
    const unit = category?.units.find(u => u.value === unitValue);
    if (!unit) return unitValue;
    return unit.label.replace(/\s*\(.*\)/, '');
}

// ─── Priority pairs ─────────────────────────────────────────────────────────
// Curated from Bing keyword research (KeywordStats CSV, Aug 2026). `volume`
// is the reported monthly impression count where available — reverse pairs
// not in the CSV are marked estimated. Add more rows here as new keyword
// data comes in; generateStaticParams below builds one page per row.

export type PriorityPair = {
    slug: string;          // matches the natural search phrasing, e.g. "lbs-to-kg"
    categoryKey: string;
    fromKey: string;
    toKey: string;
    volume: number;
    volumeSource: 'csv' | 'estimated';
};

export const PRIORITY_PAIRS: PriorityPair[] = [
    { slug: 'lbs-to-kg', categoryKey: 'mass', fromKey: 'lb', toKey: 'kg', volume: 254747, volumeSource: 'csv' },
    { slug: 'kg-to-lbs', categoryKey: 'mass', fromKey: 'kg', toKey: 'lb', volume: 20000, volumeSource: 'estimated' },
    { slug: 'cm-to-feet', categoryKey: 'length', fromKey: 'cm', toKey: 'ft', volume: 69864, volumeSource: 'csv' },
    { slug: 'feet-to-cm', categoryKey: 'length', fromKey: 'ft', toKey: 'cm', volume: 8000, volumeSource: 'estimated' },
    { slug: 'meters-to-cm', categoryKey: 'length', fromKey: 'm', toKey: 'cm', volume: 16691, volumeSource: 'csv' },
    { slug: 'cm-to-meters', categoryKey: 'length', fromKey: 'cm', toKey: 'm', volume: 3000, volumeSource: 'estimated' },
    { slug: 'inches-to-meters', categoryKey: 'length', fromKey: 'in', toKey: 'm', volume: 10973, volumeSource: 'csv' },
    { slug: 'meters-to-inches', categoryKey: 'length', fromKey: 'm', toKey: 'in', volume: 4000, volumeSource: 'estimated' },
    { slug: 'mm-to-cm', categoryKey: 'length', fromKey: 'mm', toKey: 'cm', volume: 2463, volumeSource: 'csv' },
    { slug: 'celsius-to-fahrenheit', categoryKey: 'temperature', fromKey: 'c', toKey: 'f', volume: 5000, volumeSource: 'estimated' },
    { slug: 'fahrenheit-to-celsius', categoryKey: 'temperature', fromKey: 'f', toKey: 'c', volume: 5000, volumeSource: 'estimated' },
];

// Given a resolved pair, return the canonical slug to point search engines
// at — so "meter-to-cm", "metres-to-cm" etc. all canonicalize to one URL
// instead of splitting ranking signal across near-duplicate pages.
export function canonicalPairSlug(pair: ResolvedPair): string {
    const match = PRIORITY_PAIRS.find(
        p => p.categoryKey === pair.categoryKey && p.fromKey === pair.fromKey && p.toKey === pair.toKey
    );
    return match ? match.slug : `${pair.fromKey}-to-${pair.toKey}`;
}