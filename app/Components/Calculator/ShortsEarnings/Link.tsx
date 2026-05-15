import React from 'react'
import { ArrowRight, Video, MonitorPlay, Zap } from 'lucide-react'

function Link() {
    return (
        <section className="px-6 py-12">
            <div className="max-w-2xl mx-auto">
                <a
                    href="/calculator/long-youtube-video-earnings-calculator"
                    className="group relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 transition-all duration-500 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-500">
                            <MonitorPlay size={28} className="text-white" />
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <span className="font-mono text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Switch Engine</span>
                                <div className="h-px w-4 bg-slate-700"></div>
                            </div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">
                                Long-Form <span className="text-blue-500">Estimator</span>
                            </h3>
                            <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">
                                Analyze revenue for standard 16:9 videos
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                        <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest">Let's check</span>
                        <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Decorative Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
                    <Zap size={60} className="absolute -bottom-4 -right-4 text-white/5 -rotate-12 pointer-events-none" fill="currentColor" />
                </a>


            </div>
        </section>
    )
}

export default Link