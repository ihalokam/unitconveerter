"use client";

/**
 * VolumeConverter.tsx — Self-contained, single-file volume unit converter
 * Same design system as LengthConverter & PressureConverter (IBM Plex Mono, zinc/amber palette).
 *
 * Dependencies: papaparse, xlsx
 * Drop into any Next.js app with Tailwind.
 */

import React, { useCallback, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & PURE UTILS
// ─────────────────────────────────────────────────────────────────────────────

type VolumeUnit =
    | "ml" | "cl" | "dl" | "l" | "m3" | "cm3" | "mm3" | "km3"
    | "tsp" | "tbsp" | "floz_us" | "cup_us" | "pt_us" | "qt_us" | "gal_us"
    | "floz_uk" | "pt_uk" | "qt_uk" | "gal_uk"
    | "in3" | "ft3" | "yd3";

type RoundMode = "exact" | "integer" | "decimal";
type Step = "upload" | "header" | "columns" | "output" | "done";

const VOLUME_UNITS: { value: VolumeUnit; label: string; symbol: string; category: string }[] = [
    // Metric
    { value: "mm3", label: "Cubic millimeter", symbol: "mm³", category: "Metric" },
    { value: "cm3", label: "Cubic centimeter", symbol: "cm³", category: "Metric" },
    { value: "ml", label: "Milliliter", symbol: "mL", category: "Metric" },
    { value: "cl", label: "Centiliter", symbol: "cL", category: "Metric" },
    { value: "dl", label: "Deciliter", symbol: "dL", category: "Metric" },
    { value: "l", label: "Liter", symbol: "L", category: "Metric" },
    { value: "m3", label: "Cubic meter", symbol: "m³", category: "Metric" },
    { value: "km3", label: "Cubic kilometer", symbol: "km³", category: "Metric" },
    // US Imperial
    { value: "tsp", label: "Teaspoon (US)", symbol: "tsp", category: "US Imperial" },
    { value: "tbsp", label: "Tablespoon (US)", symbol: "tbsp", category: "US Imperial" },
    { value: "floz_us", label: "Fluid ounce (US)", symbol: "fl oz", category: "US Imperial" },
    { value: "cup_us", label: "Cup (US)", symbol: "cup", category: "US Imperial" },
    { value: "pt_us", label: "Pint (US)", symbol: "pt", category: "US Imperial" },
    { value: "qt_us", label: "Quart (US)", symbol: "qt", category: "US Imperial" },
    { value: "gal_us", label: "Gallon (US)", symbol: "gal", category: "US Imperial" },
    // UK Imperial
    { value: "floz_uk", label: "Fluid ounce (UK)", symbol: "fl oz UK", category: "UK Imperial" },
    { value: "pt_uk", label: "Pint (UK)", symbol: "pt UK", category: "UK Imperial" },
    { value: "qt_uk", label: "Quart (UK)", symbol: "qt UK", category: "UK Imperial" },
    { value: "gal_uk", label: "Gallon (UK)", symbol: "gal UK", category: "UK Imperial" },
    // Cubic
    { value: "in3", label: "Cubic inch", symbol: "in³", category: "Cubic (Imperial)" },
    { value: "ft3", label: "Cubic foot", symbol: "ft³", category: "Cubic (Imperial)" },
    { value: "yd3", label: "Cubic yard", symbol: "yd³", category: "Cubic (Imperial)" },
];

/** Conversion factors to Liters (base unit) */
const TO_LITER: Record<VolumeUnit, number> = {
    mm3: 1e-6,
    cm3: 0.001,
    ml: 0.001,
    cl: 0.01,
    dl: 0.1,
    l: 1,
    m3: 1000,
    km3: 1e12,
    tsp: 0.00492892,
    tbsp: 0.0147868,
    floz_us: 0.0295735,
    cup_us: 0.236588,
    pt_us: 0.473176,
    qt_us: 0.946353,
    gal_us: 3.78541,
    floz_uk: 0.0284131,
    pt_uk: 0.568261,
    qt_uk: 1.13652,
    gal_uk: 4.54609,
    in3: 0.0163871,
    ft3: 28.3168,
    yd3: 764.555,
};

function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
    if (from === to) return value;
    return (value * TO_LITER[from]) / TO_LITER[to];
}

