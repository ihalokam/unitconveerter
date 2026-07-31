import React from 'react'
import { ArrowRight, MonitorPlay, Sparkles } from 'lucide-react'

function LongFormLink() {
    return (
        <section className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
                <a
                    href="/calculator/long-youtube-video-earnings-calculator"
                    className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-0.5 overflow-hidden"
                >
                    {/* Ambient Hover Backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/20 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Left Content */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="w-12 h-12 bg-red-50 border border-red-100/80 rounded-xl flex items-center justify-center text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 shrink-0">
                            <MonitorPlay size={22} className="group-hover:scale-110 transition-transform duration-300" />
                        </div>

                        <div>
                            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                                <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider">
                                    Switch Tool
                                </span>
                                <span className="h-1 w-1 rounded-full bg-red-400" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                Long-Form <span className="text-red-600">Estimator</span>
                            </h3>

                            <p className="text-xs font-normal text-slate-500 mt-0.5">
                                Analyze estimated CPM and total revenue for standard 16:9 YouTube videos.
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold group-hover:bg-red-600 transition-colors shadow-sm shrink-0">
                        <span>Try Estimator</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    {/* Background Decorative Icon */}
                    <Sparkles size={80} className="absolute -bottom-6 -right-6 text-slate-100 -rotate-12 pointer-events-none group-hover:text-red-100/50 transition-colors duration-300" />
                </a>
            </div>
        </section>
    )
}

export default LongFormLink