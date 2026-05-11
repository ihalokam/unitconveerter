import React from 'react'
import Link from 'next/link'
import { FileImage, ArrowRight, Shield, Zap, Cpu, ShieldAlert } from 'lucide-react'

function PdfHome() {
    return (
        <div>
            <main className="flex-grow py-24 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Grid Header */}
                    <div className="mb-12 border-l-4 border-blue-600 pl-6">
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                            PDF Tool <span className="text-blue-600">Registry</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                            Available Local-First Processing Modules
                        </p>
                    </div>

                    {/* Industrial Grid Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Module 01: Image to PDF */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-blue-500 transition-all group relative overflow-hidden flex flex-col justify-between h-[320px]">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-slate-900 rounded-2xl text-white group-hover:bg-blue-600 transition-colors">
                                        <FileImage size={24} />
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter border border-emerald-100">
                                        <Zap size={10} fill="currentColor" /> Active
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                                    Image to PDF
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Convert PNG, JPG, and WebP into high-precision PDF documents using 100% local browser memory.
                                </p>
                            </div>

                            <Link href="/pdf-tools/image-to-pdf-converter" className="block mt-8">
                                <button className="w-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 border border-slate-200 group-hover:border-blue-500 shadow-sm">
                                    Launch Module
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <span className="absolute -bottom-4 -right-4 text-slate-50 font-black text-8xl pointer-events-none select-none italic">01</span>
                        </div>

                        {/* Module 02: Metadata Remover */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-blue-500 transition-all group relative overflow-hidden flex flex-col justify-between h-[320px]">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-slate-900 rounded-2xl text-white group-hover:bg-blue-600 transition-colors">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                                        <Cpu size={10} fill="currentColor" /> New Module
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                                    Metadata Remover
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Strip EXIF data, GPS coordinates, and hardware signatures from your PDF files to ensure complete anonymity.
                                </p>
                            </div>

                            <Link href="/pdf-tools/pdf-metadata-remover" className="block mt-8">
                                <button className="w-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 border border-slate-200 group-hover:border-blue-500 shadow-sm">
                                    Launch Module
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <span className="absolute -bottom-4 -right-4 text-slate-50 font-black text-8xl pointer-events-none select-none italic">02</span>
                        </div>

                        {/* Placeholder: Future Module */}
                        <div className="bg-slate-100/50 border border-slate-200 border-dashed rounded-3xl p-8 flex flex-col justify-center items-center text-center opacity-60">
                            <Cpu className="text-slate-300 mb-4" size={32} />
                            <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Standard Protocol v4.5</h4>
                            <p className="text-slate-400 text-[11px] font-black uppercase mt-2 italic">Registry Expansion in Progress</p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default PdfHome