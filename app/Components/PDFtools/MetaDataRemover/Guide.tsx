import React from 'react'
import { FileSearch, Settings2, ShieldCheck, Download, ArrowRight, CheckCircle } from 'lucide-react'

function Guide() {
    const steps = [
        {
            number: "01",
            title: "Load Document",
            desc: "Select the PDF from your device. StandardConvert scans the binary file structure and prepares it for analysis.",
            icon: <FileSearch className="text-blue-500" size={28} />,
        },
        {
            number: "02",
            title: "Analyze Streams",
            desc: "Our engine locates hidden /Info trailer entries, XMP packets, and all /Metadata stream references.",
            icon: <Settings2 className="text-blue-500" size={28} />,
        },
        {
            number: "03",
            title: "Scrub Headers",
            desc: "Metadata fields are permanently blanked using byte-precise overwriting. The PDF structure remains intact.",
            icon: <ShieldCheck className="text-blue-500" size={28} />,
        },
        {
            number: "04",
            title: "Secure Export",
            desc: "Download your sanitized PDF instantly. No server history or logs are created — processing never leaves your browser.",
            icon: <Download className="text-blue-500" size={28} />,
        },
    ];

    return (
        <section className="py-24 px-8 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl">

                {/* Header — matches PNGtoPDF/Guide.tsx layout */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-4">
                            Workflow Protocol
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                            How to use <br />
                            <span className="text-blue-500 text-3xl md:text-5xl uppercase tracking-tight">PDF Metadata Remover</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <ShieldCheck className="text-emerald-500" size={32} />
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Security Status</p>
                            <p className="text-sm font-bold text-slate-900 leading-none">100% Client-Side Processing</p>
                        </div>
                    </div>
                </div>

                {/* Step Cards — matches PNGtoPDF/Guide card style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Connector line on desktop */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/4 left-full w-full h-[2px] bg-slate-200 -z-0 translate-x-[-10%]" />
                            )}

                            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-400 transition-all duration-300 relative z-10 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                                        {step.icon}
                                    </div>
                                    <span className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    {step.title}
                                    <ArrowRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                </h3>

                                <p className="text-sm text-slate-500 font-medium leading-relaxed flex-grow">
                                    {step.desc}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    <CheckCircle size={14} /> Protocol Verified
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Guide