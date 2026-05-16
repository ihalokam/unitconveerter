import React from 'react'
import { ShieldAlert, Trash2, Cpu, EyeOff, Zap } from 'lucide-react'

function Features() {
    const scrubList = [
        "/Title & /Author", "/Subject & /Keywords", "/CreationDate",
        "/ModDate", "XMP Packets", "/Metadata Streams"
    ];

    const features = [
        {
            category: "De-Identification",
            title: "Total Identity Removal",
            desc: "Our engine surgically removes every trace of document origin — from hardware signatures to user-identifiable timestamps.",
            highlights: scrubList,
            icon: <Trash2 className="text-blue-600" size={24} />,
        },
        {
            category: "Structural Analysis",
            title: "Deep Stream Inspection",
            desc: "Unlike shallow converters, we strip XMP metadata packets and /Metadata stream references directly from the PDF trailer entries.",
            icon: <Cpu className="text-blue-600" size={24} />,
        },
        {
            category: "Privacy First",
            title: "100% Client-Side",
            desc: "The scrubbing happens in your browser RAM. Your sensitive PDF is never transmitted to a server for cleaning.",
            icon: <EyeOff className="text-blue-600" size={24} />,
        },
    ];

    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl">

                {/* Section Header — matches PngToPdfContent style */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
                        <ShieldAlert size={14} className="text-blue-600" /> Security Protocol Active
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">
                        🔐 PDF <span className="text-blue-600">Metadata Remover</span>
                    </h2>
                    <div className="h-1 w-24 bg-blue-600 rounded-full" />
                </div>

                {/* Feature Grid — matches PngToPdfContent 3-col layout */}
                <div className="grid lg:grid-cols-3 gap-12 mb-24">
                    {features.map((feat, idx) => (
                        <div key={idx} className="group relative">
                            <div className="mb-6 inline-block p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors border border-slate-100">
                                {feat.icon}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">{feat.category}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-6">{feat.desc}</p>
                            {feat.highlights && (
                                <div className="flex flex-wrap gap-2">
                                    {feat.highlights.map((h, i) => (
                                        <span key={i} className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-md uppercase tracking-tighter">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Detail panel — matches the dark card from PngToPdfContent */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Zap size={20} className="text-blue-400" /> Why Metadata Matters
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 text-slate-400 text-sm font-medium border-b border-slate-800 pb-4 group-hover:text-white transition-colors">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span><strong>Author fields</strong> can expose your real name or organisation to any PDF reader.</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400 text-sm font-medium border-b border-slate-800 pb-4 group-hover:text-white transition-colors">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span><strong>Creation & modification dates</strong> reveal when and how frequently you edited a document.</span>
                            </li>
                            <li className="flex items-center gap-4 text-slate-400 text-sm font-medium group-hover:text-white transition-colors">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span><strong>XMP packets</strong> may embed GPS coordinates, software history, and unique document IDs.</span>
                            </li>
                        </ul>
                    </div>
                    <EyeOff size={180} className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none" />
                </div>

            </div>
        </section>
    )
}

export default Features