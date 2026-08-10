"use client";

import { useEffect, useState } from "react";
import { useAge } from "../context/AgeContext";

export default function LifespanProgress() {
    const { result } = useAge();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!result) return;
        const id = requestAnimationFrame(() => setWidth(result.lifespan.percent));
        return () => cancelAnimationFrame(id);
    }, [result]);

    if (!result) return null;
    const { daysLived, daysExpected, monthsLived, monthsExpected, percent } = result.lifespan;

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Lifespan</p>
                <h2 className="text-lg font-semibold text-stone-800">Life Progress</h2>
            </div>

            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                {/* Percent + label */}
                <div className="flex items-end justify-between mb-4">
                    <p className="text-sm text-stone-500 font-medium">Based on an 80-year lifespan</p>
                    <span className="text-3xl font-bold text-stone-900 tabular-nums">{percent}%</span>
                </div>

                {/* Bar */}
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-stone-800 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${width}%` }}
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-stone-100">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Days Lived</p>
                        <p className="text-stone-900 font-semibold tabular-nums">
                            {daysLived.toLocaleString()}
                            <span className="text-stone-400 font-normal text-sm"> / {daysExpected.toLocaleString()}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Months Lived</p>
                        <p className="text-stone-900 font-semibold tabular-nums">
                            {monthsLived.toLocaleString()}
                            <span className="text-stone-400 font-normal text-sm"> / {monthsExpected.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
