import { NextResponse } from "next/server";
import { fetchFamousBirthdays } from "@/app/lib/calculator/birthday/famousBirthdays";

interface Params {
    params: Promise<{ month: string; day: string }>;
}

export async function GET(_req: Request, { params }: Params) {
    const { month, day } = await params;
    const m = Number(month);
    const d = Number(day);

    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
        return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const people = await fetchFamousBirthdays(m, d);
    return NextResponse.json({ people });
}
