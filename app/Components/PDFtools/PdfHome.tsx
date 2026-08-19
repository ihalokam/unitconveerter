import React from 'react'
import Link from 'next/link'
import { FileImage, ArrowRight, ShieldAlert, Cpu, Zap, LucideIcon, FileStack, FileCode, ShieldCheck } from 'lucide-react'

// 1. Strict type for PDF tool modules (Preserved)
interface PdfTool {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    badge: {
        text: string;
        type: 'active' | 'new';
    };
}

// 2. Data registry (Preserved)
const PDF_TOOLS_REGISTRY: PdfTool[] = [
    {
        id: '01',
        title: 'Image to PDF',
        description: 'Convert PNG, JPG, and WebP into high-precision PDF documents using 100% local browser memory.',
        href: '/pdf-tools/image-to-pdf-converter',
        icon: FileImage,
        badge: { text: 'Active', type: 'active' }
    },
    {
        id: '02',
        title: 'Metadata Remover',
        description: 'Strip EXIF data, GPS coordinates, and hardware signatures from your PDF files to ensure complete anonymity.',
        href: '/pdf-tools/pdf-metadata-remover',
        icon: ShieldAlert,
        badge: { text: 'New Module', type: 'new' }
    },
    {
        id: '03',
        title: 'PDF Merger',
        description: 'Combine multiple PDF files into a single, organized document completely within your browser.',
        href: '/pdf-tools/merge-pdfs',
        icon: FileStack,
        badge: { text: 'New Module', type: 'new' }
    },
    {
        id: '04',
        title: 'Markdown to PDF',
        description: 'Convert Markdown (.md) files into structured, print-ready PDFs with native Mermaid and LaTeX rendering.',
        href: '/pdf-tools/markdown-to-pdf',
        icon: FileCode,
        badge: { text: 'Active', type: 'new' }
    }
];

function PdfHome() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col antialiased">
            <main className="flex-grow py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Grid Header */}
                    <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide mb-4">
                                <ShieldCheck size={14} className="text-blue-600" />
                                <span>CLIENT-SIDE PROCESSING</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                                PDF Processing <span className="text-blue-600">Modules</span>
                            </h1>
                            <p className="mt-2 text-base text-slate-600 leading-relaxed">
                                Local-first browser tools designed to manipulate, convert, and protect your documents without ever uploading them to a server.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            {PDF_TOOLS_REGISTRY.length} Active Local Modules
                        </div>
                    </div>

                    {/* Module Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Render Active Modules Dynamically */}
                        {PDF_TOOLS_REGISTRY.map((tool) => {
                            const IconComponent = tool.icon;
                            const isActiveBadge = tool.badge.type === 'active';

                            return (
                                <Link
                                    key={tool.id}
                                    href={tool.href}
                                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <div>
                                        {/* Header inside card */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-slate-900 rounded-xl text-white group-hover:bg-blue-600 transition-colors shadow-xs">
                                                <IconComponent size={22} />
                                            </div>

                                            {/* Badge */}
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${isActiveBadge
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                                                : 'bg-blue-50 text-blue-700 border-blue-200/80'
                                                }`}>
                                                {isActiveBadge ? <Zap size={11} className="fill-current" /> : <Cpu size={11} className="fill-current" />}
                                                {tool.badge.text}
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                                            {tool.title}
                                        </h2>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-8">
                                            {tool.description}
                                        </p>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        <span>Launch Module</span>
                                        <div className="flex items-center gap-1.5 text-blue-600 group-hover:translate-x-1 transition-transform">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Subtle Watermark ID */}
                                    <span className="absolute -bottom-3 -right-2 text-slate-100 font-extrabold text-7xl pointer-events-none select-none tracking-tighter transition-colors group-hover:text-blue-50/50">
                                        {tool.id}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Future Expansion Card */}
                        <div className="bg-slate-100/60 border border-slate-200 border-dashed rounded-2xl p-6 flex flex-col justify-center items-center text-center min-h-[260px]">
                            <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-500 flex items-center justify-center mb-3">
                                <Cpu size={20} />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-700">More Tools Coming Soon</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
                                Expansion modules for compression, extraction, and offline rendering are in development.
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default PdfHome