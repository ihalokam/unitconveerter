export interface ZodiacSign {
    sign: string;
    element: "Fire" | "Earth" | "Air" | "Water";
    symbol: string;
    dateRange: string;
    traits: string[];
    description: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
    {
        sign: "Capricorn", element: "Earth", symbol: "\u2651", dateRange: "Dec 22 \u2013 Jan 19",
        traits: ["Disciplined", "Patient", "Ambitious", "Practical", "Reserved"],
        description: "Capricorns are known for their discipline and long-term thinking, steadily working toward goals others might abandon.",
    },
    {
        sign: "Aquarius", element: "Air", symbol: "\u2652", dateRange: "Jan 20 \u2013 Feb 18",
        traits: ["Independent", "Original", "Humanitarian", "Inventive", "Detached"],
        description: "Aquarians tend to think in unconventional ways, valuing individuality and progress over tradition.",
    },
    {
        sign: "Pisces", element: "Water", symbol: "\u2653", dateRange: "Feb 19 \u2013 Mar 20",
        traits: ["Compassionate", "Intuitive", "Artistic", "Gentle", "Dreamy"],
        description: "Pisces are deeply empathetic and imaginative, often drawn to creative or caring pursuits.",
    },
    {
        sign: "Aries", element: "Fire", symbol: "\u2648", dateRange: "Mar 21 \u2013 Apr 19",
        traits: ["Bold", "Energetic", "Competitive", "Direct", "Impulsive"],
        description: "Aries leads with confidence and enthusiasm, often the first to act on a new idea.",
    },
    {
        sign: "Taurus", element: "Earth", symbol: "\u2649", dateRange: "Apr 20 \u2013 May 20",
        traits: ["Reliable", "Patient", "Grounded", "Devoted", "Stubborn"],
        description: "Taurus values stability and comfort, building things that are meant to last.",
    },
    {
        sign: "Gemini", element: "Air", symbol: "\u264A", dateRange: "May 21 \u2013 Jun 20",
        traits: ["Curious", "Adaptable", "Witty", "Communicative", "Restless"],
        description: "Geminis thrive on variety and conversation, quick to pick up new ideas and skills.",
    },
    {
        sign: "Cancer", element: "Water", symbol: "\u264B", dateRange: "Jun 21 \u2013 Jul 22",
        traits: ["Nurturing", "Loyal", "Intuitive", "Protective", "Sensitive"],
        description: "Cancer is deeply attuned to emotion and home, often the caretaker of a friend group or family.",
    },
    {
        sign: "Leo", element: "Fire", symbol: "\u264C", dateRange: "Jul 23 \u2013 Aug 22",
        traits: ["Confident", "Generous", "Warm", "Dramatic", "Proud"],
        description: "Leos carry natural warmth and presence, often drawn to leadership and the spotlight.",
    },
    {
        sign: "Virgo", element: "Earth", symbol: "\u264D", dateRange: "Aug 23 \u2013 Sep 22",
        traits: ["Analytical", "Precise", "Modest", "Diligent", "Critical"],
        description: "Virgos pay close attention to detail, finding satisfaction in doing things properly.",
    },
    {
        sign: "Libra", element: "Air", symbol: "\u264E", dateRange: "Sep 23 \u2013 Oct 22",
        traits: ["Diplomatic", "Fair-minded", "Social", "Charming", "Indecisive"],
        description: "Libra seeks balance and harmony, often skilled at seeing multiple sides of a situation.",
    },
    {
        sign: "Scorpio", element: "Water", symbol: "\u264F", dateRange: "Oct 23 \u2013 Nov 21",
        traits: ["Intense", "Passionate", "Resourceful", "Private", "Determined"],
        description: "Scorpio brings depth and focus to everything, rarely doing anything halfway.",
    },
    {
        sign: "Sagittarius", element: "Fire", symbol: "\u2650", dateRange: "Nov 22 \u2013 Dec 21",
        traits: ["Adventurous", "Optimistic", "Honest", "Philosophical", "Restless"],
        description: "Sagittarius is drawn to exploration, ideas, and honesty, often the one planning the next trip.",
    },
];

export function getZodiacSign(month: number, day: number): ZodiacSign {
    const cutoffs: [number, number][] = [
        [1, 19], [2, 18], [3, 20], [4, 19], [5, 20], [6, 20],
        [7, 22], [8, 22], [9, 22], [10, 22], [11, 21], [12, 21],
    ];
    for (let i = 0; i < cutoffs.length; i++) {
        const [m, d] = cutoffs[i];
        if (month < m || (month === m && day <= d)) return ZODIAC_SIGNS[i];
    }
    return ZODIAC_SIGNS[0]; // Dec 22-31 -> Capricorn
}

export { ZODIAC_SIGNS };
