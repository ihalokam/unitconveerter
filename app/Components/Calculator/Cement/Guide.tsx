import { Package, Truck, ThermometerSun, Snowflake } from "lucide-react";

// Server Component — fully static, crawlable copy.

export default function Guide() {
    return (
        <section className="border-y border-stone-200 bg-stone-50">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <h2 className="font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                    Bags or ready-mix? And what strength do you need?
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-stone-200 bg-white p-5">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                                <Package className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h3 className="font-semibold text-stone-900">
                                Bagged concrete
                            </h3>
                        </div>
                        <p className="mt-3 text-sm text-stone-600">
                            Best under roughly 0.5–1 cubic yard — small patios, repairs,
                            post holes, and steps. Higher cost per yard, but no delivery
                            minimum or short-load fee, and you mix only what you need.
                        </p>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-white p-5">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                                <Truck className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h3 className="font-semibold text-stone-900">
                                Ready-mix delivery
                            </h3>
                        </div>
                        <p className="mt-3 text-sm text-stone-600">
                            Far cheaper per yard once you&apos;re above ~1 cubic yard —
                            driveways, garage floors, larger patios. Most suppliers have a
                            minimum order and charge a short-load fee under 3–5 yards.
                        </p>
                    </div>
                </div>

                <h3 className="mt-10 font-display text-xl font-bold text-stone-900">
                    Choosing mix strength &amp; climate considerations
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex gap-3 rounded-xl border border-stone-200 bg-white p-5">
                        <ThermometerSun
                            className="h-5 w-5 shrink-0 text-orange-600"
                            aria-hidden="true"
                        />
                        <div>
                            <p className="font-medium text-stone-900">
                                Mild climates (no hard freezes)
                            </p>
                            <p className="mt-1 text-sm text-stone-600">
                                3,000–4,000 PSI mix without air entrainment is generally
                                adequate for residential slabs and driveways.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 rounded-xl border border-stone-200 bg-white p-5">
                        <Snowflake
                            className="h-5 w-5 shrink-0 text-orange-600"
                            aria-hidden="true"
                        />
                        <div>
                            <p className="font-medium text-stone-900">
                                Freeze-thaw climates
                            </p>
                            <p className="mt-1 text-sm text-stone-600">
                                Use 4,000+ PSI with air entrainment to resist surface
                                scaling from freeze-thaw cycles and de-icing salt. Ask your
                                supplier to confirm air entrainment for exterior pours.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="mt-10 font-display text-xl font-bold text-stone-900">
                    Pouring &amp; curing basics
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-stone-600 sm:grid-cols-2">
                    <li className="rounded-lg bg-white border border-stone-200 p-4">
                        Pour when air temperature is between 40°F and 90°F (4–32°C) with
                        no rain forecast for 24 hours.
                    </li>
                    <li className="rounded-lg bg-white border border-stone-200 p-4">
                        Concrete reaches roughly 90% of its final strength after about 4
                        weeks of curing.
                    </li>
                    <li className="rounded-lg bg-white border border-stone-200 p-4">
                        Keep the surface damp for the first 7 days — cover with plastic
                        sheeting or apply a curing compound right after finishing.
                    </li>
                    <li className="rounded-lg bg-white border border-stone-200 p-4">
                        In hot weather, schedule pours for early morning to extend
                        working time before the mix stiffens.
                    </li>
                </ul>
            </div>
        </section>
    );
}