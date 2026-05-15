import React from 'react'
import {
    FileUp,
    TableProperties,
    Binary,
    FileDown,
    ChevronDown,
    ShieldCheck,
    MousePointer2
} from 'lucide-react'

function Upload() {
    const steps = [
        {
            title: "Input Source",
            desc: "Drop your CSV or Excel file.",
            icon: <FileUp size={24} />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Map Schema",
            desc: "Select specific columns to convert.",
            icon: <TableProperties size={24} />,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "Set Precision",
            desc: "Define rounding & decimal values.",
            icon: <Binary size={24} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Final Output",
            desc: "Download synchronized XLSX.",
            icon: <FileDown size={24} />,
            color: "text-slate-900",
            bg: "bg-slate-100"
        }
    ]

    return (
        <section className="mx-auto max-w-7xl px-8 py-20">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-12 shadow-sm">

                {/* Header Text */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
                        <ShieldCheck size={14} /> Zero-Server Architecture
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
                        Streamlined <span className="text-blue-600">Batch Pipeline</span>
                    </h2>
                    <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto">
                        Our local-first engine processes your industrial datasets in four simple steps.
                        Select a category below to begin your transformation.
                    </p>
                </div>

                {/* The Pipeline Graphic */}
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Connector Line (Desktop Only) */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-[70%] w-full h-[2px] bg-slate-100 z-0">
                                    <div className="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${step.bg} ${step.color} shadow-lg shadow-slate-100 transition-transform group-hover:-translate-y-2 duration-300`}>
                                    {step.icon}
                                </div>

                                <div className="px-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Step 0{idx + 1}</h4>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator Section */}
                <div className="mt-20 flex flex-col items-center border-t border-slate-100 pt-10">
                    <div className="flex flex-col items-center gap-3 group cursor-default">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 group-hover:text-blue-600 transition-colors">
                            Explore Categories
                        </p>

                        {/* Animated Scroll Visual */}
                        <div className="relative flex items-center justify-center">
                            {/* The "Mouse" or "Path" container */}
                            <div className="h-12 w-7 rounded-full border-2 border-slate-200 p-1 flex justify-center">
                                <div className="h-2 w-1 rounded-full bg-blue-600 animate-bounce mt-1" />
                            </div>

                            {/* Floating Arrows */}
                            <div className="absolute top-14 flex flex-col items-center animate-pulse">
                                <ChevronDown size={20} className="text-slate-300 -mb-2" />
                                <ChevronDown size={20} className="text-slate-400 -mb-2" />
                                <ChevronDown size={20} className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industrial Watermark */}
                <div className="absolute -bottom-10 -right-10 text-slate-50 opacity-20 pointer-events-none">
                    <Binary size={300} />
                </div>
            </div>
        </section>
    )
}

export default Upload