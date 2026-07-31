import React from 'react'
import Link from 'next/link'
import {
    FileSearch,
    Image as ImageIcon,
    ArrowRight,
    Lock,
    PlusCircle
} from 'lucide-react'

function PdfComponent() {
    const pdfTools = [
        {
            title: "Metadata Remover",
            desc: "Surgically strip hidden forensic data, author info, and XMP packets from your PDF files locally.",
            href: "/pdf-tools/pdf-metadata-remover",
            icon: <FileSearch size={22} />,
            tag: "Security"
        },
        {
            title: "Image to PDF",
            desc: "Convert PNG, JPG, and WebP images into professional PDF documents directly in your browser.",
            href: "/pdf-tools/image-to-pdf-converter",
            icon: <ImageIcon size={22} />,
            tag: "Conversion"
        }
    ];

    return (
        <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80">
            <div className="mx-auto max-w-7xl">

                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6 pb-8 border-b border-slate-100">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-100">
                            <Lock size={14} className="text-blue-600" />
                            <span>Client-Side Binary Protocol</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            PDF <span className="text-blue-600">Workstation</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed border-l-2 border-blue-600 pl-4 font-normal">
                        No servers. No uploads. Just pure browser-side document manipulation for total operational privacy.
                    </p>
                </div>

                {/* Modular Tool Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pdfTools.map((tool, index) => (
                        <Link
                            href={tool.href}
                            key={index}
                            className="group relative p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl hover:bg-white hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-5">
                                    <div className="p-3 bg-white border border-slate-200/80 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                                        {tool.icon}
                                    </div>
                                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white text-slate-600 uppercase tracking-wider border border-slate-200/80">
                                        {tool.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                                    <span>{tool.title}</span>
                                    <ArrowRight size={18} className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h3>

                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                                    {tool.desc}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                    READY
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* REDIRECT CARD: Links to /pdf-tools/ */}
                    <Link
                        href="/pdf-tools/"
                        className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center group bg-slate-50/40 hover:border-blue-500/50 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer min-h-[260px]"
                    >
                        <div className="p-3 bg-white rounded-xl mb-3 border border-slate-200/80 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shadow-sm">
                            <PlusCircle className="text-slate-400 group-hover:text-white" size={24} />
                        </div>
                        <h4 className="text-slate-900 font-bold mb-1 text-sm">
                            Need a specific tool?
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-[220px] mb-4">
                            We are constantly expanding our local-binary document suite.
                        </p>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 group-hover:underline">
                            <span>View all PDF Tools</span>
                            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default PdfComponent