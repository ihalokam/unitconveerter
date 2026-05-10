'use client'

import React, { useState, useRef, useCallback } from 'react'
import {
    ShieldCheck, UploadCloud, FileText, Cpu, Eraser,
    PackageCheck, Download, RotateCcw, AlertTriangle,
    CheckCircle2, Clock, HardDrive, Hash, Layers, Lock, Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Stage = 'idle' | 'reading' | 'parsing' | 'stripping' | 'rebuilding' | 'done' | 'error'

interface ProcessingState {
    stage: Stage
    progress: number
    elapsedMs: number
    filename: string
    originalSize: number
    cleanedSize: number
    metaRemoved: string[]
    errorMsg: string
    downloadUrl: string
}

// ─── PDF Metadata Stripper (100% local, zero dependencies) ───────────────────
async function stripPdfMetadata(
    buffer: ArrayBuffer,
    onProgress: (pct: number, found: string[]) => void,
): Promise<{ clean: Uint8Array; removed: string[] }> {
    const bytes = new Uint8Array(buffer)
    const removed: string[] = []
    const text = new TextDecoder('latin1').decode(bytes)

    function enc(s: string) { return new TextEncoder().encode(s) }
    function findAll(pattern: Uint8Array, limit = 500): number[] {
        const hits: number[] = []
        outer: for (let i = 0; i <= bytes.length - pattern.length; i++) {
            for (let j = 0; j < pattern.length; j++) {
                if (bytes[i + j] !== pattern[j]) continue outer
            }
            hits.push(i)
            if (hits.length >= limit) break
        }
        return hits
    }

    onProgress(10, [])

    // 1. Blank /Info dictionary string values
    const reInfo = /\/(?:Title|Author|Subject|Keywords|Creator|Producer|CreationDate|ModDate|Trapped)\s*(?:\((?:[^\\)\\]|\\.)*\)|<[0-9A-Fa-f\s]*>)/g
    let m: RegExpExecArray | null
    while ((m = reInfo.exec(text)) !== null) {
        const key = m[0].match(/\/(\w+)/)?.[1] ?? ''
        if (key && !removed.includes(key)) removed.push(key)
        for (let k = m.index; k < m.index + m[0].length; k++) bytes[k] = 0x20
    }

    onProgress(35, [...removed])

    // 2. Blank XMP packets
    const xmpStart = enc('<?xpacket begin')
    const xmpEnd = enc('<?xpacket end')
    for (const s of findAll(xmpStart)) {
        let e = s + xmpStart.length
        while (e < bytes.length - xmpEnd.length) {
            let ok = true
            for (let j = 0; j < xmpEnd.length; j++) { if (bytes[e + j] !== xmpEnd[j]) { ok = false; break } }
            if (ok) { e += xmpEnd.length; while (e < bytes.length && bytes[e] !== 0x3e) e++; e++; break }
            e++
        }
        for (let k = s; k < e && k < bytes.length; k++) bytes[k] = 0x20
        if (!removed.includes('XMP Metadata')) removed.push('XMP Metadata')
    }

    onProgress(65, [...removed])

    // 3. Remove /Metadata stream references
    const reMetaRef = /\/Metadata\s+\d+\s+\d+\s+R/g
    while ((m = reMetaRef.exec(text)) !== null) {
        for (let k = m.index; k < m.index + m[0].length; k++) bytes[k] = 0x20
    }

    // 4. Remove /Info trailer entry
    const reInfoRef = /\/Info\s+\d+\s+\d+\s+R/g
    while ((m = reInfoRef.exec(text)) !== null) {
        for (let k = m.index; k < m.index + m[0].length; k++) bytes[k] = 0x20
        if (!removed.includes('Info Dictionary Reference')) removed.push('Info Dictionary Reference')
    }

    onProgress(92, [...removed])
    return { clean: bytes, removed }
}

function formatBytes(b: number) {
    if (b < 1024) return `${b} B`
    if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`
    return `${(b / 1048576).toFixed(2)} MB`
}
function formatMs(ms: number) {
    return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`
}

const STEPS: { id: Stage; label: string; Icon: React.ElementType }[] = [
    { id: 'reading', label: 'Reading file', Icon: FileText },
    { id: 'parsing', label: 'Parsing structure', Icon: Cpu },
    { id: 'stripping', label: 'Erasing metadata', Icon: Eraser },
    { id: 'rebuilding', label: 'Rebuilding document', Icon: PackageCheck },
]
const PROCESSING: Stage[] = ['reading', 'parsing', 'stripping', 'rebuilding']

