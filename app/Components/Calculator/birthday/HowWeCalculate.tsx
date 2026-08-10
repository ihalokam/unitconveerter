const steps = [
    {
        title: "Time & Calendar Math",
        description:
            "Compares your exact birth date to today, giving you a precise breakdown in years, months, and days.",
    },
    {
        title: "Zodiac & Element",
        description:
            "Matches your birthday against the tropical zodiac calendar and your Chinese birth year to surface your signs and element.",
    },
    {
        title: "Biological Estimates",
        description:
            "Estimates total heartbeats and breaths by multiplying your lived days by resting-rate averages.",
    },
    {
        title: "Planetary Orbits",
        description:
            "Divides your lived days by each planet's orbital period to calculate your interplanetary age.",
    },
];

export default function HowWeCalculate() {
    return (
        <section className="max-w-3xl mx-auto px-5 py-12">
            <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Methodology</p>
                <h2 className="text-lg font-semibold text-stone-800">How the Calculations Work</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {steps.map((s, i) => (
                    <div key={s.title} className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-bold font-mono text-stone-400 bg-stone-100 rounded-lg w-7 h-7 flex items-center justify-center">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-sm font-semibold text-stone-800">{s.title}</h3>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">{s.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
