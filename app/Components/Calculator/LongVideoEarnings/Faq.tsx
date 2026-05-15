import React from 'react'
import { HelpCircle, Plus, Lightbulb, Sparkles } from 'lucide-react'

export default function FAQ() {
    const faqData = [
        {
            q: "YouTube Revenue Calculator",
            a: "Use the calculator above to estimate your average YouTube revenue by entering your monthly views, audience region, niche, and average video duration."
        },
        {
            q: "How much does YouTube pay for 1 million views?",
            a: "YouTube earnings for 1 million views can vary widely depending on the audience country, niche, video length, and engagement. On average, creators may earn anywhere from $1,000 to $20,000 or more. You can use this calculator to estimate earnings for 1M, 100K, or even 1,000 views."
        },
        {
            q: "How much does a YouTuber with 100K subscribers make?",
            a: "Subscriber count does not directly determine YouTube earnings. Revenue mainly depends on views, audience location, niche, watch time, and ad rates. Subscribers help creators get more consistent views and engagement."
        },
        {
            q: "How much money does MrBeast make?",
            a: "MrBeast is estimated to earn millions of dollars per month from YouTube ad revenue alone. His videos regularly generate hundreds of millions of views, in addition to sponsorships, merchandise, and other business ventures."
        },
        {
            q: "YouTube payment in India / US / UK?",
            a: "YouTube RPM and CPM rates vary significantly by country. Generally, creators in the US, UK, and Canada earn higher ad revenue compared to many other regions. Use the calculator to estimate earnings based on your audience country."
        },
        {
            q: "What are the highest-paying YouTube niches?",
            a: "Finance, investing, business, technology, AI, and software-related content are among the highest-paying YouTube niches due to strong advertiser demand and higher CPM rates."
        },
        {
            q: "What is a good YouTube RPM?",
            a: "A good YouTube RPM depends on the content niche and audience location. For entertainment or gaming channels, an RPM of $1–$3 is common, while finance or SaaS channels may achieve $10–$25 or more. In general, anything above $5 RPM is considered strong for a global audience."
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full mb-4">
                        <HelpCircle size={14} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Knowledge Base</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((faq, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
                        >
                            <div className="flex gap-6">
                                <div className="shrink-0 w-8 h-8 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-mono text-xs font-black group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight mb-3 flex items-center justify-between">
                                        {faq.q}
                                        <Plus size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-3xl">
                                        {faq.a}
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