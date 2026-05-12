import React from 'react'
import {
    Cpu, Box, Binary, Zap, ShieldCheck, Layers,
    Layout, Save, BookOpen, Map, Hash, Scale
} from 'lucide-react'

function Algorithm() {
    const theoreticalPrinciples = [
        {
            title: "Object-Oriented Structure",
            icon: <Hash className="text-blue-500" size={20} />,
            desc: "PDFs are a collection of 'Indirect Objects'. We manually define Dictionaries (<< >>) and Streams to describe assets without heavy library overhead."
        },
        {
            title: "The Xref Lookup Table",
            icon: <Map className="text-blue-500" size={20} />,
            desc: "Our engine calculates exact byte-offsets to generate a Cross-Reference table, enabling 'Random Access' so readers can jump to any page instantly."
        },
        {
            title: "Coordinate Matrices (CTM)",
            icon: <Scale className="text-blue-500" size={20} />,
            desc: "We use the 'cm' operator to map raw image pixels into 'User Space' points (1/72nd inch), ensuring resolution-independent printing."
        }
    ];

    return (
        <section className="py-20 px-8 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl">

                {/* PART 1: TECHNICAL EXECUTION */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
                        <Cpu size={32} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">
                        Internal Mechanics & <span className="text-blue-600">Core Algorithm</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl font-medium">
                        StandardConverter utilizes a proprietary, library-free PDF engine that operates directly on binary arrays for maximum privacy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {/* Execution Steps */}
                    {[
                        { icon: <Layers />, title: "1. Image Processing", text: "Images are rendered to an off-screen Canvas to bake in rotations and apply filters before JPEG encapsulation." },
                        { icon: <Box />, title: "2. Object Mapping", text: "The engine builds a PDF 1.4 tree, mapping IDs for Catalog, Pages, and XObjects using /DCTDecode filters." },
                        { icon: <Layout />, title: "3. Positioning Logic", text: "Geometry is calculated in PDF points. We use Math.min to scale images to fit margins while maintaining aspect ratios." },
                        { icon: <Binary />, title: "4. Binary Assembly", text: "The final file is assembled using Uint8Array, calculating precise byte offsets for the mandatory Xref table." },
                        { icon: <Save />, title: "5. Memory Guard", text: "To handle large batches, the algorithm uses URL.revokeObjectURL and async yielding to keep the UI responsive." },
                        { icon: <ShieldCheck />, title: "6. Local Execution", text: "Zero data leaves your machine. The entire binary injection cycle is executed within your browser's secure sandbox." }
                    ].map((item, idx) => (
                        <div key={idx} className="group p-8 rounded-[2rem] border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                            <div className="text-blue-600 mb-4 italic">
                                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                            </div>
                            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-3">{item.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* PART 2: TEXTBOOK THEORY SECTION */}
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
                    {/* Decorative Background Icon */}
                    <BookOpen size={300} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none" />

                    <div className="relative z-10 max-w-4xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-8 bg-blue-500"></div>
                            <h2 className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
                                Theory
                            </h2>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
                            The Four Pillars of the <br />
                            <span className="text-blue-500">PDF Specification</span>
                        </h3>

                        <div className="grid gap-4">
                            {theoreticalPrinciples.map((p, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="shrink-0 p-3 bg-blue-500/20 rounded-xl h-fit">
                                        {p.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">{p.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Quote */}
                        <p className="mt-10 text-xs text-slate-500 font-mono italic leading-relaxed max-w-2xl">
                            * StandardConverter leverages the HTML5 File API and TypedArrays (Uint8Array) to construct
                            binary blobs locally, bypassing the latency and security risks of server-side conversion.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Algorithm