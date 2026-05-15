import React from 'react'
import { HelpCircle, ChevronDown, Info, ShieldCheck } from 'lucide-react'

function Faq() {
    const questions = [
        {
            q: "Why are we different from SocialBlade?",
            a: "SocialBlade is mostly limited to long-form video revenue. It often combines long-form and Shorts data together, treating them as the same, which makes the estimates very inaccurate. We decided to solve that problem by creating a webpage exclusively designed to estimate YouTube Shorts revenue."
        },
        {
            q: "How did we get the countrywide RPM data?",
            a: "We conducted a survey through various platforms like Reddit and reached out to creators globally to gain a clear overview of actual RPM data across different territories."
        },
        {
            q: "How is Shorts revenue estimated?",
            a: "Our formula includes the standard YouTube Ad Revenue sharing pool, plus additional factors like Product Tagging bonuses and YouTube Premium contributions."
        },
        {
            q: "What is YouTube RPM?",
            a: "RPM (Revenue Per Mille) represents how much money you earn per 1,000 views. Unlike CPM (which is what advertisers pay), RPM is a creator-focused metric that shows your actual take-home pay after YouTube's revenue cut."
        },
        {
            q: "Which countries' revenue can I estimate here?",
            a: "We currently support the top 20 global user regions: United States, India, Brazil, Indonesia, Mexico, Japan, Germany, Vietnam, Philippines, Turkey, Pakistan, United Kingdom, Egypt, France, Bangladesh, Thailand, South Korea, Italy, Spain, and Canada."
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <HelpCircle size={18} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">FAQ / Protocol</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Common <span className="text-blue-600">Inquiries</span>
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {questions.map((item, idx) => (
                        <div
                            key={idx}
                            className="group p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
                        >
                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase italic flex justify-between items-center">
                                    {item.q}
                                    <ChevronDown size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:rotate-180 transition-all" />
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Verification Note */}
                <div className="mt-12 p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                    <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                    <p className="text-[11px] font-bold text-blue-700/70 uppercase tracking-wider leading-relaxed">
                        Data accuracy is based on the 2026 ad-revenue sharing model.
                        Actual results may fluctuate based on specific content niches and viewer engagement levels.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Faq