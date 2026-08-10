export interface ChineseZodiacSign {
    animal: string;
    traits: string[];
    description: string;
}

const ANIMALS = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
];

const ELEMENTS = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];

const TRAITS: Record<string, string[]> = {
    Rat: ["Resourceful", "Quick-witted", "Ambitious", "Charming", "Restless"],
    Ox: ["Diligent", "Dependable", "Strong-willed", "Patient", "Stubborn"],
    Tiger: ["Brave", "Confident", "Competitive", "Unpredictable", "Charismatic"],
    Rabbit: ["Gentle", "Cautious", "Elegant", "Kind", "Reserved"],
    Dragon: ["Confident", "Energetic", "Ambitious", "Charismatic", "Impatient"],
    Snake: ["Wise", "Intuitive", "Private", "Elegant", "Determined"],
    Horse: ["Energetic", "Independent", "Adventurous", "Sociable", "Impulsive"],
    Goat: ["Gentle", "Creative", "Empathetic", "Shy", "Peace-loving"],
    Monkey: ["Clever", "Playful", "Curious", "Inventive", "Mischievous"],
    Rooster: ["Observant", "Hardworking", "Confident", "Honest", "Blunt"],
    Dog: ["Loyal", "Honest", "Protective", "Fair", "Cautious"],
    Pig: ["Generous", "Diligent", "Compassionate", "Easygoing", "Trusting"],
};

const DESCRIPTIONS: Record<string, string> = {
    Rat: "Rats are sharp and adaptable, often finding clever ways around a problem others get stuck on.",
    Ox: "Ox are steady and hardworking, trusted for following through on what they commit to.",
    Tiger: "Tigers move with confidence and courage, often taking the lead in uncertain situations.",
    Rabbit: "Rabbits are diplomatic and composed, preferring careful decisions over impulsive ones.",
    Dragon: "Dragons carry natural charisma and ambition, drawn to bold goals and big ideas.",
    Snake: "Snakes are perceptive and self-contained, often the quiet strategist in the room.",
    Horse: "Horses are free-spirited and driven, happiest when there's room to move and explore.",
    Goat: "Goats are gentle and imaginative, drawn to art, harmony, and close relationships.",
    Monkey: "Monkeys are witty and inventive, quick to find playful solutions to serious problems.",
    Rooster: "Roosters are precise and confident, unafraid to say what they've observed.",
    Dog: "Dogs are loyal and principled, the ones people trust to keep their word.",
    Pig: "Pigs are warm and generous, often the most easygoing and trusting person in a group.",
};

export function getChineseZodiac(year: number): ChineseZodiacSign {
    const idx = ((year - 4) % 12 + 12) % 12;
    const animal = ANIMALS[idx];
    return { animal, traits: TRAITS[animal], description: DESCRIPTIONS[animal] };
}

export function getChineseElement(year: number): string {
    return ELEMENTS[((year % 10) + 10) % 10];
}
