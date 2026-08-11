import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgeProvider } from "@/app/Components/Calculator/context/AgeContext";
import Calculator from "@/app/Components/Calculator/birthday/Calculator";
import LifespanProgress from "@/app/Components/Calculator/birthday/LifespanProgress";
import Identity from "@/app/Components/Calculator/birthday/Identity";
import CosmicAge from "@/app/Components/Calculator/birthday/CosmicAge";
import MilestoneTracker from "@/app/Components/Calculator/birthday/MilestoneTracker";
import FamousBirthdays from "@/app/Components/Calculator/birthday/FamousBirthdays";
import ShareCard from "@/app/Components/Calculator/birthday/ShareCard";
import HowWeCalculate from "@/app/Components/Calculator/birthday/HowWeCalculate";
import Faq from "@/app/Components/Calculator/birthday/Faq";
import JsonLd from "@/app/Components/Calculator/birthday/JsonLd";
import AgeHero from "@/app/Components/Calculator/birthday/AgeHero";

interface Props {
    params: Promise<{ slug: string }>;
}

const MONTHS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
];

const MONTH_DISPLAY = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function parseDateSlug(slug: string): Date | null {
    const match = slug.match(/^(\d{2})-([a-z]+)-(\d{4})$/);
    if (!match) return null;
    const [, dayStr, monthName, yearStr] = match;
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    const monthIndex = MONTHS.indexOf(monthName.toLowerCase());
    if (monthIndex === -1) return null;
    const testDate = new Date(year, monthIndex, day);
    if (
        testDate.getFullYear() !== year ||
        testDate.getMonth() !== monthIndex ||
        testDate.getDate() !== day
    ) return null;
    if (testDate > new Date()) return null;
    return testDate;
}

export function generateStaticParams() {
    return [];
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parsedDate = parseDateSlug(slug);
    if (!parsedDate) return {};
    const day = parsedDate.getDate();
    const monthName = MONTH_DISPLAY[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();
    const dateStr = `${monthName} ${day}, ${year}`;
    return {
        title: `Age Calculator for ${dateStr} — Zodiac Sign, celebrity match, Life Stats`,
        description: `How old are you if you were born on ${dateStr}? Age, zodiac sign, birthstone, celebrity match and more.`,
        alternates: { canonical: `/calculator/age-calculator/${slug}` },
    };
}

export default async function AgeCalculatorSubpage({ params }: Props) {
    const { slug } = await params;
    const parsedDate = parseDateSlug(slug);
    if (!parsedDate) notFound();

    return (
        <>
            <JsonLd />
            <Suspense fallback={null}>
                <AgeProvider initialDob={parsedDate!}>
                    {/* Result hero at top */}
                    <AgeHero dob={parsedDate!} />

                    {/* Calculator form (re-calculate) */}
                    <div className="max-w-3xl mx-auto px-5 pb-6">
                        <details className="group">
                            <summary className="text-sm font-medium text-stone-500 hover:text-stone-800 cursor-pointer list-none flex items-center gap-1.5 transition-colors">
                                <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                                Calculate a different date
                            </summary>
                            <div className="mt-4">
                                <Calculator compact />
                            </div>
                        </details>
                    </div>

                    <div className="border-t border-stone-100">
                        <LifespanProgress />
                        <Identity />
                        <CosmicAge />
                        <MilestoneTracker />
                        <FamousBirthdays />
                        <ShareCard />
                        <HowWeCalculate />
                        <Faq />
                    </div>
                </AgeProvider>
            </Suspense>
        </>
    );
}
