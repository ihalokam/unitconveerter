import React from 'react'
import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react'

function AboutUs() {
    const pillars = [
        {
            quote: "We make complex operations easy",
            desc: "Engineering complex multi-variable calculations into responsive, human-readable user tools.",
            icon: <Zap className="text-blue-600" size={22} />,
            label: "Efficiency Matrix"
        },
        {
            quote: "We build security-first utilities",
            desc: "Privacy isn't an afterthought; total zero-knowledge architecture is baked directly into our code.",
            icon: <ShieldCheck className="text-blue-600" size={22} />,
            label: "Integrity Layer"
        },
        {
            quote: "Your datasets never leave your system",
            desc: "100% Client-side browser processing. We don't maintain data servers because we don't store your records.",
            icon: <Lock className="text-blue-600" size={22} />,
            label: "Data Sovereignty"
        },
        {
            quote: "Free, Fast, and Unrestricted",
            desc: "Enterprise-grade digital converters and financial estimators accessible globally at zero operational cost.",
            icon: <Globe className="text-blue-600" size={22} />,
            label: "Universal Access"
        }
    ];

    return (
        <section className="py-32 px-6 bg-white overflow-hidden relative border-t border-slate-100">
            {/* Background Branding Watermark */}
            <div className="absolute top-12 -right-16 text-[14rem] font-black text-slate-100/70 tracking-tighter select-none pointer-events-none uppercase italic">
                SaaS//
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left Frame: Core SaaS Mission Statement */}
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-100/50">
                            <ShieldCheck size={14} /> System Core Protocol
                        </div>

                        {/* H1 Semantics for SEO Engine Optimization */}
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95] mb-8 uppercase italic">
                            SaaS Tools <br />
                            Engineered For <br />
                            <span className="text-blue-600 not-italic font-black relative">
                                Pragmatists.
                                <span className="absolute left-0 bottom-1 w-full h-[6px] bg-slate-900 -z-10 opacity-10"></span>
                            </span>
                        </h1>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                            Standard Convert is an infrastructure of ultra-fast calculators, computational models, and semantic data converters designed for creators and developers who require millisecond performance.
                        </p>
                    </div>

                    {/* Right Frame: Micro-Architecture Pillars */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                        {pillars.map((item, i) => (
                            <div
                                key={i}
                                className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 group"
                            >
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit border border-slate-200/60 shadow-sm group-hover:border-blue-200 transition-colors">
                                    {item.icon}
                                </div>
                                <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block">
                                    {item.label}
                                </span>
                                <h4 className="text-lg font-black text-slate-900 leading-tight mb-3 uppercase italic tracking-tight">
                                    "{item.quote}"
                                </h4>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">
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