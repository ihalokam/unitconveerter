"use client";

import { useState } from "react";
import { useAge } from "../context/AgeContext";

export default function ShareCard() {
    const { result } = useAge();
    const [copied, setCopied] = useState(false);

    if (!result) return null;

    const CANONICAL_URL = "https://standardconvert.com/calculator/age-calculator";

    async function handleCopy() {
        await navigator.clipboard.writeText(CANONICAL_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    function handlePrint() {
        window.print();
    }

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="bg-stone-900 rounded-2xl px-8 py-10 text-center relative overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                <div className="relative">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-3">Your Summary</p>
                    <p className="text-5xl sm:text-6xl font-extrabold text-white tabular-nums mb-3">
                        {result.breakdown.years}
                        <span className="text-stone-400 text-3xl font-light ml-2">years</span>
                    </p>
                    <p className="text-sm text-stone-400 mb-8">
                        {result.zodiac.symbol} {result.zodiac.sign} · {result.lifeStats.totalDays.toLocaleString()} days alive
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 text-sm bg-white text-stone-900 font-semibold
                                       px-5 py-2.5 rounded-xl hover:bg-stone-100 transition-all active:scale-95 cursor-pointer"
                        >
                            {copied ? "✓ Copied!" : "Copy link"}
                        </button>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 text-sm bg-stone-800 text-white font-semibold border border-stone-700
                                       px-5 py-2.5 rounded-xl hover:bg-stone-700 transition-all active:scale-95 cursor-pointer"
                        >
                            Print report
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
