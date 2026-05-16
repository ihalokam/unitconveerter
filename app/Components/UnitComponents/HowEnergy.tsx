import React from 'react'
import { Activity, FileUp, ListChecks, ArrowRightLeft, Download } from 'lucide-react'

function HowEnergy() {
    const steps = [
        { text: "Upload a CSV or Excel file with energy data", icon: FileUp },
        { text: "Pick the row that has your column names", icon: ListChecks },
        { text: "Map each pressure column + choose units", icon: ArrowRightLeft },
        { text: "Set rounding, then download converted file", icon: Download }
    ];

    return (
        <section className="min-h-[60vh] flex items-center justify-center py-24 px-6 bg-white">
            <div className="w-full max-w-xl">

                {/* Header: Matches EnergyContent Header Style */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-100">
                        <Activity size={14} /> Operational Protocol
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-4">
                        Energy Data <span className="text-blue-600">Logic</span>
                    </h3>
                    <p className="text-sm font-medium text-slate-500 max-w-xs">
                        Follow these sequential steps to process and convert your scientific energy datasets.
                    </p>
                </div>

                {/* Steps Pipeline: Centered Layout */}
                <div className="relative space-y-4">
                    {/* Vertical Connector Line */}
                    <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-slate-100 z-0"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex items-center gap-6 group">
                            {/* Icon Hub */}
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:border-blue-600 group-hover:shadow-blue-100 transition-all duration-500">
                                <step.icon size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                            </div>

                            {/* Instruction Card */}
                            <div className="flex-1 p-5 rounded-[1.5rem] bg-white border border-slate-100 group-hover:border-slate-200 group-hover:shadow-lg group-hover:shadow-slate-100 transition-all duration-500">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                                        {step.text}
                                    </p>
                                    <span className="font-mono text-[10px] font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                                        PHASE_0{i + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Centered Status Footer */}
                <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-900 rounded-full border border-slate-800 shadow-xl">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <p className="font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            System Status: <span className="text-white font-black">Ready for Processing</span>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HowEnergy