function applyRounding(value: number, mode: RoundMode, decimals: number): number {
    if (mode === "integer") return Math.round(value);
    if (mode === "decimal") return parseFloat(value.toFixed(decimals));
    return value;
}

function parseSafeNumber(raw: unknown): number | null {
    if (raw === null || raw === undefined) return null;
    const cleaned = String(raw).trim().replace(/,/g, "");
    if (cleaned === "") return null;
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
}

function safeConvert(
    raw: unknown,
    from: VolumeUnit,
    to: VolumeUnit,
    mode: RoundMode,
    decimals: number
): unknown {
    const val = parseSafeNumber(raw);
    if (val === null) return raw;
    if (from === to) return raw;
    return applyRounding(convertVolume(val, from, to), mode, decimals);
}

function deduplicateHeaders(raw: unknown[]): string[] {
    const seen: Record<string, number> = {};
    return raw.map((col, i) => {
        let name =
            col != null && String(col).trim() !== "" ? String(col).trim() : `Column_${i + 1}`;
        if (seen[name] !== undefined) { seen[name]++; name = `${name}_${seen[name]}`; }
        else seen[name] = 1;
        return name;
    });
}

function formatNumber(n: number): string {
    if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-6 && n !== 0)) {
        return n.toExponential(4);
    }
    return n.toLocaleString(undefined, { maximumFractionDigits: 8 });
}

type RawSheet = (string | number | null | undefined)[][];

function parseFile(file: File): Promise<RawSheet> {
    return new Promise((resolve, reject) => {
        if (file.name.toLowerCase().endsWith(".csv")) {
            Papa.parse(file, {
                skipEmptyLines: true,
                complete: (result: Papa.ParseResult<unknown[]>) => {
                    if (!result.data?.length) return reject(new Error("CSV is empty."));
                    resolve(result.data as RawSheet);
                },
                error: (err: Error) => reject(new Error(`CSV error: ${err.message}`)),
            });
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const wb = XLSX.read(e.target?.result, { type: "binary" });
                    const sheet = wb.Sheets[wb.SheetNames[0]];
                    const json = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: null });
                    if (!json.length) return reject(new Error("XLSX is empty."));
                    resolve(json as RawSheet);
                } catch { reject(new Error("Failed to parse XLSX.")); }
            };
            reader.onerror = () => reject(new Error("Could not read file."));
            reader.readAsBinaryString(file);
        }
    });
}

function exportXlsx(rows: Record<string, unknown>[], filename: string) {
    const sheet = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Converted");
    XLSX.writeFile(wb, filename);
}

const uid = () => Math.random().toString(36).slice(2, 8);
const symOf = (v: string) => VOLUME_UNITS.find((u) => u.value === v)?.symbol ?? v;

interface ConversionRule {
    id: string;
    column: string;
    from: VolumeUnit;
    to: VolumeUnit;
    newColumnSuffix: boolean;
}

interface OutputOptions {
    roundMode: RoundMode;
    decimals: number;
    filenamePrefix: string;
}

