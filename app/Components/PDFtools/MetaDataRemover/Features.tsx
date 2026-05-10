import React from 'react'
import { ShieldAlert, Trash2, Cpu, EyeOff, Lock, Zap } from 'lucide-react'

function Features() {
    const scrubList = [
        "/Title & /Author", "/Subject & /Keywords", "/CreationDate",
        "/ModDate", "XMP Packets", "/Metadata Streams"
    ];

    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 mb-4">
                        <ShieldAlert size={14} /> Security Protocol Active
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6 uppercase">
                        Deep <span className="text-blue-600">Metadata Scrubbing</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <div className="p-4 bg-slate-900 rounded-2xl inline-block text-white">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 italic">Total De-Identification</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Our engine surgically removes every trace of document origin, from hardware signatures to user-identifiable time stamps.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {scrubList.map((item, i) => (
                                <span key={i} className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-md border border-slate-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-slate-900 rounded-2xl inline-block text-white">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 italic">Structural Analysis</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Unlike shallow converters, we strip XMP metadata packets and /Metadata stream references directly from the PDF trailer entries.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-slate-900 rounded-2xl inline-block text-white">
                            <EyeOff size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 italic">100% Client-Side</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            The scrubbing happens in your browser RAM. Your sensitive PDF is never transmitted to a server for cleaning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features