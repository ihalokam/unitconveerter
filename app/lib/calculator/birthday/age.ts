export interface AgeBreakdown {
    years: number;
    months: number;
    days: number;
}

export interface LifeStats {
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    heartbeats: number;
    fullMoons: number;
    leapYears: number;
    lifePathNumber: number;
}

export interface PlanetAge {
    name: string;
    earthDaysPerYear: number;
    age: number;
}

export interface Milestone {
    age: number;
    date: Date;
    reached: boolean;
    daysAway: number;
}

const PLANETS: { name: string; earthDaysPerYear: number }[] = [
    { name: "Mercury", earthDaysPerYear: 87.97 },
    { name: "Venus", earthDaysPerYear: 224.7 },
    { name: "Earth", earthDaysPerYear: 365.25 },
    { name: "Mars", earthDaysPerYear: 686.98 },
    { name: "Jupiter", earthDaysPerYear: 4332.59 },
    { name: "Saturn", earthDaysPerYear: 10759.22 },
    { name: "Uranus", earthDaysPerYear: 30688.5 },
    { name: "Neptune", earthDaysPerYear: 60182 },
];

const DEFAULT_MILESTONES = [13, 16, 18, 21, 25, 30, 40, 50, 65, 75, 100];

function daysBetween(a: Date, b: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((b.getTime() - a.getTime()) / msPerDay);
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getAgeBreakdown(dob: Date, now: Date = new Date()): AgeBreakdown {
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}

export function getWeekdayBorn(dob: Date): string {
    const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return WEEKDAYS[dob.getDay()];
}

export function getNextBirthday(dob: Date, now: Date = new Date()): { date: Date; daysAway: number } {
    let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (next <= now) next = new Date(now.getFullYear() + 1, dob.getMonth(), dob.getDate());
    const daysAway = daysBetween(now, next);
    return { date: next, daysAway };
}

export function getLifeStats(dob: Date, now: Date = new Date()): LifeStats {
    const totalDays = daysBetween(dob, now);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const heartbeats = totalMinutes * 75;
    const fullMoons = Math.floor(totalDays / 29.53);

    let leapYears = 0;
    for (let y = dob.getFullYear(); y <= now.getFullYear(); y++) {
        if (isLeapYear(y)) leapYears++;
    }

    return {
        totalDays,
        totalHours,
        totalMinutes,
        heartbeats,
        fullMoons,
        leapYears,
        lifePathNumber: getLifePathNumber(dob),
    };
}

export function getLifePathNumber(dob: Date): number {
    const digits = `${dob.getMonth() + 1}${dob.getDate()}${dob.getFullYear()}`;
    let sum = digits.split("").reduce((a, c) => a + Number(c), 0);
    while (sum > 9 && sum !== 11 && sum !== 22) {
        sum = String(sum).split("").reduce((a, c) => a + Number(c), 0);
    }
    return sum;
}

export function getPlanetAges(dob: Date, now: Date = new Date()): PlanetAge[] {
    const totalDays = daysBetween(dob, now);
    return PLANETS.map((p) => ({
        ...p,
        age: Number((totalDays / p.earthDaysPerYear).toFixed(1)),
    }));
}

export function getMilestones(
    dob: Date,
    now: Date = new Date(),
    ages: number[] = DEFAULT_MILESTONES
): Milestone[] {
    return ages.map((age) => {
        const date = new Date(dob.getFullYear() + age, dob.getMonth(), dob.getDate());
        const reached = date <= now;
        const daysAway = reached ? 0 : daysBetween(now, date);
        return { age, date, reached, daysAway };
    });
}

export function getLifespanProgress(
    dob: Date,
    now: Date = new Date(),
    lifespanYears: number = 80
) {
    const daysLived = daysBetween(dob, now);
    const daysExpected = Math.round(lifespanYears * 365.25);
    const monthsLived =
        (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
    const monthsExpected = lifespanYears * 12;
    const percent = Math.min(100, (daysLived / daysExpected) * 100);

    return {
        daysLived,
        daysExpected,
        monthsLived,
        monthsExpected,
        percent: Number(percent.toFixed(2)),
    };
}
