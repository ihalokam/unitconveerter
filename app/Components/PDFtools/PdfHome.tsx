import React from 'react'
import Link from 'next/link'
import { FileImage, ArrowRight, ShieldAlert, Cpu, Zap, LucideIcon, FileStack } from 'lucide-react'

// 1. Define a strict type for our PDF tool modules
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

// 2. Simply add or remove objects here to update your dashboard
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
        icon: FileStack, // Make sure to import FileStack from 'lucide-react' at the top of your file
        badge: { text: 'New Module', type: 'new' }
    },
    // 💡 To add a new tool in the future, just uncomment and edit this:
    // {
    //     id: '03',
    //     title: 'PDF Compressor',
    //     description: 'Reduce file size efficiently without compromising text clarity or image resolution.',
    //     href: '/pdf-tools/pdf-compressor',
    //     icon: Zap,
    //     badge: { text: 'New Module', type: 'new' }
    // }
];

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

                        {/* Render Active Modules Dynamically */}
                        {PDF_TOOLS_REGISTRY.map((tool) => {
                            const IconComponent = tool.icon;
                            const isActiveBadge = tool.badge.type === 'active';

                            return (
                                <div
                                    key={tool.id}
                                    className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:border-blue-500 transition-all group relative overflow-hidden flex flex-col justify-between h-[320px]"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-slate-900 rounded-2xl text-white group-hover:bg-blue-600 transition-colors">
                                                <IconComponent size={24} />
                                            </div>

                                            {/* Dynamic Badge Styles */}
                                            <div className={`flex items-center gap-2 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${isActiveBadge
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : 'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {isActiveBadge ? <Zap size={10} fill="currentColor" /> : <Cpu size={10} fill="currentColor" />}
                                                {tool.badge.text}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <Link href={tool.href} className="block mt-8">
                                        <button className="w-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 border border-slate-200 group-hover:border-blue-500 shadow-sm">
                                            Launch Module
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>

                                    <span className="absolute -bottom-4 -right-4 text-slate-50 font-black text-8xl pointer-events-none select-none italic">
                                        {tool.id}
                                    </span>
                                </div>
                            );
                        })}

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