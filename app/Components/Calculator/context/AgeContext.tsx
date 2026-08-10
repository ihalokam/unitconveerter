"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
    getAgeBreakdown,
    getLifeStats,
    getPlanetAges,
    getMilestones,
    getLifespanProgress,
    getNextBirthday,
    getWeekdayBorn,
    type AgeBreakdown,
    type LifeStats,
    type PlanetAge,
    type Milestone,
} from "@/app/lib/calculator/birthday/age";
import { getZodiacSign, type ZodiacSign } from "@/app/lib/calculator/birthday/zodiac";
import {
    getChineseZodiac,
    getChineseElement,
    type ChineseZodiacSign,
} from "@/app/lib/calculator/birthday/chineseZodiac";
import { getBirthstoneInfo, type BirthstoneInfo } from "@/app/lib/calculator/birthday/birthstones";

export interface AgeResult {
    dob: Date;
    breakdown: AgeBreakdown;
    lifeStats: LifeStats;
    planets: PlanetAge[];
    milestones: Milestone[];
    lifespan: ReturnType<typeof getLifespanProgress>;
    nextBirthday: ReturnType<typeof getNextBirthday>;
    weekdayBorn: string;
    zodiac: ZodiacSign;
    chineseZodiac: ChineseZodiacSign;
    chineseElement: string;
    birthstone: BirthstoneInfo;
}

interface AgeContextValue {
    dob: Date | null;
    result: AgeResult | null;
    setDob: (dob: Date) => void;
}

const AgeContext = createContext<AgeContextValue>({
    dob: null,
    result: null,
    setDob: () => { },
});

function calculateResult(dob: Date): AgeResult {
    const now = new Date();
    return {
        dob,
        breakdown: getAgeBreakdown(dob, now),
        lifeStats: getLifeStats(dob, now),
        planets: getPlanetAges(dob, now),
        milestones: getMilestones(dob, now),
        lifespan: getLifespanProgress(dob, now),
        nextBirthday: getNextBirthday(dob, now),
        weekdayBorn: getWeekdayBorn(dob),
        zodiac: getZodiacSign(dob.getMonth() + 1, dob.getDate()),
        chineseZodiac: getChineseZodiac(dob.getFullYear()),
        chineseElement: getChineseElement(dob.getFullYear()),
        birthstone: getBirthstoneInfo(dob.getMonth() + 1),
    };
}

export function AgeProvider({ children, initialDob }: { children: ReactNode; initialDob?: Date }) {
    const searchParams = useSearchParams();
    const [dob, setDobState] = useState<Date | null>(initialDob || null);
    const [result, setResult] = useState<AgeResult | null>(initialDob ? calculateResult(initialDob) : null);

    // Initialise from ?dob= query param on mount if initialDob not provided
    useEffect(() => {
        if (!initialDob) {
            const dobParam = searchParams.get("dob");
            if (dobParam) {
                const parsed = new Date(`${dobParam}T00:00:00`);
                if (!isNaN(parsed.getTime()) && parsed <= new Date()) {
                    setDobState(parsed);
                    setResult(calculateResult(parsed));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialDob]);

    // Update state when initialDob changes
    useEffect(() => {
        if (initialDob) {
            setDobState(initialDob);
            setResult(calculateResult(initialDob));
        }
    }, [initialDob]);

    function setDob(newDob: Date) {
        setDobState(newDob);
        setResult(calculateResult(newDob));
    }

    return (
        <AgeContext.Provider value={{ dob, result, setDob }}>
            {children}
        </AgeContext.Provider>
    );
}

export function useAge(): AgeContextValue {
    const ctx = useContext(AgeContext);
    if (!ctx) throw new Error("useAge must be used inside <AgeProvider>");
    return ctx;
}
