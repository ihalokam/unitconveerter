import React from 'react'
import { MonitorPlay, Target, BarChart3 } from 'lucide-react'

function HeadingOne() {
    return (
        <header className="py-14 sm:py-16 px-6 bg-white border-b border-slate-200/60 relative overflow-hidden">
            {/* Structural Dot Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Top Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 border border-red-100/80 rounded-full">
                        <MonitorPlay size={14} className="text-red-600" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                            16:9 Revenue Engine
                        </span>
                    </div>

                    {/* Main H1 Heading */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5">
                        Estimate YouTube Revenue of a <br className="hidden sm:inline" />
                        <span className="text-red-600 underline decoration-red-100 underline-offset-8">
                            Long-Form Video
                        </span>
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto mb-8 leading-relaxed">
                        Forecast standard video payouts by factoring in custom RPMs, viewer demographics, and niche benchmarks.
                    </p>

                    {/* Sub Content Feature Highlights */}
                    <div className="max-w-2xl w-full grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3.5 text-left p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                                <Target size={18} />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-slate-900 mb-0.5">Competitor Analysis</span>
                                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                    Check how much competitors earn from high-performing 16:9 content.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 text-left p-4 sm:p-5 rounded-2xl bg-red-50/40 border border-red-100/70 hover:bg-white hover:border-red-200 hover:shadow-sm transition-all duration-300">
                            <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                                <BarChart3 size={18} />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-slate-900 mb-0.5">High-RPM Niches</span>
                                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                    Identify top-paying video categories that align with your channel goals.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default HeadingOne