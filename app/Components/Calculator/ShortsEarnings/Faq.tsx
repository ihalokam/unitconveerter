"use client";

import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react'

function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        {
            q: "Why are we different from SocialBlade?",
            a: "SocialBlade is mostly limited to long-form video revenue. It often combines long-form and Shorts data together, treating them as the same, which makes the estimates inaccurate. We created this tool exclusively to estimate YouTube Shorts revenue accurately."
        },
        {
            q: "How did we get the countrywide RPM data?",
            a: "We conducted extensive surveys across creator communities like Reddit and reached out directly to active Shorts creators globally to gather reliable, real-world RPM benchmarks across different territories."
        },
        {
            q: "How is Shorts revenue estimated?",
            a: "Our formula models the YouTube Shorts Ad Revenue sharing pool, factoring in geography, product tagging bonuses, and estimated YouTube Premium pool contributions."
        },
        {
            q: "What is YouTube RPM?",
            a: "RPM (Revenue Per Mille) represents how much money you earn per 1,000 views. Unlike CPM (which is what advertisers pay), RPM is a creator-focused metric showing your actual net pay after YouTube's revenue cut."
        },
        {
            q: "Which countries' revenue can I estimate here?",
            a: "We support the top 20 global user regions: United States, India, Brazil, Indonesia, Mexico, Japan, Germany, Vietnam, Philippines, Turkey, Pakistan, United Kingdom, Egypt, France, Bangladesh, Thailand, South Korea, Italy, Spain, and Canada."
        }
    ];

    return (
        <section className="py-16 px-6 bg-white border-t border-slate-200/60">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full mb-3">
                        <HelpCircle size={14} className="text-red-600" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
                            FAQ & Guidance
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                        Common <span className="text-red-600">Questions</span>
                    </h2>
                    <p className="text-slate-600 text-sm mt-2">
                        Everything you need to know about our YouTube Shorts revenue calculations and data methodology.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {questions.map((item, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                                        ? "bg-white border-red-200 shadow-md shadow-red-500/5"
                                        : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base font-bold text-slate-900 tracking-tight">
                                        {item.q}
                                    </span>
                                    <div
                                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${isOpen ? "bg-red-50 text-red-600 rotate-180" : "bg-slate-200/60 text-slate-500"
                                            }`}
                                    >
                                        <ChevronDown size={16} />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                                        <p className="pt-3">{item.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Verification Note Banner */}
                <div className="mt-8 p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-start gap-3.5">
                    <ShieldCheck className="text-red-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                        Data calculations align with YouTube's 2026 Shorts revenue sharing framework. Actual payouts will vary based on viewer retention, niche, and advertiser demand.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Faq