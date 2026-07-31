import React from 'react'
import Link from 'next/link'
import {
    Calculator as CalcIcon,
    ArrowRight,
    PlayCircle,
    Zap,
    BarChart4,
    ChevronRight,
    Layers
} from 'lucide-react'

function Calculator() {
    const tools = [
        {
            title: "Long-form Video Earnings",
            path: "/calculator/long-youtube-video-earnings-calculator",
            desc: "Detailed estimates based on 8m+ duration and niche multipliers.",
            icon: <PlayCircle size={20} className="text-blue-600" />,
            tag: "Youtube"
        },
        {
            title: "YouTube Shorts Revenue",
            path: "/calculator/youtube-shorts-earnings-calculator",
            desc: "Fast projections for vertical video ad-pool payouts.",
            icon: <Zap size={20} className="text-amber-500" />,
            tag: "Youtube"
        },
        {
            title: "Concrete Calculator",
            path: "/calculator/concrete-calculator",
            desc: "Calculate cubic yards, bag counts, and instant cost comparisons.",
            icon: <Layers size={20} className="text-emerald-600" />,
            tag: "DIY & Pro"
        }
    ];

    return (
        <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto">

                {/* Main Hub Feature Card */}
                <div className="group relative bg-slate-900 rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden mb-10 shadow-xl shadow-slate-900/10">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6 border border-blue-500/20">
                                <CalcIcon size={14} className="text-blue-400" />
                                <span>Analysis Suite</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                                Useful <span className="text-blue-500">Calculators</span>
                            </h2>

                            <p className="text-slate-300 font-normal text-sm sm:text-base leading-relaxed">
                                Explore our collection of specialized calculators designed to streamline your planning, estimate revenue, and work faster.
                            </p>
                        </div>

                        <Link
                            href="/calculator"
                            className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white shadow-md hover:shadow-blue-500/25 transition-all duration-300 shrink-0"
                        >
                            <span>See Calculators</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Decorative Background Graphics */}
                    <BarChart4 size={380} className="absolute -bottom-16 -right-16 text-white/[0.04] rotate-12 pointer-events-none" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Quick-Access Sub-Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tools.map((tool, i) => (
                        <Link
                            key={i}
                            href={tool.path}
                            className="flex items-center justify-between p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl hover:bg-white hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200/80 group-hover:border-blue-100 shadow-sm transition-colors shrink-0">
                                    {tool.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                            {tool.title}
                                        </h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-200/60 text-slate-600 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {tool.tag}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                        {tool.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-lg border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:border-blue-500/40 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shrink-0 ml-3">
                                <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Calculator