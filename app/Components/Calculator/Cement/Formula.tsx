// Server Component. This block is intentionally plain HTML/text so
// crawlers get the formula + worked example without any client JS —
// it is the highest-value snippet target on the page.

const STANDARD_THICKNESS = [
    { use: "Sidewalks / walkways", thickness: "4 in (10 cm)" },
    { use: "Driveways", thickness: "4–6 in (10–15 cm)" },
    { use: "Garage floors", thickness: "4–6 in (10–15 cm)" },
    { use: "Patios", thickness: "4 in (10 cm)" },
    { use: "Footings", thickness: "Varies by frost depth & local code" },
];

export default function Formula() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                How to calculate how much concrete you need
            </h2>

            <p className="mt-3 max-w-3xl text-stone-600">
                To find the volume of concrete for a slab, footing, or wall, multiply
                length by width by thickness, then convert to cubic yards.
            </p>

            <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-5 font-mono text-sm leading-relaxed text-stone-800 sm:text-base">
                <p>Volume (cu ft) = Length (ft) × Width (ft) × Thickness (ft)</p>
                <p className="mt-1">Cubic Yards = Volume (cu ft) ÷ 27</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-200 p-5">
                    <h3 className="font-semibold text-stone-900">Worked example</h3>
                    <p className="mt-2 text-sm text-stone-600">
                        A 10 ft × 10 ft slab poured 4 inches thick:
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
                        <li>10 × 10 × (4 ÷ 12) = 33.3 cu ft</li>
                        <li>33.3 ÷ 27 = 1.24 cu yd</li>
                        <li>With 10% waste added: ≈ 1.36 cu yd</li>
                        <li>That&apos;s about 56–62 standard 80 lb bags</li>
                    </ul>
                </div>

                <div className="rounded-xl border border-stone-200 p-5">
                    <h3 className="font-semibold text-stone-900">
                        Irregular & sloped areas
                    </h3>
                    <p className="mt-2 text-sm text-stone-600">
                        Break an irregular shape into rectangles or circles, calculate
                        each section separately, then add the volumes together.
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                        For a sloped slab, use the average thickness:{" "}
                        <span className="font-medium text-stone-800">
                            (min thickness + max thickness) ÷ 2
                        </span>
                        .
                    </p>
                </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-left text-sm">
                    <caption className="sr-only">
                        Standard concrete slab thickness by project type
                    </caption>
                    <thead className="bg-stone-100 text-stone-600">
                        <tr>
                            <th scope="col" className="px-4 py-2.5 font-semibold">
                                Project
                            </th>
                            <th scope="col" className="px-4 py-2.5 font-semibold">
                                Standard thickness
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        {STANDARD_THICKNESS.map((row) => (
                            <tr key={row.use}>
                                <td className="px-4 py-2.5 text-stone-800">{row.use}</td>
                                <td className="px-4 py-2.5 text-stone-600">
                                    {row.thickness}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-xs text-stone-400">
                Always add 5–10% extra to account for spillage, uneven subgrade, and
                measurement variance — order short and a cold joint can compromise
                the pour.
            </p>
        </section>
    );
}