import React from 'react'
import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react'

function AboutUs() {
    const pillars = [
        {
            quote: "We make complex operations easy",
            desc: "Engineering complex multi-variable calculations into responsive, human-readable user tools.",
            icon: <Zap className="text-blue-600" size={20} />,
            label: "Efficiency Matrix"
        },
        {
            quote: "We build security-first utilities",
            desc: "Privacy isn't an afterthought; total zero-knowledge architecture is baked directly into our code.",
            icon: <ShieldCheck className="text-blue-600" size={20} />,
            label: "Integrity Layer"
        },
        {
            quote: "Your datasets never leave your system",
            desc: "100% Client-side browser processing. We don't maintain data servers because we don't store your records.",
            icon: <Lock className="text-blue-600" size={20} />,
            label: "Data Sovereignty"
        },
        {
            quote: "Free, Fast, and Unrestricted",
            desc: "Enterprise-grade digital converters and financial estimators accessible globally at zero operational cost.",
            icon: <Globe className="text-blue-600" size={20} />,
            label: "Universal Access"
        }
    ];

    return (
        <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white overflow-hidden relative border-t border-slate-200/80">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Frame: Core SaaS Mission Statement */}
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100">
                            <ShieldCheck size={14} className="text-blue-600" />
                            <span>System Core Protocol</span>
                        </div>

                        {/* H1 Semantics for SEO Engine Optimization */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
                            SaaS Tools Built for <br className="hidden sm:inline" />
                            <span className="text-blue-600">
                                Speed & Performance
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                            Standard Convert is an infrastructure of ultra-fast calculators, computational models, and semantic data converters designed for creators and developers who require millisecond performance.
                        </p>
                    </div>

                    {/* Right Frame: Micro-Architecture Pillars */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {pillars.map((item, i) => (
                            <div
                                key={i}
                                className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl hover:bg-white hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-100">
                                        {item.label}
                                    </span>
                                </div>

                                <h4 className="text-base font-bold text-slate-900 leading-snug mb-2">
                                    "{item.quote}"
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AboutUs