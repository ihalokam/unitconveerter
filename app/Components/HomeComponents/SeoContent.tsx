import React from 'react'
import { Terminal, Box, ShieldAlert, ArrowUpRight } from 'lucide-react'

function SeoContent() {
    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100 flex items-center justify-center">
            <div className="max-w-5xl w-full">

                {/* Two Column Technical Breakdown */}
                <div className="grid md:grid-cols-2 gap-16 items-start mb-12">

                    {/* Left Column: Core Definition */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Terminal size={14} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Core Directory</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
                            What is <br />
                            <span className="text-blue-600 not-italic">Standard Convert?</span>
                        </h2>
                        <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                            <p>
                                Standard Convert is a free, privacy-first browser utility suite built for engineers, data scientists,
                                creators, and everyday professionals. Every tool on this site runs entirely in your browser — your
                                files and data never leave your device.
                            </p>
                            <p>
                                There are no servers storing your logs, no mandatory accounts required,
                                and no hidden tracking scripts. Whether you need to convert units in bulk via CSV, transform images into a PDF, strip hidden metadata
                                from a document, or estimate your YouTube channel earnings, Standard Convert gives you professional-grade
                                precision in a clean, fast interface.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Interactive Tool Suite Registry */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Box size={14} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Module Registry</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
                            Our Tool <span className="text-blue-600">Suite</span>
                        </h2>

                        <div className="space-y-3">
                            {[
                                { title: "Unit Converter", desc: "Convert across 15+ categories including mass, length, temperature, volume, energy, and pressure. Supports bulk CSV processing for large datasets." },
                                { title: "Image to PDF Converter", desc: "Combine multiple images (JPG, PNG, WebP) into a single PDF document, 100% locally in your browser." },
                                { title: "PDF Metadata Remover", desc: "Strip hidden author, creation date, GPS, XMP, and producer metadata from PDF files before sharing them." },
                                { title: "YouTube Earnings Calculators", desc: "Estimate long-form and Shorts revenue by country and niche using 2026 creator-reported RPM data." }
                            ].map((tool, i) => (
                                <div key={i} className="p-4 border border-slate-100 bg-slate-50 rounded-2xl flex items-start gap-4 hover:bg-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 group">
                                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-600 mt-1 shrink-0 transition-colors" />
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-tight text-slate-900 mb-1">{tool.title}</h4>
                                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{tool.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Frame: Why Privacy-First Matters Block */}
                <div className="p-8 md:p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl border border-slate-800">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert size={18} className="text-blue-500" />
                            <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Security Architecture</h3>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black uppercase italic text-white mb-4 tracking-tight">
                            Why Privacy-First Matters
                        </h2>
                        <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed max-w-4xl">
                            Many online tools require you to upload your files to a remote server for processing, creating unnecessary
                            privacy risks — especially for sensitive legal, financial, or proprietary documents. Standard Convert
                            solves this by executing all computation in your browser using modern Web APIs. This means faster
                            processing, zero data exposure, and full compliance with enterprise security standards. Our zero-server
                            architecture isn't a feature — it's a core design principle that makes Standard Convert the trusted choice
                            for professionals who can't afford data leaks.
                        </p>
                    </div>
                    {/* Visual Decor Element */}
                    <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/5 select-none pointer-events-none italic tracking-tighter">
                        LOCK
                    </div>
                </div>

            </div>
        </section>
    )
}

export default SeoContent