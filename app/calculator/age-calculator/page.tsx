import { Suspense } from "react";
import type { Metadata } from "next";
import { AgeProvider } from "@/app/Components/Calculator/context/AgeContext";
import Calculator from "@/app/Components/Calculator/birthday/Calculator";
import HowWeCalculate from "@/app/Components/Calculator/birthday/HowWeCalculate";
import Faq from "@/app/Components/Calculator/birthday/Faq";
import JsonLd from "@/app/Components/Calculator/birthday/JsonLd";

export const metadata: Metadata = {
    title: "Age Calculator — Find Your Exact Age, Zodiac Sign & Life Stats",
    description:
        "Calculate your exact age, zodiac sign, Chinese zodiac, birthstone, lifespan progress, and famous people who share your birthday.",
    openGraph: {
        title: "Age Calculator — Find Your Exact Age, Zodiac Sign & Life Stats",
        description:
            "Calculate your exact age, zodiac sign, Chinese zodiac, birthstone, lifespan progress, and famous people who share your birthday.",
        images: [],
    },
    twitter: {
        card: "summary",
        title: "Age Calculator — Find Your Exact Age, Zodiac Sign & Life Stats",
        description:
            "Calculate your exact age, zodiac sign, Chinese zodiac, birthstone, lifespan progress, and famous people who share your birthday.",
        images: [],
    },
};

export default function AgeCalculatorPage() {
    return (
        <>
            <JsonLd />
            <Suspense fallback={null}>
                <AgeProvider>
                    <Calculator />
                    <div className="border-t border-stone-100">
                        <HowWeCalculate />
                        <Faq />
                    </div>
                </AgeProvider>
            </Suspense>
        </>
    );
}