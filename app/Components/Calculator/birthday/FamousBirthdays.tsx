"use client";

import { useEffect, useState } from "react";
import { useAge } from "../context/AgeContext";
import type { FamousPerson } from "../lib/famousBirthdays";

export default function FamousBirthdays() {
    const { result } = useAge();
    const [people, setPeople] = useState<FamousPerson[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!result) return;
        const month = result.dob.getMonth() + 1;
        const day = result.dob.getDate();
        setLoading(true);
        fetch(`/api/famous-birthdays/${month}/${day}`)
            .then((r) => r.json())
            .then((data) => setPeople(data.people ?? []))
            .catch(() => setPeople([]))
            .finally(() => setLoading(false));
    }, [result]);

    if (!result) return null;

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Birthdays</p>
                <h2 className="text-lg font-semibold text-stone-800">Famous People Born on This Day</h2>
            </div>

            <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                {loading && (
                    <div className="flex items-center gap-3 py-6 text-stone-400">
                        <div className="w-4 h-4 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
                        <span className="text-sm">Loading famous birthdays…</span>
                    </div>
                )}

                {!loading && people && people.length === 0 && (
                    <p className="text-sm text-stone-400 py-4">No famous birthdays found for this date.</p>
                )}

                {!loading && people && people.length > 0 && (
                    <ul className="divide-y divide-stone-50">
                        {people.map((p) => (
                            <li key={`${p.name}-${p.year}`} className="flex gap-4 items-start py-4 first:pt-0 last:pb-0 group">
                                {p.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={p.thumbnail}
                                        alt={p.name}
                                        className="w-10 h-10 rounded-full object-cover border border-stone-100 shrink-0 mt-0.5"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center font-semibold text-sm border border-stone-100 shrink-0 mt-0.5">
                                        {p.name.slice(0, 1)}
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-stone-800 flex items-center gap-2 flex-wrap">
                                        <span className="group-hover:text-amber-700 transition-colors">{p.name}</span>
                                        {p.year && (
                                            <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                                                b. {p.year}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{p.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
