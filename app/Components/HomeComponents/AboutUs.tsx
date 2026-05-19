import React from 'react'
import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react'

function AboutUs() {
    const pillars = [
        {
            quote: "We deliver the tools for your job easy",
            desc: "Engineering complex binary logic into simple, one-click solutions.",
            icon: <Zap className="text-blue-600" size={24} />,
            label: "Efficiency"
        },
        {
            quote: "We build security first tools",
            desc: "Privacy isn't an afterthought; it is the foundation of our source code.",
            icon: <ShieldCheck className="text-blue-600" size={24} />,
            label: "Integrity"
        },
        {
            quote: "Your data never leaves your system",
            desc: "100% Client-side processing. We don't have servers because we don't need your data.",
            icon: <Lock className="text-blue-600" size={24} />,
            label: "Sovereignty"
        },
        {
            quote: "Free, Fast and Secure",
            desc: "Professional grade utilities available to everyone, everywhere, at zero cost.",
            icon: <Globe className="text-blue-600" size={24} />,
            label: "Accessibility"
        }
    ];

    return (
        <section className="py-24 px-8 bg-slate-50 overflow-hidden relative">
            {/* Background Branding Watermark */}
            <div className="absolute top-10 -right-20 text-[12rem] font-black text-slate-200/40 select-none pointer-events-none">
                ABOUT
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Mission Statement */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
                            <ShieldCheck size={14} /> The Standard Protocol
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
                            TOOLS BUILT FOR <br />
                            <span className="text-blue-600 italic underline decoration-slate-900 underline-offset-8">PRAGMATISTS.</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                            Standard Convert is a high-performance utility suite designed for professionals who demand
                            speed without compromising data security.
                        </p>
                    </div>

                    {/* Right: The Quote Pillars */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {pillars.map((item, i) => (
                            <div
                                key={i}
                                className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="mb-6 p-3 bg-slate-50 rounded-2xl w-fit group-hover:bg-blue-50 transition-colors">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">
                                    {item.label}
                                </span>
                                <h4 className="text-xl font-bold text-slate-900 leading-tight mb-3 italic tracking-tight">
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