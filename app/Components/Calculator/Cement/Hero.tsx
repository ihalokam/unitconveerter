import { Calculator, Layers, Truck } from "lucide-react";

// Server Component — no "use client" here on purpose.
// This is the primary SSR payload for the "concrete calculator" query:
// the H1, the supporting copy, and the trust signals all need to be
// crawlable without waiting on any client JS.

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-stone-200 bg-stone-50">
            {/* subtle aggregate texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #1c1b1a 1px, transparent 0)",
                    backgroundSize: "18px 18px",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
                <div className="flex items-center gap-2 text-sm font-medium text-orange-700">
                    <span className="inline-flex h-1.5 w-6 rounded-full bg-orange-600" aria-hidden="true" />
                    Free &amp; instant
                </div>

                <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
                    Concrete Calculator
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
                    Work out how many cubic yards, cubic meters, or bags of concrete you
                    need for a slab, footing, post hole, or column — plus an instant
                    cost comparison between bagged mix and ready-mix delivery.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Feature
                        icon={Calculator}
                        title="Every shape"
                        desc="Slabs, footings, columns, circular pads & stairs"
                    />
                    <Feature
                        icon={Layers}
                        title="Bags or yards"
                        desc="40, 60 & 80 lb bag counts, or cubic yard orders"
                    />
                    <Feature
                        icon={Truck}
                        title="Cost compare"
                        desc="See bagged DIY vs. ready-mix delivered cost"
                    />
                </div>
            </div>
        </section>
    );
}

function Feature({
    icon: Icon,
    title,
    desc,
}: {
    icon: typeof Calculator;
    title: string;
    desc: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white/60 p-3.5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
                <p className="text-sm font-semibold text-stone-900">{title}</p>
                <p className="text-sm text-stone-500">{desc}</p>
            </div>
        </div>
    );
}