

export interface BirthstoneInfo {
    month: number;
    stone: string;
    flower: string;
    stoneMeaning: string;
    flowerMeaning: string;
}

const DATA: BirthstoneInfo[] = [
    { month: 1, stone: "Garnet", flower: "Carnation", stoneMeaning: "Protection and strength", flowerMeaning: "Love and fascination" },
    { month: 2, stone: "Amethyst", flower: "Violet", stoneMeaning: "Calm and clarity", flowerMeaning: "Modesty and faithfulness" },
    { month: 3, stone: "Aquamarine", flower: "Daffodil", stoneMeaning: "Courage and serenity", flowerMeaning: "New beginnings" },
    { month: 4, stone: "Diamond", flower: "Daisy", stoneMeaning: "Strength and clarity", flowerMeaning: "Innocence and purity" },
    { month: 5, stone: "Emerald", flower: "Lily of the Valley", stoneMeaning: "Renewal and growth", flowerMeaning: "Sweetness and humility" },
    { month: 6, stone: "Pearl", flower: "Rose", stoneMeaning: "Purity and integrity", flowerMeaning: "Love and honor" },
    { month: 7, stone: "Ruby", flower: "Larkspur", stoneMeaning: "Passion and vitality", flowerMeaning: "Positivity and openness" },
    { month: 8, stone: "Peridot", flower: "Gladiolus", stoneMeaning: "Strength and healing", flowerMeaning: "Strength of character" },
    { month: 9, stone: "Sapphire", flower: "Aster", stoneMeaning: "Wisdom and loyalty", flowerMeaning: "Patience and elegance" },
    { month: 10, stone: "Opal", flower: "Marigold", stoneMeaning: "Creativity and hope", flowerMeaning: "Warmth and optimism" },
    { month: 11, stone: "Topaz", flower: "Chrysanthemum", stoneMeaning: "Strength and joy", flowerMeaning: "Loyalty and joy" },
    { month: 12, stone: "Turquoise", flower: "Narcissus", stoneMeaning: "Protection and good fortune", flowerMeaning: "Hope and renewal" },
];

export function getBirthstoneInfo(month: number): BirthstoneInfo {
    return DATA[month - 1];
}

export { DATA as BIRTHSTONES };
