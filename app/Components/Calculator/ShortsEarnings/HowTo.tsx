import React from 'react'
import {
    HelpCircle,
    TrendingUp,
    Globe,
    Tag,
    Calculator as CalcIcon,
    CheckCircle2
} from 'lucide-react'

function HowTo() {
    const steps = [
        {
            title: "Input Monthly Views",
            desc: "Enter your average monthly YouTube Shorts views into the primary input field. This scales from 1K to over 1B views for high-precision forecasting.",
            icon: <TrendingUp size={20} />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Select Audience Geography",
            desc: "Choose the primary country of your viewers. Different regions yield significantly different RPMs, ranging from $0.01 to $0.21 per 1,000 views.",
            icon: <Globe size={20} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Factor in Promotions",
            desc: "Toggle the 'Product Promotion' switch if your content includes brand deals or affiliate links. This applies a $0.010 bonus to your effective RPM.",
            icon: <Tag size={20} />,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Analyze Results",
            desc: "Review your Daily, Monthly, and Yearly projections instantly. Consult the Global Benchmarks table below to find high-growth territories.",
            icon: <CalcIcon size={20} />,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ]

    return (
        <section className="py-24 px-6 bg-slate-50/30 border-t border-slate-100">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
                        <HelpCircle size={14} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Protocol</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                        How to use the <span className="text-blue-600">Calculator</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
                        Follow this systematic approach to forecast your YouTube Shorts revenue based on 2026 ad-sharing benchmarks.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
                        >
                            <div className="flex items-start gap-6">
                                {/* Icon Container */}
                                <div className={`shrink-0 w-14 h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    {step.icon}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[10px] font-black text-blue-600/40 uppercase tracking-widest">
                                            Step 0{idx + 1}
                                        </span>
                                        <div className="h-px w-8 bg-slate-100 group-hover:w-12 group-hover:bg-blue-200 transition-all duration-500"></div>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">{step.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </section>
    )
}

export default HowTo