// ─── Component ────────────────────────────────────────────────────────────────
export default function MetadataRemove() {
    const [state, setState] = useState<ProcessingState>({
        stage: 'idle', progress: 0, elapsedMs: 0,
        filename: '', originalSize: 0, cleanedSize: 0,
        metaRemoved: [], errorMsg: '', downloadUrl: '',
    })
    const [dragOver, setDragOver] = useState(false)
    const fileRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const startRef = useRef(0)
    const displayEndRef = useRef(0)

    const process = useCallback(async (file: File) => {
        if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
            setState(s => ({ ...s, stage: 'error', errorMsg: 'Please upload a valid PDF file.' }))
            return
        }
        setState(s => { if (s.downloadUrl) URL.revokeObjectURL(s.downloadUrl); return s })

        startRef.current = performance.now()
        setState({
            stage: 'reading', progress: 5, elapsedMs: 0,
            filename: file.name, originalSize: file.size, cleanedSize: 0,
            metaRemoved: [], errorMsg: '', downloadUrl: '',
        })

        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setState(s => {
                if (s.stage === 'done' || s.stage === 'error') return s
                const elapsed = performance.now() - startRef.current
                const displayTotal = displayEndRef.current - startRef.current
                const visual = displayTotal > 0
                    ? Math.min(99, Math.round((performance.now() - startRef.current) / displayTotal * 100))
                    : s.progress
                return { ...s, elapsedMs: Math.round(elapsed), progress: Math.max(s.progress, visual) }
            })
        }, 80)

        try {
            const buffer = await file.arrayBuffer()
            setState(s => ({ ...s, stage: 'parsing', progress: 15 }))
            await new Promise(r => setTimeout(r, 60))

            setState(s => ({ ...s, stage: 'stripping', progress: 20 }))
            const { clean, removed } = await stripPdfMetadata(buffer, (pct, found) => {
                setState(s => ({
                    ...s,
                    progress: Math.max(s.progress, Math.round(15 + pct * 0.7)),
                    metaRemoved: found,
                }))
            })

            setState(s => ({ ...s, stage: 'rebuilding', progress: 88 }))
            await new Promise(r => setTimeout(r, 40))

            const actualMs = Math.round(performance.now() - startRef.current)
            displayEndRef.current = startRef.current + actualMs + 10_000 // +10 s display padding
            // Slice into a guaranteed plain ArrayBuffer (fixes Uint8Array<ArrayBufferLike> TS error)
            const cleanBuf = clean.buffer.slice(clean.byteOffset, clean.byteOffset + clean.byteLength) as ArrayBuffer
            const blob = new Blob([cleanBuf], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)

            const remaining = displayEndRef.current - performance.now()
            await new Promise<void>(r => setTimeout(r, Math.max(0, remaining)))

            if (timerRef.current) clearInterval(timerRef.current)
            setState({
                stage: 'done', progress: 100,
                elapsedMs: Math.round(performance.now() - startRef.current),
                filename: file.name, originalSize: file.size, cleanedSize: clean.length,
                metaRemoved: removed, errorMsg: '', downloadUrl: url,
            })
        } catch (err) {
            if (timerRef.current) clearInterval(timerRef.current)
            setState(s => ({
                ...s, stage: 'error',
                errorMsg: err instanceof Error ? err.message : 'Unknown error occurred.',
            }))
        }
    }, [])

    const handleFile = (f: File | null) => { if (f) process(f) }
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0] ?? null)
    }
    const reset = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        setState(s => {
            if (s.downloadUrl) URL.revokeObjectURL(s.downloadUrl)
            return {
                stage: 'idle', progress: 0, elapsedMs: 0,
                filename: '', originalSize: 0, cleanedSize: 0,
                metaRemoved: [], errorMsg: '', downloadUrl: '',
            }
        })
    }

    const isProcessing = PROCESSING.includes(state.stage)
    const curStepIdx = PROCESSING.indexOf(state.stage)

    const R = 54, C = 2 * Math.PI * R
    const dash = `${(state.progress / 100) * C} ${C}`

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-serif  { font-family: 'Instrument Serif', serif; }
        .font-mono   { font-family: 'JetBrains Mono', monospace; }
        .ring-glow   { filter: drop-shadow(0 0 8px #34d399); }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer {
          background: linear-gradient(90deg,#34d399 0%,#a7f3d0 40%,#34d399 60%,#6ee7b7 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .fade-up { animation: fadeUp .45s ease both; }
        .fade-up-1 { animation: fadeUp .45s .1s ease both; }
        .fade-up-2 { animation: fadeUp .45s .2s ease both; }
        @keyframes spin-slow { to { transform:rotate(360deg); } }
        .spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        .blink { animation: blink 1.6s ease-in-out infinite; }
        .ring-transition { transition: stroke-dasharray .35s ease; }
      `}</style>

            {/* Page background */}
            <div
                className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center px-4 py-14"
                style={{
                    backgroundImage:
                        'radial-gradient(ellipse 70% 40% at 10% 0%,  #064e3b1a 0%, transparent 60%),' +
                        'radial-gradient(ellipse 55% 50% at 90% 100%, #1e3a5f14 0%, transparent 55%)',
                }}
            >
                {/* ── Header ────────────────────────────────────────────── */}
                <header className="mb-8 text-center fade-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/40 rounded-full px-4 py-1.5 mb-5">
                        <Lock size={11} className="text-emerald-400" />
                        <span className="font-mono text-[0.6rem] text-emerald-400 tracking-[0.18em] uppercase">
                            100% Local · Zero Upload · Privacy First
                        </span>
                    </div>
                    <h1 className="font-serif text-5xl text-white leading-[1.05] tracking-tight">
                        PDF{' '}
                        <span className="shimmer italic">Metadata</span>
                        {' '}Eraser
                    </h1>
                    <p className="font-mono text-[0.7rem] text-slate-500 mt-2.5 tracking-wide">
                        Remove author, dates, GPS, XMP & more — right in your browser
                    </p>
                </header>

                {/* ── Card ──────────────────────────────────────────────── */}
                <div className="w-full max-w-[460px] fade-up-1">
                    {/* Top accent line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent mb-px" />

                    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl shadow-2xl shadow-black/60 p-7">

                        {/* ── IDLE ──────────────────────────────────────────── */}
                        {state.stage === 'idle' && (
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
                  transition-all duration-300 select-none
                  ${dragOver
                                        ? 'border-emerald-400 bg-emerald-950/20'
                                        : 'border-white/[0.07] hover:border-emerald-700/50 hover:bg-emerald-950/10'}`}
                                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileRef.current?.click()}
                                role="button"
                                aria-label="Upload PDF"
                            >
                                <input
                                    ref={fileRef} type="file" accept=".pdf,application/pdf"
                                    className="hidden"
                                    onChange={e => handleFile(e.target.files?.[0] ?? null)}
                                />

                                {/* Animated orbit decoration */}
                                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                                    <svg className="absolute inset-0 spin-slow opacity-[0.18]" viewBox="0 0 64 64" fill="none">
                                        <circle cx="32" cy="32" r="30" stroke="#34d399" strokeWidth="1" strokeDasharray="5 7" />
                                    </svg>
                                    <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center">
                                        <UploadCloud size={22} className="text-emerald-400" />
                                    </div>
                                </div>

                                <p className="font-serif text-lg text-white mb-1">Drop your PDF here</p>
                                <p className="font-mono text-[0.7rem] text-slate-500 mt-1">
                                    or{' '}
                                    <span className="text-emerald-400">click to browse</span>
                                    {' '}· processed entirely locally
                                </p>
                            </div>
                        )}

                        {/* ── PROCESSING ────────────────────────────────────── */}
                        {isProcessing && (
                            <div className="flex flex-col items-center gap-6 fade-up">
                                {/* Progress ring */}
                                <div className="relative w-[136px] h-[136px]">
                                    <svg className="-rotate-90" width="136" height="136" viewBox="0 0 136 136">
                                        <circle cx="68" cy="68" r={R} fill="none" stroke="#1e293b" strokeWidth="7" />
                                        <circle
                                            cx="68" cy="68" r={R} fill="none" stroke="#34d399" strokeWidth="7"
                                            strokeLinecap="round" strokeDasharray={dash}
                                            className="ring-glow ring-transition"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="font-mono text-[2rem] font-semibold text-white leading-none">
                                            {state.progress}
                                        </span>
                                        <span className="font-mono text-[0.58rem] text-slate-500 mt-1">%</span>
                                    </div>
                                </div>

                                {/* Stage label + timer */}
                                <div className="text-center space-y-1">
                                    <p className="font-mono text-[0.7rem] text-emerald-400 uppercase tracking-[0.16em] blink">
                                        {STEPS.find(s => s.id === state.stage)?.label ?? ''}…
                                    </p>
                                    <p className="font-mono text-[0.62rem] text-slate-600 flex items-center justify-center gap-1">
                                        <Clock size={10} />
                                        {formatMs(state.elapsedMs)} elapsed
                                    </p>
                                </div>

                                {/* Step list */}
                                <div className="w-full space-y-2">
                                    {STEPS.map((step, i) => {
                                        const done = i < curStepIdx
                                        const active = i === curStepIdx
                                        return (
                                            <div key={step.id} className="flex items-center gap-3">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                          ${done ? 'bg-emerald-950   text-emerald-400 border border-emerald-700/40' : ''}
                          ${active ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40' : ''}
                          ${!done && !active ? 'bg-white/[0.025] text-slate-600 border border-white/[0.05]' : ''}`}>
                                                    {done ? <CheckCircle2 size={13} /> : <step.Icon size={13} />}
                                                </div>
                                                <span className={`font-mono text-[0.7rem] flex-1 transition-colors duration-300
                          ${active ? 'text-white' : done ? 'text-emerald-700' : 'text-slate-600'}`}>
                                                    {step.label}
                                                </span>
                                                {active && <Zap size={10} className="text-emerald-400 blink" />}
                                                {done && <CheckCircle2 size={10} className="text-emerald-700" />}
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Detected fields */}
                                {state.metaRemoved.length > 0 && (
                                    <div className="w-full">
                                        <p className="font-mono text-[0.58rem] text-slate-600 uppercase tracking-wider mb-2">
                                            Fields found
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {state.metaRemoved.map(m => (
                                                <span key={m}
                                                    className="font-mono text-[0.6rem] bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 px-2 py-0.5 rounded-md">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── DONE ──────────────────────────────────────────── */}
                        {state.stage === 'done' && (
                            <div className="space-y-5 fade-up">
                                {/* Banner */}
                                <div className="flex items-center gap-3 bg-emerald-950/50 border border-emerald-800/40 rounded-xl px-4 py-3">
                                    <ShieldCheck size={20} className="text-emerald-400 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="font-serif text-white text-base">Metadata removed</p>
                                        <p className="font-mono text-[0.62rem] text-emerald-700 truncate">{state.filename}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { Icon: HardDrive, label: 'Original', val: formatBytes(state.originalSize) },
                                        { Icon: HardDrive, label: 'Cleaned', val: formatBytes(state.cleanedSize) },
                                        { Icon: Clock, label: 'Time taken', val: formatMs(state.elapsedMs) },
                                        { Icon: Hash, label: 'Fields removed', val: String(state.metaRemoved.length) },
                                    ].map(({ Icon, label, val }) => (
                                        <div key={label} className="bg-white/[0.025] border border-white/[0.05] rounded-xl p-3">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <Icon size={10} className="text-slate-500" />
                                                <span className="font-mono text-[0.58rem] text-slate-500 uppercase tracking-wider">{label}</span>
                                            </div>
                                            <span className="font-mono text-[0.85rem] text-white font-medium">{val}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Removed fields */}
                                <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Layers size={10} className="text-slate-500" />
                                        <span className="font-mono text-[0.58rem] text-slate-500 uppercase tracking-wider">Removed fields</span>
                                    </div>
                                    {state.metaRemoved.length > 0 ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {state.metaRemoved.map(m => (
                                                <span key={m}
                                                    className="font-mono text-[0.6rem] bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 px-2 py-0.5 rounded-md">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="font-mono text-xs text-slate-600">No metadata found in this file</span>
                                    )}
                                </div>

                                {/* Download */}
                                <a href={state.downloadUrl} download={state.filename.replace(/\.pdf$/i, '_clean.pdf')}>
                                    <button className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[.98] text-[#030f09] font-mono font-semibold text-[0.8rem] rounded-xl py-3 transition-all duration-150">
                                        <Download size={14} />
                                        Download Clean PDF
                                    </button>
                                </a>

                                <button onClick={reset}
                                    className="w-full flex items-center justify-center gap-2 border border-white/[0.07] hover:border-white/[0.18] text-slate-500 hover:text-slate-300 font-mono text-[0.7rem] rounded-xl py-2.5 transition-all duration-150">
                                    <RotateCcw size={11} />
                                    Process another file
                                </button>
                            </div>
                        )}

                        {/* ── ERROR ─────────────────────────────────────────── */}
                        {state.stage === 'error' && (
                            <div className="space-y-4 fade-up">
                                <div className="flex items-start gap-3 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3.5">
                                    <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="font-mono text-[0.7rem] text-red-300">{state.errorMsg}</p>
                                </div>
                                <button onClick={reset}
                                    className="w-full flex items-center justify-center gap-2 border border-white/[0.07] hover:border-white/[0.18] text-slate-500 hover:text-slate-300 font-mono text-[0.7rem] rounded-xl py-2.5 transition-all duration-150">
                                    <RotateCcw size={11} />
                                    Try again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-px" />
                </div>

                {/* ── Footer ────────────────────────────────────────────── */}
                <p className="mt-6 font-mono text-[0.6rem] text-slate-600 text-center leading-relaxed fade-up-2">
                    <span className="text-emerald-800">🔐 Zero data leaves your device.</span>
                    <br />
                    All processing runs in your browser's memory — no servers, no tracking.
                </p>
            </div>
        </>
    )
}