interface ConversionStats {
    converted: number;
    skipped: number;
    total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const STEPS: { id: Step; short: string }[] = [
    { id: "upload", short: "Upload" },
    { id: "header", short: "Header" },
    { id: "columns", short: "Columns" },
    { id: "output", short: "Output" },
    { id: "done", short: "Done" },
];

function StepIndicator({ current, completed }: { current: Step; completed: Step[] }) {
    const currentIndex = STEPS.findIndex((s) => s.id === current);
    return (
        <nav className="mb-10">
            <ol className="flex items-center">
                {STEPS.map((step, idx) => {
                    const isPast = idx < currentIndex;
                    const isCurrent = step.id === current;
                    return (
                        <li key={step.id} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${isCurrent
                                        ? "bg-amber-400 border-amber-400 text-zinc-900 shadow-lg shadow-amber-400/30"
                                        : isPast || completed.includes(step.id)
                                            ? "bg-zinc-800 border-zinc-600 text-zinc-300"
                                            : "bg-transparent border-zinc-700 text-zinc-600"
                                    }`}>
                                    {isPast || (completed.includes(step.id) && !isCurrent) ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : idx + 1}
                                </div>
                                <span className={`text-xs font-medium hidden sm:block ${isCurrent ? "text-amber-400" : isPast ? "text-zinc-400" : "text-zinc-600"
                                    }`}>{step.short}</span>
                            </div>
                            {idx < STEPS.length - 1 && (
                                <div className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${idx < currentIndex ? "bg-zinc-600" : "bg-zinc-800"
                                    }`} />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

function UploadStep({ onSuccess }: { onSuccess: (rows: RawSheet, filename: string) => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handle = useCallback(async (file: File) => {
        setError(null);
        if (!file.name.match(/\.(csv|xlsx)$/i)) { setError("Only .csv and .xlsx files are supported."); return; }
        if (file.size > 10 * 1024 * 1024) { setError("File exceeds the 10 MB size limit."); return; }
        if (file.size === 0) { setError("File is empty."); return; }
        setLoading(true);
        try {
            const rows = await parseFile(file);
            onSuccess(rows, file.name);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Unknown parse error.");
        } finally { setLoading(false); }
    }, [onSuccess]);

    return (
        <section className="flex flex-col items-center gap-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-zinc-100 mb-1">Upload your file</h2>
                <p className="text-sm text-zinc-500">Supported: CSV, XLSX · Max 10 MB · Processed locally</p>
            </div>

            <label
                htmlFor="file-input"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
                className={`relative w-full max-w-lg cursor-pointer rounded-xl border-2 border-dashed px-8 py-16
          flex flex-col items-center gap-4 transition-all duration-200 select-none
          ${isDragging ? "border-amber-400 bg-amber-400/5 scale-[1.01]"
                        : "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800/60"}
          ${loading ? "pointer-events-none opacity-60" : ""}`}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? "bg-amber-400/20" : "bg-zinc-800"}`}>
                    {loading ? (
                        <svg className="w-8 h-8 text-amber-400 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg className={`w-8 h-8 transition-colors ${isDragging ? "text-amber-400" : "text-zinc-500"}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                    )}
                </div>
                <div className="text-center">
                    <p className={`text-sm font-medium transition-colors ${isDragging ? "text-amber-400" : "text-zinc-300"}`}>
                        {loading ? "Parsing file…" : isDragging ? "Drop to upload" : "Drag & drop file here"}
                    </p>
                    {!loading && (
                        <p className="text-xs text-zinc-600 mt-1">
                            or <span className="text-amber-400 underline underline-offset-2">browse</span> to select
                        </p>
                    )}
                </div>
                <input id="file-input" type="file" accept=".csv,.xlsx" className="sr-only"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); e.target.value = ""; }}
                    disabled={loading} />
            </label>

            {error && (
                <div className="flex items-start gap-3 w-full max-w-lg rounded-lg bg-red-900/30 border border-red-700/50 px-4 py-3 text-sm text-red-300">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">How it works</p>
                <ol className="flex flex-col gap-2">
                    {[
                        "Upload a CSV or Excel file with volume/capacity data",
                        "Pick the row that contains your column names",
                        "Map each column and choose its current and target units",
                        "Set rounding precision, then download the converted file",
                    ].map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-500">
                            <span className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                            {s}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function HeaderStep({ rawRows, filename, onConfirm, onBack }: {
    rawRows: RawSheet; filename: string;
    onConfirm: (idx: number) => void; onBack: () => void;
}) {
    const [selected, setSelected] = useState(0);
    const PREVIEW = 8;
    const maxCols = Math.max(...rawRows.slice(0, PREVIEW).map((r) => r.length));

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold text-zinc-100 mb-1">Select header row</h2>
                <p className="text-sm text-zinc-500">
                    <span className="text-zinc-400 font-medium">{filename}</span> · {rawRows.length} rows detected
                </p>
            </div>

            <div className="flex items-center gap-3">
                <label className="text-sm text-zinc-400 shrink-0">Header at row:</label>
                <div className="flex items-center gap-1">
                    <button onClick={() => setSelected(Math.max(0, selected - 1))}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors">−</button>
                    <input type="number" min={1} max={rawRows.length} value={selected + 1}
                        onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= rawRows.length) setSelected(v - 1); }}
                        className="w-16 text-center bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:border-amber-400" />
                    <button onClick={() => setSelected(Math.min(rawRows.length - 1, selected + 1))}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors">+</button>
                </div>
                <span className="text-xs text-zinc-600">of {rawRows.length}</span>
            </div>

            <div className="overflow-auto rounded-xl border border-zinc-800 max-h-72">
                <table className="w-full text-xs min-w-max">
                    <thead>
                        <tr className="bg-zinc-900 border-b border-zinc-800">
                            <th className="px-3 py-2 text-left text-zinc-600 font-mono w-10">#</th>
                            {Array.from({ length: maxCols }, (_, i) => (
                                <th key={i} className="px-3 py-2 text-left text-zinc-600 font-mono">col {i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rawRows.slice(0, PREVIEW).map((row, rIdx) => (
                            <tr key={rIdx} onClick={() => setSelected(rIdx)}
                                className={`cursor-pointer transition-colors border-b ${rIdx === selected
                                        ? "bg-amber-400/10 text-amber-300 font-semibold border-amber-400/30"
                                        : "text-zinc-400 border-zinc-800 hover:bg-zinc-800/40"
                                    }`}>
                                <td className="px-3 py-1.5 text-zinc-600 font-mono">
                                    <span className={`inline-flex items-center gap-1 ${rIdx === selected ? "text-amber-400" : ""}`}>
                                        {rIdx === selected && (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {rIdx + 1}
                                    </span>
                                </td>
                                {Array.from({ length: maxCols }, (_, cIdx) => (
                                    <td key={cIdx} className="px-3 py-1.5 max-w-[160px] truncate">{String(row[cIdx] ?? "")}</td>
                                ))}
                            </tr>
                        ))}
                        {rawRows.length > PREVIEW && (
                            <tr>
                                <td colSpan={maxCols + 1} className="px-3 py-2 text-center text-zinc-700 text-xs italic">
                                    … {rawRows.length - PREVIEW} more rows
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {rawRows[selected] && (
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3">
                    <p className="text-xs text-zinc-500 mb-2">Column names from row {selected + 1}:</p>
                    <div className="flex flex-wrap gap-2">
                        {rawRows[selected].map((cell, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                {String(cell ?? "(empty)")}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3 pt-2">
                <button onClick={onBack} className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">← Back</button>
                <button onClick={() => onConfirm(selected)}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20">
                    Use Row {selected + 1} as Header →
                </button>
            </div>
        </section>
    );
}

function UnitSelect({ value, onChange, label }: { value: VolumeUnit; onChange: (v: VolumeUnit) => void; label: string }) {
    const categories = [...new Set(VOLUME_UNITS.map((u) => u.category))];
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500 font-medium">{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value as VolumeUnit)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200
          focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors">
                {categories.map((cat) => (
                    <optgroup key={cat} label={cat}>
                        {VOLUME_UNITS.filter((u) => u.category === cat).map((u) => (
                            <option key={u.value} value={u.value}>{u.symbol} — {u.label}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}

function ColumnsStep({ columns, sampleRows, initialRules, onConfirm, onBack }: {
    columns: string[];
    sampleRows: Record<string, unknown>[];
    initialRules: ConversionRule[];
    onConfirm: (rules: ConversionRule[]) => void;
    onBack: () => void;
}) {
    const [rules, setRules] = useState<ConversionRule[]>(initialRules);
    const [error, setError] = useState<string | null>(null);

    const addRule = () => {
        const unused = columns.find((c) => !rules.some((r) => r.column === c));
        setRules((p) => [...p, { id: uid(), column: unused ?? columns[0] ?? "", from: "l", to: "gal_us", newColumnSuffix: false }]);
        setError(null);
    };

    const remove = (id: string) => setRules((p) => p.filter((r) => r.id !== id));
    const update = <K extends keyof ConversionRule>(id: string, key: K, val: ConversionRule[K]) =>
        setRules((p) => p.map((r) => (r.id === id ? { ...r, [key]: val } : r)));

    const validate = () => {
        if (!rules.length) { setError("Add at least one conversion rule."); return false; }
        if (rules.some((r) => !r.column)) { setError("All rules must have a column selected."); return false; }
        const overwriteCols = rules.filter((r) => !r.newColumnSuffix).map((r) => r.column);
        if (overwriteCols.length !== new Set(overwriteCols).size) {
            setError("Each column can only appear once (or enable 'New column' to allow duplicates)."); return false;
        }
        return true;
    };

    const likelyNumeric = (col: string) =>
        sampleRows.slice(0, 5).filter((r) => parseSafeNumber(r[col]) !== null).length >= 3;

    const usedColumns = new Set(rules.filter((r) => !r.newColumnSuffix).map((r) => r.column));
    const suggestions = columns.filter(likelyNumeric).filter((c) => !rules.some((r) => r.column === c));

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold text-zinc-100 mb-1">Map columns to units</h2>
                <p className="text-sm text-zinc-500">Select which columns hold volume values and specify their current and target units.</p>
            </div>

            {suggestions.length > 0 && (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                    <p className="text-xs text-zinc-500 mb-2 font-medium">◈ Likely numeric columns — quick add:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((col) => (
                            <button key={col}
                                onClick={() => setRules((p) => [...p, { id: uid(), column: col, from: "l", to: "gal_us", newColumnSuffix: false }])}
                                className="px-3 py-1 rounded-full text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-amber-400 hover:text-amber-400 transition-colors">
                                + {col}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {!rules.length && (
                    <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-10 text-center">
                        <p className="text-sm text-zinc-600">No rules yet. Add one below.</p>
                    </div>
                )}

                {rules.map((rule, idx) => (
                    <div key={rule.id} className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Rule {idx + 1}</span>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                                    <div onClick={() => update(rule.id, "newColumnSuffix", !rule.newColumnSuffix)}
                                        className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${rule.newColumnSuffix ? "bg-amber-400" : "bg-zinc-700"}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${rule.newColumnSuffix ? "translate-x-4" : "translate-x-0.5"}`} />
                                    </div>
                                    New column
                                </label>
                                <button onClick={() => remove(rule.id)}
                                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-zinc-500 font-medium">Column</label>
                                <select value={rule.column} onChange={(e) => update(rule.id, "column", e.target.value)}
                                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200
                    focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors">
                                    {columns.map((col) => (
                                        <option key={col} value={col} disabled={usedColumns.has(col) && col !== rule.column}>
                                            {col}{likelyNumeric(col) ? " ◈" : ""}{usedColumns.has(col) && col !== rule.column ? " (used)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <UnitSelect label="From unit" value={rule.from} onChange={(v) => update(rule.id, "from", v)} />
                            <div className="flex items-end gap-3">
                                <div className="mb-2 text-zinc-600 shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <UnitSelect label="To unit" value={rule.to} onChange={(v) => update(rule.id, "to", v)} />
                                </div>
                            </div>
                        </div>

                        {rule.column && sampleRows[0] && sampleRows[0][rule.column] != null && (
                            <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-500 flex-wrap">
                                <span>Sample:</span>
                                {sampleRows.slice(0, 3).map((r, i) => {
                                    const raw = r[rule.column];
                                    const result = safeConvert(raw, rule.from, rule.to, "decimal", 4);
                                    return (
                                        <span key={i} className="font-mono">
                                            <span className="text-zinc-400">{String(raw)} {symOf(rule.from)}</span>
                                            <span className="text-zinc-700"> → </span>
                                            <span className="text-amber-400">{String(result)} {symOf(rule.to)}</span>
                                            {i < 2 && <span className="text-zinc-700">,</span>}
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {rule.from === rule.to && (
                            <p className="mt-2 text-xs text-amber-500">⚠ Same from/to unit — no conversion will occur.</p>
                        )}
                        {rule.newColumnSuffix && (
                            <p className="mt-2 text-xs text-zinc-500">
                                A new column <span className="text-zinc-300 font-mono">{rule.column}_{symOf(rule.to).replace(/[³ ]/g, "")}</span> will be appended.
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={addRule} disabled={rules.length >= columns.length}
                className="flex items-center gap-2 self-start px-4 py-2 rounded-lg text-sm font-medium border border-zinc-700 text-zinc-400
          hover:border-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add conversion rule
            </button>

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {error}
                </p>
            )}

            <div className="flex gap-3 pt-2">
                <button onClick={onBack} className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">← Back</button>
                <button onClick={() => { setError(null); if (validate()) onConfirm(rules); }}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20">
                    Set Output Options →
                </button>
            </div>
        </section>
    );
}

const ROUND_OPTIONS: { value: RoundMode; label: string; desc: string }[] = [
    { value: "exact", label: "Exact", desc: "Full floating-point precision" },
    { value: "integer", label: "Integer", desc: "Round to nearest whole number" },
    { value: "decimal", label: "Decimal places", desc: "Round to N decimal places" },
];

function OutputStep({ rows, rules, initialOptions, onComplete, onBack }: {
    rows: Record<string, unknown>[];
    rules: ConversionRule[];
    initialOptions: OutputOptions;
    onComplete: (opts: OutputOptions, stats: ConversionStats) => void;
    onBack: () => void;
}) {
    const [roundMode, setRoundMode] = useState<RoundMode>(initialOptions.roundMode);
    const [decimals, setDecimals] = useState(initialOptions.decimals);
    const [prefix, setPrefix] = useState(initialOptions.filenamePrefix);
    const [running, setRunning] = useState(false);

    const handleConvert = () => {
        setRunning(true);
        setTimeout(() => {
            let converted = 0, skipped = 0;
            const newRows = rows.map((row) => {
                const updated = { ...row };
                rules.forEach((rule) => {
                    const raw = row[rule.column];
                    const result = safeConvert(raw, rule.from, rule.to, roundMode, decimals);
                    const targetKey = rule.newColumnSuffix ? `${rule.column}_${symOf(rule.to).replace(/[³ ]/g, "")}` : rule.column;
                    if (result !== raw) converted++;
                    else if (parseSafeNumber(raw) === null && raw != null && String(raw).trim() !== "") skipped++;
                    updated[targetKey] = result;
                });
                return updated;
            });
            const filename = `${prefix.trim() || "volume_converted"}_${Date.now()}.xlsx`;
            exportXlsx(newRows, filename);
            onComplete({ roundMode, decimals, filenamePrefix: prefix }, { converted, skipped, total: rows.length * rules.length });
            setRunning(false);
        }, 50);
    };

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold text-zinc-100 mb-1">Output options</h2>
                <p className="text-sm text-zinc-500">Set rounding and file naming, then export.</p>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-zinc-300">Rounding</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {ROUND_OPTIONS.map((opt) => (
                        <button key={opt.value} onClick={() => setRoundMode(opt.value)}
                            className={`text-left rounded-xl border px-4 py-3 transition-all ${roundMode === opt.value
                                    ? "border-amber-400 bg-amber-400/5 ring-1 ring-amber-400/20"
                                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                                }`}>
                            <p className={`text-sm font-semibold mb-0.5 ${roundMode === opt.value ? "text-amber-400" : "text-zinc-200"}`}>{opt.label}</p>
                            <p className="text-xs text-zinc-500 leading-snug">{opt.desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {roundMode === "decimal" && (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-zinc-400 shrink-0">Decimal places:</label>
                    <input type="range" min={0} max={10} value={decimals}
                        onChange={(e) => setDecimals(parseInt(e.target.value, 10))} className="flex-1 accent-amber-400" />
                    <span className="w-8 text-center font-mono text-sm text-amber-400 font-bold">{decimals}</span>
                </div>
            )}

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 font-semibold">Live preview (value = 1)</p>
                <div className="flex flex-col gap-2">
                    {rules.map((rule) => {
                        const result = safeConvert(1, rule.from, rule.to, roundMode, decimals);
                        const display = typeof result === "number" ? formatNumber(result) : String(result);
                        return (
                            <div key={rule.id} className="flex items-center gap-2 text-sm flex-wrap">
                                <span className="font-mono text-zinc-300">1 {symOf(rule.from)}</span>
                                <span className="text-zinc-600">=</span>
                                <span className="font-mono text-amber-400 font-semibold">{display} {symOf(rule.to)}</span>
                                <span className="text-zinc-600 text-xs">({rule.column}{rule.newColumnSuffix ? " → new col" : ""})</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">Output filename prefix</label>
                <div className="flex items-center gap-2">
                    <input type="text" value={prefix} placeholder="volume_converted"
                        onChange={(e) => setPrefix(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200
              focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 placeholder-zinc-600 transition-colors" />
                    <span className="text-sm text-zinc-600 shrink-0">_{"<timestamp>"}.xlsx</span>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <p className="text-zinc-400 font-medium text-sm mb-2">Conversion summary</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                        { n: rows.length.toLocaleString(), label: "Data rows" },
                        { n: String(rules.length), label: "Column rules" },
                        { n: (rows.length * rules.length).toLocaleString(), label: "Cells to convert" },
                    ].map(({ n, label }) => (
                        <div key={label}>
                            <p className="text-2xl font-bold text-zinc-200">{n}</p>
                            <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button onClick={onBack} disabled={running}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-40">
                    ← Back
                </button>
                <button onClick={handleConvert} disabled={running}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 disabled:opacity-60">
                    {running ? (
                        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>Converting…</>
                    ) : (
                        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>Convert & Download</>
                    )}
                </button>
            </div>
        </section>
    );
}

function DoneStep({ stats, onReset }: { stats: ConversionStats; onReset: () => void }) {
    const skippedPct = stats.total > 0 ? ((stats.skipped / stats.total) * 100).toFixed(1) : "0";
    return (
        <section className="flex flex-col items-center gap-8 py-4">
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/25 flex items-center justify-center">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-100 mb-1">Download started!</h2>
                <p className="text-sm text-zinc-500">Your converted file should be in your downloads folder.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                {[
                    { value: stats.converted.toLocaleString(), label: "Cells converted", color: "text-emerald-400" },
                    { value: stats.skipped.toLocaleString(), label: "Cells skipped", color: "text-amber-400" },
                    { value: `${skippedPct}%`, label: "Skip rate", color: "text-zinc-300" },
                ].map(({ value, label, color }) => (
                    <div key={label} className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-4 text-center">
                        <p className={`text-2xl font-bold ${color}`}>{value}</p>
                        <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>
            {stats.skipped > 0 && (
                <div className="flex items-start gap-3 w-full max-w-sm rounded-lg bg-amber-900/20 border border-amber-700/30 px-4 py-3 text-sm text-amber-300">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <span>{stats.skipped} cell{stats.skipped !== 1 ? "s" : ""} with non-numeric values were preserved as-is.</span>
                </div>
            )}
            <button onClick={onReset}
                className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20">
                Convert another file
            </button>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ORCHESTRATOR
// ─────────────────────────────────────────────────────────────────────────────
interface AppState {
    step: Step;
    completed: Step[];
    rawRows: RawSheet;
    filename: string;
    headerRowIndex: number;
    columns: string[];
    rows: Record<string, unknown>[];
    sampleRows: Record<string, unknown>[];
    rules: ConversionRule[];
    outputOptions: OutputOptions;
    stats: ConversionStats | null;
}

const INITIAL: AppState = {
    step: "upload", completed: [],
    rawRows: [], filename: "", headerRowIndex: 0,
    columns: [], rows: [], sampleRows: [],
    rules: [],
    outputOptions: { roundMode: "decimal", decimals: 4, filenamePrefix: "volume_converted" },
    stats: null,
};

function mark(prev: Step[], s: Step): Step[] {
    return prev.includes(s) ? prev : [...prev, s];
}

export default function VolumeConverter() {
    const [state, setState] = useState<AppState>(INITIAL);
    const patch = useCallback((p: Partial<AppState>) => setState((s) => ({ ...s, ...p })), []);

    const onUploadSuccess = useCallback((rawRows: RawSheet, filename: string) => {
        patch({ rawRows, filename, step: "header", completed: mark([], "upload") });
    }, [patch]);

    const onHeaderConfirm = useCallback((headerRowIndex: number) => {
        const columns = deduplicateHeaders(state.rawRows[headerRowIndex] ?? []);
        const allRows: Record<string, unknown>[] = state.rawRows.slice(headerRowIndex + 1).map((row) => {
            const obj: Record<string, unknown> = {};
            columns.forEach((col, i) => { obj[col] = row[i] ?? null; });
            return obj;
        });
        patch({ headerRowIndex, columns, rows: allRows, sampleRows: allRows.slice(0, 5), step: "columns", completed: mark(state.completed, "header") });
    }, [state.rawRows, state.completed, patch]);

    const onColumnsConfirm = useCallback((rules: ConversionRule[]) => {
        patch({ rules, step: "output", completed: mark(state.completed, "columns") });
    }, [state.completed, patch]);

    const onOutputComplete = useCallback((outputOptions: OutputOptions, stats: ConversionStats) => {
        patch({ outputOptions, stats, step: "done", completed: mark(state.completed, "output") });
    }, [state.completed, patch]);

    const onReset = useCallback(() => setState(INITIAL), []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

            <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-amber-400 flex items-center justify-center">
                            <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0 4.142-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12c0-1.84.664-3.525 1.757-4.836M12 4.5v3m0 0a7.5 7.5 0 017.5 7.5M12 7.5A7.5 7.5 0 014.5 15" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold tracking-tight text-zinc-100">VolumeConvert</span>
                        <span className="hidden sm:inline text-xs text-zinc-700 border border-zinc-800 rounded px-1.5 py-0.5">INDUSTRIAL</span>
                    </div>
                    {state.step !== "upload" && state.step !== "done" && (
                        <button onClick={onReset} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Start over</button>
                    )}
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-6 py-10">
                {state.step !== "done" && <StepIndicator current={state.step} completed={state.completed} />}
                <div className="min-h-[400px]">
                    {state.step === "upload" && <UploadStep onSuccess={onUploadSuccess} />}
                    {state.step === "header" && <HeaderStep rawRows={state.rawRows} filename={state.filename} onConfirm={onHeaderConfirm} onBack={() => patch({ step: "upload" })} />}
                    {state.step === "columns" && <ColumnsStep columns={state.columns} sampleRows={state.sampleRows} initialRules={state.rules} onConfirm={onColumnsConfirm} onBack={() => patch({ step: "header" })} />}
                    {state.step === "output" && <OutputStep rows={state.rows} rules={state.rules} initialOptions={state.outputOptions} onComplete={onOutputComplete} onBack={() => patch({ step: "columns" })} />}
                    {state.step === "done" && state.stats && <DoneStep stats={state.stats} onReset={onReset} />}
                </div>
            </main>

            <footer className="border-t border-zinc-900 mt-16">
                <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-zinc-700">
                    <span>VolumeConvert · 22 units · CSV &amp; XLSX</span>
                    <span>Processed locally · No data sent</span>
                </div>
            </footer>
        </div>
    );
}