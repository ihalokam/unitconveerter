import React from 'react'
import Link from 'next/link'
import {
    FileSearch,
    Image as ImageIcon,
    FilePlus,
    ShieldCheck,
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
            icon: <FileSearch size={24} />,
            tag: "Security"
        },
        {
            title: "Image to PDF",
            desc: "Convert PNG, JPG, and WebP images into professional PDF documents directly in your browser.",
            href: "/pdf-tools/image-to-pdf-converter",
            icon: <ImageIcon size={24} />,
            tag: "Conversion"
        }
    ];

    return (
        <section className="py-24 px-8 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl">

                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <Lock size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Client-Side Binary Protocol</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                            PDF <span className="text-blue-600">Workstation</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed border-l-2 border-slate-100 pl-6 italic">
                        No servers. No uploads. Just pure browser-side document manipulation for total privacy.
                    </p>
                </div>

                {/* Modular Tool Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pdfTools.map((tool, index) => (
                        <Link
                            href={tool.href}
                            key={index}
                            className="group relative p-8 bg-slate-50/50 border border-slate-200 rounded-[2.5rem] hover:bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-white border border-slate-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                                        {tool.icon}
                                    </div>
                                    <span className="text-[9px] font-black px-3 py-1 rounded-full bg-slate-100 text-slate-500 uppercase tracking-widest border border-slate-200">
                                        {tool.tag}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    {tool.title}
                                    <ArrowRight size={20} className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                    {tool.desc}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                                    READY
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* REDIRECT CARD: Links to /pdf-tools/ */}
                    <Link
                        href="/pdf-tools/"
                        className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center group bg-white hover:border-blue-600 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
                    >
                        <div className="p-4 bg-slate-50 rounded-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <PlusCircle className="text-slate-300 group-hover:text-white" size={32} />
                        </div>
                        <h4 className="text-slate-900 font-bold mb-1 uppercase text-xs tracking-widest italic decoration-blue-600">
                            Need a specific tool?
                        </h4>
                        <p className="text-slate-400 text-[10px] uppercase font-black tracking-tight max-w-[200px] mb-4">
                            We are constantly expanding our local-binary suite.
                        </p>
                        <span className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-tighter">
                            View all PDF Tools <ArrowRight size={12} />
                        </span>
                    </Link>
                </div>


            </div>
        </section>
    )
}

export default PdfComponent