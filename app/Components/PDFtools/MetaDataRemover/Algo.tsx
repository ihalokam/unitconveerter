import React from 'react'
import {
    Binary,
    Eraser,
    ShieldAlert,
    Zap,
    Cpu,
    Database,
    Search,
    FileCode,
    BookOpen,
    Code2
} from 'lucide-react'

function Algorithm() {
    const technicalStages = [
        {
            title: "In-Memory Data Preparation",
            icon: <Database className="text-blue-600" />,
            desc: "The file is loaded into a Uint8Array for binary manipulation while simultaneously being decoded via 'latin1'. This ensures every byte (0-255) is mapped to a unique character, preventing the corruption typical of UTF-8 handling."
        },
        {
            title: "Non-Destructive Blanking",
            icon: <Eraser className="text-blue-600" />,
            desc: "Instead of deleting bytes—which would break the PDF's internal 'xref' offset map—the algorithm overwrites sensitive ranges with Space characters (0x20). The file structure remains intact, but the data is permanently erased."
        },
        {
            title: "XMP Packet Neutralization",
            icon: <FileCode className="text-blue-600" />,
            desc: "The engine scans for '<?xpacket begin' and '<?xpacket end' binary markers. It calculates the byte-distance and wipes the entire XML block, removing hidden Adobe history, GPS data, and unique Document IDs."
        }
    ];

    return (
        <section className="py-20 px-8 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl">

                {/* PART 1: THE ALGORITHM DEEP DIVE */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
                        <Binary size={32} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">
                        Algorithm <span className="text-blue-600">We Used</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-2xl font-medium">
                        StandardConverter operates directly on a PDF's raw byte-stream. By manipulating data at the binary level without external libraries, we guarantee 100% privacy and zero-dependency security.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {technicalStages.map((stage, idx) => (
                        <div key={idx} className="group p-8 rounded-[2rem] border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="mb-4">{React.cloneElement(stage.icon as React.ReactElement<any>, { size: 28 })}</div>
                            <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-3">{stage.title}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{stage.desc}</p>
                        </div>
                    ))}
                </div>

                {/* PART 2: THE FOUR-STAGE STRIPPING LOGIC (TEXTBOOK STYLE) */}
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    <Code2 size={400} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-8 bg-blue-500"></div>
                            <h2 className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
                                Stripping Logic Architecture
                            </h2>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-12">The <span className="text-blue-500">Four-Stage</span> Scrubbing Protocol</h3>

                        <div className="space-y-8 max-w-4xl">
                            {/* Stage A */}
                            <div className="flex gap-6">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">A</div>
                                    <div className="w-px h-full bg-slate-700 mt-2"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Search size={16} className="text-blue-500" />
                                        Dictionary Scrubbing (/Info)
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        The algorithm targets standard PDF metadata keys: <code className="text-blue-400">Author, Creator, Producer, CreationDate</code>, and more. Using regex-based pattern matching, it identifies value delimiters like <code className="bg-white/10 px-1 rounded text-white">(...)</code> or <code className="bg-white/10 px-1 rounded text-white">&lt;...&gt;</code> and overwrites the content with null-equivalent spaces.
                                    </p>
                                </div>
                            </div>

                            {/* Stage B */}
                            <div className="flex gap-6">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">B</div>
                                    <div className="w-px h-full bg-slate-700 mt-2"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <ShieldAlert size={16} className="text-blue-500" />
                                        Root Catalog De-referencing
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Modern PDFs contain a Metadata stream object. We search for the pattern <code className="text-blue-400">\/Metadata\s+\d+\s+\d+\s+R</code>. By blanking this reference in the Root catalog, we effectively "blind" the PDF reader to any metadata streams that may be hiding deep within the file structure.
                                    </p>
                                </div>
                            </div>

                            {/* Stage C */}
                            <div className="flex gap-6">
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">C</div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Zap size={16} className="text-blue-500" />
                                        Asynchronous UI Thread Yielding
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        To prevent browser hang during large file processing, the algorithm uses <code className="bg-white/10 px-1 rounded text-white">setTimeout(r, 0)</code>. This yields control back to the browser's main thread, allowing the progress bar to update and ensuring a smooth, responsive user experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINAL SUMMARY BADGE */}
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 px-5 py-2 bg-slate-100 rounded-full border border-slate-200">
                        <Cpu size={14} className="text-slate-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Zero-Dependency Core</span>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-2 bg-slate-100 rounded-full border border-slate-200">
                        <BookOpen size={14} className="text-slate-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Byte-Preserving Tech</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Algorithm