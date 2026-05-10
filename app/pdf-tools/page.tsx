import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Link from 'next/link'
import { FileImage, ArrowRight, Shield, Zap, Cpu } from 'lucide-react'

function page() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow py-24 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Grid Header */}
                    <div className="mb-12 border-l-4 border-blue-600 pl-6">
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                            Tool <span className="text-blue-600">Registry</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                            Available Local-First Processing Modules
                        </p>
                    </div>

                    {/* Industrial Grid Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Image to PDF Tool Module */}
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

                            {/* The Grid-Style Button */}
                            <Link href="/pdf-tools/image-to-pdf-converter" className="block mt-8">
                                <button className="w-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 border border-slate-200 group-hover:border-blue-500 shadow-sm">
                                    Launch Module
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>


                        </div>


                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default page