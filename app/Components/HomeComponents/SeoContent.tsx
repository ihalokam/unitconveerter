import React from 'react'
import { Terminal, Box, ShieldAlert, ArrowUpRight } from 'lucide-react'

function SeoContent() {
    return (
        <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80 flex items-center justify-center">
            <div className="max-w-5xl w-full">

                {/* Two Column Technical Breakdown */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">

                    {/* Left Column: Core Definition */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4 border border-slate-200/60">
                            <Terminal size={14} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Core Directory</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                            What is <span className="text-blue-600">Standard Convert?</span>
                        </h2>

                        <div className="space-y-4 text-sm text-slate-600 font-normal leading-relaxed">
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4 border border-slate-200/60">
                            <Box size={14} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Module Registry</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                            Our Tool <span className="text-blue-600">Suite</span>
                        </h2>

                        <div className="space-y-3">
                            {[
                                { title: "Unit Converter", desc: "Convert across 15+ categories including mass, length, temperature, volume, energy, and pressure. Supports bulk CSV processing for large datasets." },
                                { title: "Image to PDF Converter", desc: "Combine multiple images (JPG, PNG, WebP) into a single PDF document, 100% locally in your browser." },
                                { title: "PDF Metadata Remover", desc: "Strip hidden author, creation date, GPS, XMP, and producer metadata from PDF files before sharing them." },
                                { title: "YouTube Earnings Calculators", desc: "Estimate long-form and Shorts revenue by country and niche using creator-reported RPM data." }
                            ].map((tool, i) => (
                                <div key={i} className="p-4 border border-slate-200/80 bg-slate-50/60 rounded-2xl flex items-start gap-4 hover:bg-white hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                                    <div className="w-6 h-6 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-100 group-hover:bg-blue-50 transition-colors">
                                        <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                                        <p className="text-xs text-slate-500 font-normal leading-relaxed">{tool.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Frame: Why Privacy-First Matters Block */}
                <div className="p-8 md:p-10 bg-slate-50/80 rounded-2xl text-slate-900 relative overflow-hidden shadow-sm border border-slate-200/80">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-100">
                            <ShieldAlert size={16} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Security Architecture</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                            Why Privacy-First Matters
                        </h2>

                        <p className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed max-w-4xl">
                            Many online tools require you to upload your files to a remote server for processing, creating unnecessary
                            privacy risks — especially for sensitive legal, financial, or proprietary documents. Standard Convert
                            solves this by executing all computation in your browser using modern Web APIs. This means faster
                            processing, zero data exposure, and full compliance with enterprise security standards. Our zero-server
                            architecture isn't a feature — it's a core design principle that makes Standard Convert the trusted choice
                            for professionals who can't afford data leaks.
                        </p>
                    </div>

                    {/* Visual Decor Element */}
                    <div className="absolute -bottom-8 -right-6 text-[9rem] font-black text-slate-200/40 select-none pointer-events-none tracking-tighter">
                        LOCK
                    </div>
                </div>

            </div>
        </section>
    )
}

export default SeoContent