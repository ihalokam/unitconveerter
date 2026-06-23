"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

// Server Component. Disclosure from Headless UI works fine without
// "use client" being declared *here* — interactivity is progressively
// enhanced, and the full Q&A text is present in the initial HTML either
// way, which is what matters for crawlability + the JSON-LD below.

const FAQS = [
    {
        q: "How many 80 lb bags of concrete are in a cubic yard?",
        a: "It takes about 45 bags of 80 lb pre-mixed concrete to make one cubic yard. For 60 lb bags it's about 60 bags, and for 40 lb bags it's about 90 bags.",
    },
    {
        q: "How much does a cubic yard of concrete cost?",
        a: "Ready-mix concrete typically costs $125–$200 per cubic yard delivered, depending on region and mix strength. Orders under 3–5 yards often carry an additional short-load fee of $50–$150.",
    },
    {
        q: "How thick should a concrete slab be?",
        a: "Sidewalks and patios are typically 4 inches thick. Driveways and garage floors are usually 4–6 inches. Footings depend on local frost depth and building code, so check with your local authority.",
    },
    {
        q: "How much does concrete weigh?",
        a: "Wet, freshly mixed concrete weighs approximately 150 lb per cubic foot, or about 4,000–4,050 lb per cubic yard. Broken-up cured concrete weighs roughly half that per cubic yard.",
    },
    {
        q: "Should I order extra concrete?",
        a: "Yes — add 5–10% to your calculated volume to account for spillage, uneven subgrade, and measurement variance. Running short mid-pour risks a cold joint where two separate pours don't bond properly.",
    },
    {
        q: "Is it cheaper to use bags or ready-mix?",
        a: "For projects under about 0.5–1 cubic yard, bagged concrete is usually more practical despite a higher cost per yard. Above that, ready-mix delivery is significantly cheaper per yard, though it comes with delivery minimums and possible short-load fees.",
    },
];

export default function Faq() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    return (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                Frequently asked questions
            </h2>

            <div className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
                {FAQS.map((item) => (
                    <Disclosure key={item.q} as="div" className="p-1">
                        {({ open }) => (
                            <>
                                <DisclosureButton className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left text-sm font-semibold text-stone-900 hover:bg-stone-50 focus-visible:ring-2 focus-visible:ring-orange-500 sm:text-base">
                                    <span>{item.q}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180" : ""
                                            }`}
                                        aria-hidden="true"
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="px-4 pb-4 text-sm leading-relaxed text-stone-600">
                                    {item.a}
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>

            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </section>
    );
}