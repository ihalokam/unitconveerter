"use client";

import { useAge } from "../context/AgeContext";

interface AgeHeroProps {
    dob: Date;
}

const MONTH_DISPLAY = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export default function AgeHero({ dob }: AgeHeroProps) {
    const { result } = useAge();

    const day = dob.getDate();
    const month = MONTH_DISPLAY[dob.getMonth()];
    const year = dob.getFullYear();
    const dateLabel = `${month} ${day}, ${year}`;

    return (
        <section className="max-w-3xl mx-auto px-5 pt-16 pb-10 sm:pt-24 sm:pb-14">
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 mb-5">
                Age Calculator · {dateLabel}
            </p>

            {result ? (
                <>
                    {/* Big age */}
                    <div className="flex items-end gap-4 mb-3">
                        <h1 className="text-6xl sm:text-8xl font-extrabold text-stone-900 tabular-nums leading-none">
                            {result.breakdown.years}
                        </h1>
                        <div className="pb-2">
                            <p className="text-xl font-light text-stone-400 leading-tight">years</p>
                            <p className="text-sm text-stone-400">
                                {result.breakdown.months} mo · {result.breakdown.days} d
                            </p>
                        </div>
                    </div>

                    {/* Secondary row */}
                    <p className="text-stone-500 text-base mb-2">
                        Born on{" "}
                        <span className="font-semibold text-stone-800">{dateLabel}</span>
                    </p>
                    <p className="text-sm text-stone-400">
                        {result.lifeStats.totalDays.toLocaleString()} days lived ·{" "}
                        {result.zodiac.symbol} {result.zodiac.sign} · Next birthday in{" "}
                        {result.nextBirthday.daysAway} days
                    </p>
                </>
            ) : (
                <div>
                    <h1 className="text-4xl font-bold text-stone-900 mb-2">Your age for {dateLabel}</h1>
                    <p className="text-stone-400 text-sm">Calculating…</p>
                </div>
            )}
        </section>
    );
}
