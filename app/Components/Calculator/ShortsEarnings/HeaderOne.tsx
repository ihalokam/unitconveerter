import React from 'react'
import { Play, Zap } from "lucide-react";

function HeaderOne() {
    return (
        <header className="border-b border-slate-100 px-6 py-16 bg-white overflow-hidden relative">
            {/* Background Decorative Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

            <div className="mx-auto max-w-2xl relative z-10">
                {/* Protocol Badge */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                            <Play size={10} fill="white" className="text-white ml-0.5" />
                        </div>
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                            Youtube Shorts
                        </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Live 2026 Index</span>
                    </div>
                </div>

                {/* Main H1 Heading */}
                <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 leading-[0.9]">
                    Earnings<br />
                    <span className="text-blue-600 flex items-center gap-4">
                        Calculator
                        <Zap size={40} className="text-slate-100 -rotate-12 hidden md:block" fill="currentColor" />
                    </span>
                </h1>

                {/* Subtext */}
                <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4 border-l-2 border-blue-600 pl-6">
                    <p className="text-sm text-slate-500 font-medium max-w-md leading-relaxed">
                        High-precision forecasting engine for <span className="text-slate-900 font-bold">YouTube Shorts</span> monetization.
                        Estimate revenue based on geography, volume, and product integrations.
                    </p>
                </div>
            </div>
        </header>
    )
}

export default HeaderOne