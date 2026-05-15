import React from 'react'
import { MonitorPlay, Target, BarChart3 } from 'lucide-react'

function HeadingOne() {
    return (
        <header className="py-16 px-6 bg-white border-b border-slate-100 relative overflow-hidden">
            {/* Structural Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Top Badge */}
                    <div className="mb-6 flex items-center gap-3 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                        <MonitorPlay size={14} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">
                            16:9 Revenue Engine
                        </span>
                    </div>

                    {/* Main H1 Heading */}
                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-slate-900 uppercase leading-[0.95] mb-6">
                        Estimate YouTube Revenue of a <br />
                        <span className="text-blue-600 underline decoration-slate-100 underline-offset-8">Long Form Video</span>
                    </h1>

                    {/* Sub Content Area */}
                    <div className="max-w-2xl grid md:grid-cols-2 gap-8 mt-4">
                        <div className="flex items-start gap-4 text-left p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
                                <Target size={18} />
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Check how much <span className="text-slate-900 font-bold italic">your competitor</span> is earning from their high-performing content.
                            </p>
                        </div>

                        <div className="flex items-start gap-4 text-left p-4 rounded-3xl hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                                <BarChart3 size={18} />
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Wisely pick the <span className="text-blue-600 font-bold italic">high paying niche</span> that aligns with your personal interests.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default HeadingOne