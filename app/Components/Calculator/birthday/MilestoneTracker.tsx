"use client";

import { useAge } from "../context/AgeContext";

export default function MilestoneTracker() {
    const { result } = useAge();
    if (!result) return null;

    const nextIndex = result.milestones.findIndex((m) => !m.reached);

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Milestones</p>
                <h2 className="text-lg font-semibold text-stone-800">Age Milestones</h2>
            </div>

            <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-stone-50">
                {result.milestones.map((m, i) => {
                    const isNext = i === nextIndex;
                    const isReached = m.reached;

                    return (
                        <div
                            key={m.age}
                            className={`flex items-center justify-between px-5 py-4 transition-colors
                                ${isNext ? "bg-amber-50" : "hover:bg-stone-50/60"}`}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${isReached ? "bg-emerald-400" : isNext ? "bg-amber-400" : "bg-stone-200"
                                        }`}
                                />
                                <span
                                    className={`text-sm font-medium ${isReached ? "line-through text-stone-400" :
                                            isNext ? "text-amber-900 font-semibold" :
                                                "text-stone-700"
                                        }`}
                                >
                                    Turns {m.age}
                                </span>
                                {isNext && (
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                        Next
                                    </span>
                                )}
                            </div>

                            <span
                                className={`text-xs font-semibold tabular-nums ${isReached ? "text-emerald-600" :
                                        isNext ? "text-amber-700" :
                                            "text-stone-400"
                                    }`}
                            >
                                {isReached ? "✓ Reached" : `${m.daysAway.toLocaleString()} days away`}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
