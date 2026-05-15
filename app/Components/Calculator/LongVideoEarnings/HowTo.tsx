import React from 'react'
import {
    MousePointer2,
    Globe2,
    LayoutGrid,
    Clock,
    ArrowRight,
    Activity,
    DollarSign,
    TrendingUp
} from 'lucide-react'

function HowTo() {
    const flowNodes = [
        {
            label: "Views",
            text: "Set Monthly Traffic",
            icon: <MousePointer2 size={14} />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Territory",
            text: "Define Audience CPM",
            icon: <Globe2 size={14} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            label: "Niche",
            text: "Identify Category Tier",
            icon: <LayoutGrid size={14} />,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            label: "Duration",
            text: "Mid-roll Compounding",
            icon: <Clock size={14} />,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    return (
        <section className="py-20 px-6 bg-white border-t border-slate-100 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                {/* Sub-Heading */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={14} className="text-blue-600" />
                        <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                            Calculation Pipeline
                        </h3>
                    </div>
                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                </div>

                {/* Diagram Flow Container */}
                <div className="relative flex flex-col lg:flex-row items-stretch gap-4">

                    {/* SVG Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

                    {/* Input Nodes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow relative z-10">
                        {flowNodes.map((node, idx) => (
                            <div key={idx} className="relative group">
                                <div className="flex flex-col h-full gap-4 p-6 rounded-[2rem] border border-slate-100 bg-white hover:border-blue-600 hover:shadow-2xl transition-all duration-500">
                                    <div className="flex items-center justify-between">
                                        <div className={`w-10 h-10 rounded-2xl ${node.bg} ${node.color} flex items-center justify-center shrink-0`}>
                                            {node.icon}
                                        </div>
                                        <span className="font-mono text-[10px] font-black text-slate-200">0{idx + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900 uppercase italic tracking-tight">{node.label}</h4>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1 leading-tight">{node.text}</p>
                                    </div>
                                </div>
                                {idx < flowNodes.length - 1 && (
                                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-100 rounded-full items-center justify-center shadow-sm z-20">
                                        <ArrowRight size={10} className="text-slate-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Final Connector to Result (Desktop Only) */}
                    <div className="hidden lg:flex items-center justify-center px-2">
                        <div className="w-10 h-0.5 bg-blue-600"></div>
                        <ArrowRight size={16} className="text-blue-600 -ml-2" />
                    </div>

                    {/* Result Node: The Projection Output */}
                    <div className="lg:w-64 relative z-10">
                        <div className="h-full p-6 rounded-[2rem] bg-slate-900 border border-slate-800 flex flex-col justify-center gap-4 group hover:border-blue-600 transition-all duration-500 shadow-2xl shadow-blue-900/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                                    <DollarSign size={18} className="text-white" />
                                </div>
                                <span className="font-mono text-[10px] font-black text-blue-400 uppercase tracking-widest">Output</span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="text-white text-xs font-black uppercase italic tracking-tighter">Earnings Result</h4>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="h-1 w-1 bg-emerald-400 rounded-full"></div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Yield</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Annual Forecast</p>
                                    </div>
                                </div>
                            </div>

                            <TrendingUp size={40} className="absolute -bottom-2 -right-2 text-white/5 -rotate-12 group-hover:text-blue-600/10 transition-colors" />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default HowTo