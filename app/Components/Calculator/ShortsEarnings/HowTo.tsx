import React from 'react'
import {
    HelpCircle,
    TrendingUp,
    Globe,
    Tag,
    Calculator as CalcIcon
} from 'lucide-react'

function HowTo() {
    const steps = [
        {
            title: "Input Monthly Views",
            desc: "Enter your average monthly YouTube Shorts views into the primary input field. This scales from 1K to over 1B views for high-precision forecasting.",
            icon: <TrendingUp size={20} />,
            color: "text-red-600",
            bg: "bg-red-50"
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
            color: "text-amber-600",
            bg: "bg-amber-50"
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
        <section className="py-16 px-6 bg-slate-50/50 border-t border-slate-200/60">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-slate-200 rounded-full mb-4 shadow-sm">
                        <HelpCircle size={14} className="text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            User Protocol
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                        How to use the <span className="text-red-600">Calculator</span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base font-normal mt-3 max-w-xl mx-auto leading-relaxed">
                        Follow this step-by-step process to forecast your YouTube Shorts revenue based on 2026 ad-sharing benchmarks.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="group p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
                        >
                            <div className="flex items-start gap-5">
                                {/* Icon Container */}
                                <div className={`shrink-0 w-12 h-12 ${step.bg} ${step.color} rounded-xl flex items-center justify-center border border-black/5 transition-transform duration-300 group-hover:scale-105`}>
                                    {step.icon}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider">
                                            Step 0{idx + 1}
                                        </span>
                                        <span className="h-0.5 w-6 bg-slate-100 group-hover:w-10 group-hover:bg-red-200 transition-all duration-300 rounded-full" />
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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