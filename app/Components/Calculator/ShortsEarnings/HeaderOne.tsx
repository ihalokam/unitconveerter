import React from 'react';
import { Play } from "lucide-react";

function HeaderOne() {
    return (
        <header className="relative overflow-hidden bg-white px-6 py-12 text-slate-900 border-b border-slate-200">
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-100/60 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Top Badges */}
                <div className="mb-6 flex items-center justify-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200/60 px-3 py-1 text-xs font-semibold text-red-600">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600">
                            <Play size={8} fill="white" className="text-white ml-0.5" />
                        </span>
                        <span>YouTube Shorts</span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>2026 Live Index</span>
                    </div>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
                    Shorts Revenue <span className="text-red-600">Calculator</span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-xl text-base md:text-lg text-slate-600 font-normal leading-relaxed">
                    Estimate your YouTube Shorts earnings with high precision. Calculate potential revenue based on view volume, geographic audience, and integrations.
                </p>
            </div>
        </header>
    );
}

export default HeaderOne;