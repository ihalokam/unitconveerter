"use client";

import { useState, useEffect } from "react";
import { useAge } from "../context/AgeContext";
import { useRouter } from "next/navigation";

const MONTHS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
];

interface CalculatorProps {
    compact?: boolean;
}

export default function Calculator({ compact = false }: CalculatorProps) {
    const router = useRouter();
    const { dob } = useAge();
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (dob) setValue(dob.toISOString().split("T")[0]);
    }, [dob]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!value) { setError("Please enter your date of birth."); return; }
        const dobObj = new Date(`${value}T00:00:00`);
        if (dobObj > new Date()) { setError("That date is in the future."); return; }
        setError("");
        const day = String(dobObj.getDate()).padStart(2, "0");
        const month = MONTHS[dobObj.getMonth()];
        const year = dobObj.getFullYear();
        router.push(`/calculator/age-calculator/${day}-${month}-${year}`);
    }

    if (compact) {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start py-4">
                <div className="flex flex-col gap-1.5 flex-1 w-full sm:w-auto">
                    <label htmlFor="dob-compact" className="text-xs font-semibold text-stone-500 tracking-wide">
                        Date of birth
                    </label>
                    <input
                        id="dob-compact"
                        type="date"
                        max={today}
                        value={value}
                        onChange={(e) => { setValue(e.target.value); setError(""); }}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm font-medium
                                   focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                                   hover:border-stone-300 transition-colors shadow-sm"
                    />
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="mt-5 sm:mt-0 self-start sm:self-end px-6 py-2.5 bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold
                               rounded-xl transition-all active:scale-95 whitespace-nowrap"
                >
                    Calculate →
                </button>
            </form>
        );
    }

    return (
        <section className="max-w-3xl mx-auto px-5 pt-20 pb-16 sm:pt-28 sm:pb-20">
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 mb-5">
                Age Calculator
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-[1.1] mb-4">
                How old are you,{" "}
                <span className="italic font-light text-stone-400">exactly?</span>
            </h1>

            <p className="text-base text-stone-500 max-w-md leading-relaxed mb-10">
                Enter your date of birth and we&apos;ll calculate your precise age, zodiac sign,
                birthstone, life milestones, and more.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
                <div className="flex flex-col gap-1.5 flex-1 w-full sm:w-auto">
                    <label htmlFor="dob" className="text-xs font-semibold text-stone-500 tracking-wide">
                        Date of birth
                    </label>
                    <input
                        id="dob"
                        type="date"
                        max={today}
                        value={value}
                        onChange={(e) => { setValue(e.target.value); setError(""); }}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm font-medium
                                   focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                                   hover:border-stone-300 transition-colors placeholder:text-stone-300 shadow-sm"
                    />
                    {error && (
                        <p className="text-xs text-red-500 font-medium">{error}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-5 sm:mt-0 self-start sm:self-end px-7 py-3 bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold
                               rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                >
                    Calculate age →
                </button>
            </form>

            <p className="mt-5 text-xs text-stone-400">
                Calculated locally in your browser. Nothing is stored or sent anywhere.
            </p>
        </section>
    );
}
