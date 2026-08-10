"use client";

import { useAge } from "../context/AgeContext";

export default function CosmicAge() {
    const { result } = useAge();
    if (!result) return null;

    const dotColors: Record<string, string> = {
        Mercury: "bg-stone-400",
        Venus: "bg-amber-400",
        Earth: "bg-blue-400",
        Mars: "bg-red-400",
        Jupiter: "bg-orange-400",
        Saturn: "bg-yellow-500",
        Uranus: "bg-cyan-400",
        Neptune: "bg-indigo-400",
    };

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Solar System</p>
                <h2 className="text-lg font-semibold text-stone-800">Your Age Across Planets</h2>
            </div>

            <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-stone-100 bg-stone-50/60">
                            <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-stone-400">Planet</th>
                            <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-stone-400">Year Length</th>
                            <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-stone-400">Your Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.planets.map((p, i) => (
                            <tr
                                key={p.name}
                                className={`border-b border-stone-50 hover:bg-stone-50/60 transition-colors ${i === result.planets.length - 1 ? "border-b-0" : ""}`}
                            >
                                <td className="px-5 py-3.5 text-left text-stone-800 font-medium flex items-center gap-2.5">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[p.name] ?? "bg-stone-400"}`} />
                                    {p.name}
                                </td>
                                <td className="px-5 py-3.5 text-left text-stone-500">
                                    {p.earthDaysPerYear < 365
                                        ? `${p.earthDaysPerYear.toFixed(0)} days`
                                        : `${(p.earthDaysPerYear / 365.25).toFixed(1)} Earth yrs`}
                                </td>
                                <td className="px-5 py-3.5 text-right font-mono font-semibold text-stone-800 tabular-nums">
                                    {p.age}
                                    <span className="text-stone-400 font-normal text-xs ml-1">orbits</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
