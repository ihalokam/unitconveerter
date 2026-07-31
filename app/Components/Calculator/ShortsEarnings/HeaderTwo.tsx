import React from 'react';
import { Activity } from "lucide-react";

function HeaderTwo() {
    return (
        <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-12">
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-red-100/50 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10 mx-auto max-w-2xl text-center">
                {/* Subtitle Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200/60 px-3 py-1 text-xs font-semibold text-red-600">
                    <Activity size={14} className="text-red-600" />
                    <span className="uppercase tracking-wider">Shorts · RPM Explorer</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Do you know your <span className="text-red-600">average views</span> and RPM?
                </h1>

                {/* Supporting Copy */}
                <p className="mt-3 text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-lg mx-auto">
                    Drag both sliders to explore how views and RPM affect your estimated earnings in real-time.
                </p>
            </div>
        </div>
    );
}

export default HeaderTwo;