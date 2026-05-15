import React from 'react'
import Link from 'next/link'
import {
    Calculator as CalcIcon,
    ArrowRight,
    PlayCircle,
    Zap,
    BarChart4,
    ChevronRight
} from 'lucide-react'

function Calculator() {
    const tools = [
        {
            title: "Long-form Video Earnings",
            path: "/calculator/long-youtube-video-earnings-calculator",
            desc: "Detailed estimates based on 8m+ duration and niche multipliers.",
            icon: <PlayCircle size={20} className="text-blue-600" />,
            tag: "RSC Ready"
        },
        {
            title: "YouTube Shorts Revenue",
            path: "/calculator/youtube-shorts-earnings-calculator",
            desc: "Fast projections for vertical video ad-pool payouts.",
            icon: <Zap size={20} className="text-orange-500" />,
            tag: "2026 Data"
        }
    ];

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">

                {/* Main Hub Link */}
                <div className="group relative bg-slate-900 rounded-[3rem] p-10 md:p-16 overflow-hidden mb-12 shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <CalcIcon size={24} />
                                </div>
                                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Analysis Suite</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                                Useful <span className="text-blue-600">Calculators</span>
                            </h2>
                            <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed">
                                See diffent Calculators to make your plans easy and work more faster.
                            </p>
                        </div>

                        <Link
                            href="/calculator"
                            className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-5 rounded-full font-black uppercase italic tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all duration-500 group-hover:scale-105"
                        >
                            See Calculators <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Decorative background element */}
                    <BarChart4 size={400} className="absolute -bottom-20 -right-20 text-white/[0.03] rotate-12 pointer-events-none" />
                </div>

                {/* Quick-Access Sub-Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tools.map((tool, i) => (
                        <Link
                            key={i}
                            href={tool.path}
                            className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-blue-100 shadow-sm transition-colors">
                                    {tool.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-black text-slate-900 uppercase italic text-sm tracking-tight">
                                            {tool.title}
                                        </h4>
                                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            {tool.tag}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-tight max-w-[200px]">
                                        {tool.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-blue-600 group-hover:text-blue-600 transition-all">
                                <ChevronRight size={18} />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Calculator