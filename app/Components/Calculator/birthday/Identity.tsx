"use client";

import { useState } from "react";
import { useAge } from "../context/AgeContext";
import TraitsModal from "./TraitsModal";

type ModalKey = "zodiac" | "chinese" | "birthstone";

export default function Identity() {
    const { result } = useAge();
    const [openModal, setOpenModal] = useState<ModalKey | null>(null);

    if (!result) return null;
    const { zodiac, chineseZodiac, chineseElement, birthstone } = result;

    const cards: { key: ModalKey; tag: string; main: string; sub: string }[] = [
        {
            key: "zodiac",
            tag: "Zodiac Sign",
            main: `${zodiac.symbol} ${zodiac.sign}`,
            sub: `${zodiac.element} · ${zodiac.dateRange}`,
        },
        {
            key: "chinese",
            tag: "Chinese Zodiac",
            main: chineseZodiac.animal,
            sub: `${chineseElement} element · Year of the ${chineseZodiac.animal}`,
        },
        {
            key: "birthstone",
            tag: "Birthstone & Flower",
            main: birthstone.stone,
            sub: `${birthstone.flower} flower`,
        },
    ];

    return (
        <section className="max-w-3xl mx-auto px-5 py-10">
            <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-1">Identity</p>
                <h2 className="text-lg font-semibold text-stone-800">Your Cosmic Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cards.map((c) => (
                    <button
                        key={c.key}
                        onClick={() => setOpenModal(c.key)}
                        className="text-left bg-white border border-stone-100 rounded-2xl p-5
                                   hover:border-stone-300 hover:shadow-md transition-all duration-200
                                   group cursor-pointer"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">{c.tag}</p>
                        <p className="text-xl font-bold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
                            {c.main}
                        </p>
                        <p className="text-xs text-stone-500 leading-normal mb-4">{c.sub}</p>
                        <p className="text-xs font-semibold text-stone-400 group-hover:text-stone-600 transition-colors">
                            View traits →
                        </p>
                    </button>
                ))}
            </div>

            <TraitsModal
                open={openModal === "zodiac"}
                onClose={() => setOpenModal(null)}
                title={`${zodiac.sign} (${zodiac.element})`}
                description={zodiac.description}
                traits={zodiac.traits}
            />
            <TraitsModal
                open={openModal === "chinese"}
                onClose={() => setOpenModal(null)}
                title={`Year of the ${chineseZodiac.animal}`}
                description={chineseZodiac.description}
                traits={chineseZodiac.traits}
            />
            <TraitsModal
                open={openModal === "birthstone"}
                onClose={() => setOpenModal(null)}
                title={`${birthstone.stone} & ${birthstone.flower}`}
                description={`${birthstone.stone}: ${birthstone.stoneMeaning}. ${birthstone.flower}: ${birthstone.flowerMeaning}.`}
                traits={[]}
            />
        </section>
    );
}
