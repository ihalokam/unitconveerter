import React from 'react'
import {
    MousePointer2,
    Globe2,
    LayoutGrid,
    Clock,
    Activity,
    DollarSign,
    TrendingUp,
    CheckCircle2
} from 'lucide-react'

function HowTo() {
    const flowNodes = [
        {
            label: "Views",
            text: "Set Monthly Traffic",
            description: "Define projected view volume across all uploaded content per month.",
            icon: <MousePointer2 size={16} />,
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-100"
        },
        {
            label: "Territory",
            text: "Define Audience CPM",
            description: "Geography impacts advertiser demand—Tier 1 regions command top rates.",
            icon: <Globe2 size={16} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100"
        },
        {
            label: "Niche",
            text: "Identify Category Tier",
            description: "High-value industries (Finance, SaaS) drive up ad bid competition.",
            icon: <LayoutGrid size={16} />,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100"
        },
        {
            label: "Duration",
            text: "Mid-roll Compounding",
            description: "Videos over 8 minutes unlock additional mid-roll ad placements.",
            icon: <Clock size={16} />,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-100"
        }
    ];

    return (
        <section className="py-20 px-6 bg-slate-50 border-t border-slate-200/60 overflow-hidden">
            <div className="max-w-5xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-mono font-bold tracking-widest uppercase mb-4">
                        <Activity size={14} /> Calculation Pipeline
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">
                        How the Algorithm Forecasts Revenue
                    </h2>
                    <p className="text-sm text-slate-500 font-medium max-w-xl mt-2">
                        Four core variables feed into the YouTube Adsense formula to project your monthly and annual earnings.
                    </p>
                </div>

                {/* Vertical Timeline Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

                    {/* Left: Interactive Timeline Steps (8 Cols) */}
                    <div className="lg:col-span-7 space-y-4 relative">
                        {/* Connecting Vertical Line */}
                        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-slate-200 z-0 hidden sm:block" />

                        {flowNodes.map((node, idx) => (
                            <div key={idx} className="relative z-10 flex gap-4 sm:gap-6 group">
                                {/* Step Indicator */}
                                <div className={`w-14 h-14 rounded-2xl ${node.bg} ${node.color} border ${node.border} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                                    {node.icon}
                                </div>

                                {/* Step Card */}
                                <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm group-hover:border-red-500 group-hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] font-black text-red-600 uppercase tracking-widest">
                                                Step 0{idx + 1}
                                            </span>
                                            <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">
                                                {node.label}
                                            </h3>
                                        </div>
                                        <CheckCircle2 size={14} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-700">{node.text}</p>
                                    <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                                        {node.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Output Target Card (5 Cols) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8">
                        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-red-950/20 group hover:border-red-600 transition-all duration-500">

                            <div className="flex items-center justify-between mb-8">
                                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/40">
                                    <DollarSign size={22} className="text-white" />
                                </div>
                                <span className="font-mono text-[10px] font-black bg-red-950 text-red-400 border border-red-800/40 px-3 py-1 rounded-full uppercase tracking-widest">
                                    Output Target
                                </span>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h3 className="text-white text-lg font-black uppercase italic tracking-tight">
                                        Revenue Projection
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium mt-1">
                                        Calculates real-time baseline values against current global Adsense benchmark data.
                                    </p>
                                </div>

                                <div className="space-y-3 pt-2 border-t border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-emerald-400 rounded-full" />
                                            <span className="text-xs font-bold text-slate-300 uppercase">Monthly Yield</span>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-emerald-400">Estimated Range</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-red-400 rounded-full" />
                                            <span className="text-xs font-bold text-slate-300 uppercase">Annual Forecast</span>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-red-400">Compound Projections</span>
                                    </div>
                                </div>
                            </div>

                            <TrendingUp size={96} className="absolute -bottom-4 -right-4 text-white/[0.03] -rotate-12 group-hover:text-red-600/10 transition-colors pointer-events-none" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default HowTo