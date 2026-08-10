"use client";

import { useState } from "react";
import { FAQS } from "./faqData";

export default function Faq() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="max-w-3xl mx-auto px-5 py-12">
            <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">FAQ</p>
                <h2 className="text-lg font-semibold text-stone-800">Frequently Asked Questions</h2>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden bg-white">
                {FAQS.map((item, i) => (
                    <div key={item.q}>
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                            <span className="text-sm font-medium text-stone-800 pr-4">{item.q}</span>
                            <span className={`text-stone-400 text-lg leading-none shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                                +
                            </span>
                        </button>
                        {open === i && (
                            <div className="px-5 pb-5">
                                <p className="text-sm text-stone-500 leading-relaxed">{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
