export interface FamousPerson {
    name: string;
    description: string;
    year?: number;
    thumbnail?: string;
}

interface WikiOnThisDayResponse {
    births: {
        text: string;
        year: number;
        pages?: { title: string; extract?: string; thumbnail?: { source: string } }[];
    }[];
}

// Shared by the API route (for the interactive calculator) and the static
// /birthday/[month-day] pages, so both sources stay in sync.
export async function fetchFamousBirthdays(
    month: number,
    day: number,
    limit: number = 6
): Promise<FamousPerson[]> {
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${mm}/${dd}`;

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "standardconverter-age-calculator/1.0" },
            next: { revalidate: 60 * 60 * 24 * 30 }, // 30 days
        });
        if (!res.ok) return [];
        const data: WikiOnThisDayResponse = await res.json();

        return (data.births || [])
            .filter((b) => b.year < 2005)
            .sort((a, b) => b.year - a.year)
            .slice(0, limit)
            .map((b) => {
                const page = b.pages?.[0];
                return {
                    name: page?.title?.replace(/_/g, " ") ?? b.text.split(",")[0],
                    description: page?.extract ?? b.text,
                    year: b.year,
                    thumbnail: page?.thumbnail?.source,
                };
            });
    } catch {
        return [];
    }
}
