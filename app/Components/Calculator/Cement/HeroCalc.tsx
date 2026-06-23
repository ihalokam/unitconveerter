"use client";

import { useMemo, useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import {
    Square,
    Box,
    CircleDot,
    Disc,
    ArrowUpDown,
    Info,
    Download,
} from "lucide-react";
import jsPDF from "jspdf";

type ShapeKey = "slab" | "footing" | "round" | "circular";

const SHAPES: { key: ShapeKey; label: string; icon: typeof Square }[] = [
    { key: "slab", label: "Slab / Wall", icon: Square },
    { key: "footing", label: "Footing", icon: Box },
    { key: "round", label: "Round Column", icon: Disc },
    { key: "circular", label: "Circular Slab", icon: CircleDot },
];

const BAG_YIELD_CU_FT: Record<40 | 50 | 60 | 80, number> = {
    40: 0.3,
    50: 0.375,
    60: 0.45,
    80: 0.6,
};

function classNames(...c: (string | false | undefined)[]) {
    return c.filter(Boolean).join(" ");
}

export default function HeroCalc() {
    const [shape, setShape] = useState<ShapeKey>("slab");
    const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

    const [length, setLength] = useState("10");
    const [width, setWidth] = useState("10");
    const [thicknessIn, setThicknessIn] = useState("4");
    const [diameterIn, setDiameterIn] = useState("12");
    const [heightFt, setHeightFt] = useState("6");

    const [quantity, setQuantity] = useState("1");
    const [waste, setWaste] = useState(10);

    const [pricePerYard, setPricePerYard] = useState("150");
    const [pricePerBag, setPricePerBag] = useState("6.5");

    const isMetric = unit === "metric";

    const result = useMemo(() => {
        const qty = Math.max(1, parseFloat(quantity) || 1);
        let cuFt = 0;

        const L = parseFloat(length) || 0;
        const W = parseFloat(width) || 0;
        const T = parseFloat(thicknessIn) || 0;
        const D = parseFloat(diameterIn) || 0;
        const H = parseFloat(heightFt) || 0;

        if (!isMetric) {
            switch (shape) {
                case "slab":
                case "footing":
                    cuFt = L * W * (T / 12);
                    break;
                case "round": {
                    const rFt = D / 2 / 12;
                    cuFt = Math.PI * rFt * rFt * H;
                    break;
                }
                case "circular": {
                    const rFt = D / 2 / 12;
                    cuFt = Math.PI * rFt * rFt * (T / 12);
                    break;
                }
            }
        } else {
            let cuM = 0;
            switch (shape) {
                case "slab":
                case "footing":
                    cuM = L * W * (T / 100);
                    break;
                case "round": {
                    const rM = D / 2 / 100;
                    cuM = Math.PI * rM * rM * H;
                    break;
                }
                case "circular": {
                    const rM = D / 2 / 100;
                    cuM = Math.PI * rM * rM * (T / 100);
                    break;
                }
            }
            cuFt = cuM * 35.3147;
        }

        cuFt = cuFt * qty;
        const cuFtWithWaste = cuFt * (1 + waste / 100);
        const cuYd = cuFtWithWaste / 27;
        const cuM = cuFtWithWaste / 35.3147;
        const weightLbs = cuFtWithWaste * 150;
        const weightTons = weightLbs / 2000;

        const bags = (
            Object.keys(BAG_YIELD_CU_FT) as unknown as (40 | 50 | 60 | 80)[]
        ).reduce(
            (acc, size) => {
                acc[size] = Math.ceil(cuFtWithWaste / BAG_YIELD_CU_FT[size]);
                return acc;
            },
            {} as Record<40 | 50 | 60 | 80, number>
        );

        const costReadyMix = cuYd * (parseFloat(pricePerYard) || 0);
        const costBagged80 = bags[80] * (parseFloat(pricePerBag) || 0);

        return {
            cuFt: cuFtWithWaste,
            cuYd,
            cuM,
            weightLbs,
            weightTons,
            bags,
            costReadyMix,
            costBagged80,
        };
    }, [
        shape,
        isMetric,
        length,
        width,
        thicknessIn,
        diameterIn,
        heightFt,
        quantity,
        waste,
        pricePerYard,
        pricePerBag,
    ]);

    const shapeLabel = SHAPES.find((s) => s.key === shape)?.label ?? "Slab";

    const handleDownloadPdf = () => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 48;
        let y = 56;

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(28, 27, 26);
        doc.text("Concrete Calculator Results", margin, y);

        y += 18;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(120, 113, 108);
        doc.text(
            `Generated ${new Date().toLocaleDateString()} \u2022 ${shapeLabel} \u2022 ${isMetric ? "Metric" : "Imperial"
            } units`,
            margin,
            y
        );

        // accent rule (ruler motif, echoes the site's signature edge)
        y += 14;
        doc.setDrawColor(213, 87, 43);
        doc.setLineWidth(2);
        doc.line(margin, y, pageWidth - margin, y);

        // Input summary
        y += 28;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(28, 27, 26);
        doc.text("Inputs", margin, y);

        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(68, 64, 60);

        const inputLines: string[] = [];
        if (shape === "slab" || shape === "footing") {
            inputLines.push(
                `Length: ${length} ${isMetric ? "m" : "ft"}`,
                `Width: ${width} ${isMetric ? "m" : "ft"}`,
                `Thickness: ${thicknessIn} ${isMetric ? "cm" : "in"}`
            );
        } else if (shape === "round") {
            inputLines.push(
                `Diameter: ${diameterIn} ${isMetric ? "cm" : "in"}`,
                `Height: ${heightFt} ${isMetric ? "m" : "ft"}`
            );
        } else if (shape === "circular") {
            inputLines.push(
                `Diameter: ${diameterIn} ${isMetric ? "cm" : "in"}`,
                `Thickness: ${thicknessIn} ${isMetric ? "cm" : "in"}`
            );
        }
        inputLines.push(`Quantity: ${quantity}`, `Waste factor: ${waste}%`);

        inputLines.forEach((line) => {
            doc.text(`\u2022 ${line}`, margin, y);
            y += 15;
        });

        // Volume results
        y += 14;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(28, 27, 26);
        doc.text("Volume needed", margin, y);

        y += 18;
        const volumeBoxes: [string, string][] = [
            [result.cuYd.toFixed(2), "cubic yards"],
            [result.cuFt.toFixed(1), "cubic feet"],
            [result.cuM.toFixed(2), "cubic meters"],
            [result.weightTons.toFixed(2), "tons"],
        ];
        const boxW = (pageWidth - margin * 2 - 24) / 4;
        volumeBoxes.forEach(([val, label], i) => {
            const x = margin + i * (boxW + 8);
            doc.setFillColor(28, 27, 26);
            doc.roundedRect(x, y, boxW, 50, 6, 6, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(15);
            doc.text(val, x + boxW / 2, y + 22, { align: "center" });
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(214, 211, 209);
            doc.text(label, x + boxW / 2, y + 36, { align: "center" });
        });

        // Bag breakdown
        y += 76;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(28, 27, 26);
        doc.text("Bags needed", margin, y);

        y += 18;
        const bagSizes: (40 | 50 | 60 | 80)[] = [40, 50, 60, 80];
        const bagBoxW = (pageWidth - margin * 2 - 24) / 4;
        bagSizes.forEach((size, i) => {
            const x = margin + i * (bagBoxW + 8);
            doc.setDrawColor(214, 211, 209);
            doc.setLineWidth(1);
            doc.roundedRect(x, y, bagBoxW, 44, 6, 6, "S");
            doc.setTextColor(28, 27, 26);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(String(result.bags[size]), x + bagBoxW / 2, y + 20, {
                align: "center",
            });
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(120, 113, 108);
            doc.text(`${size} lb bags`, x + bagBoxW / 2, y + 33, {
                align: "center",
            });
        });

        // Cost estimate
        y += 66;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(28, 27, 26);
        doc.text("Cost estimate", margin, y);

        y += 16;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(68, 64, 60);
        doc.text(
            `\u2022 Ready-mix delivered (@ $${pricePerYard}/cu yd): ~$${result.costReadyMix.toFixed(
                0
            )}`,
            margin,
            y
        );
        y += 15;
        doc.text(
            `\u2022 Bagged DIY, 80 lb bags (@ $${pricePerBag}/bag): ~$${result.costBagged80.toFixed(
                0
            )}`,
            margin,
            y
        );

        if (result.cuYd < 3) {
            y += 18;
            doc.setFontSize(9);
            doc.setTextColor(120, 113, 108);
            const note = doc.splitTextToSize(
                "Note: orders under 3-5 cu yd often carry a short-load fee of $50-$150 from ready-mix suppliers.",
                pageWidth - margin * 2
            );
            doc.text(note, margin, y);
            y += note.length * 12;
        }

        // Disclaimer
        y += 20;
        doc.setFontSize(8.5);
        doc.setTextColor(150, 145, 140);
        const disclaimer = doc.splitTextToSize(
            "Estimates only. Always confirm quantities and pricing with your supplier before ordering.",
            pageWidth - margin * 2
        );
        doc.text(disclaimer, margin, y);

        // Footer watermark / credit
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setDrawColor(231, 229, 223);
        doc.setLineWidth(0.5);
        doc.line(margin, pageHeight - 48, pageWidth - margin, pageHeight - 48);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(168, 162, 158);
        doc.textWithLink(
            "Built with standardconvert.com",
            margin,
            pageHeight - 30,
            {
                url: "https://standardconvert.com/",
            }
        );
        doc.textWithLink("standardconvert.com", pageWidth - margin, pageHeight - 30, {
            align: "right",
            url: "https://standardconvert.com/",
        });

        doc.save(`concrete-calculator-${shape}.pdf`);
    };


    return (
        <section id="calculator" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <div
                    className="h-2 w-full bg-orange-600"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 10px)",
                    }}
                    aria-hidden="true"
                />

                <div className="p-5 sm:p-8">
                    <TabGroup
                        selectedIndex={SHAPES.findIndex((s) => s.key === shape)}
                        onChange={(i) => setShape(SHAPES[i].key)}
                    >
                        <TabList className="flex flex-wrap gap-2">
                            {SHAPES.map((s) => (
                                <Tab
                                    key={s.key}
                                    className={({ selected }) =>
                                        classNames(
                                            "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500",
                                            selected
                                                ? "bg-stone-900 text-white"
                                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                        )
                                    }
                                >
                                    <s.icon className="h-4 w-4" aria-hidden="true" />
                                    {s.label}
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>

                    <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-500">
                            Enter dimensions
                        </span>
                        <button
                            type="button"
                            onClick={() => setUnit(isMetric ? "imperial" : "metric")}
                            className="flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                        >
                            <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                            {isMetric ? "Metric (m / cm)" : "Imperial (ft / in)"}
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {(shape === "slab" || shape === "footing") && (
                            <>
                                <Field
                                    label={isMetric ? "Length (m)" : "Length (ft)"}
                                    value={length}
                                    onChange={setLength}
                                />
                                <Field
                                    label={isMetric ? "Width (m)" : "Width (ft)"}
                                    value={width}
                                    onChange={setWidth}
                                />
                                <Field
                                    label={isMetric ? "Thickness (cm)" : "Thickness (in)"}
                                    value={thicknessIn}
                                    onChange={setThicknessIn}
                                />
                            </>
                        )}

                        {shape === "round" && (
                            <>
                                <Field
                                    label={isMetric ? "Diameter (cm)" : "Diameter (in)"}
                                    value={diameterIn}
                                    onChange={setDiameterIn}
                                />
                                <Field
                                    label={isMetric ? "Height (m)" : "Height (ft)"}
                                    value={heightFt}
                                    onChange={setHeightFt}
                                />
                            </>
                        )}

                        {shape === "circular" && (
                            <>
                                <Field
                                    label={isMetric ? "Diameter (cm)" : "Diameter (in)"}
                                    value={diameterIn}
                                    onChange={setDiameterIn}
                                />
                                <Field
                                    label={isMetric ? "Thickness (cm)" : "Thickness (in)"}
                                    value={thicknessIn}
                                    onChange={setThicknessIn}
                                />
                            </>
                        )}

                        <Field label="Quantity" value={quantity} onChange={setQuantity} />
                    </div>

                    <div className="mt-5">
                        <div className="flex items-center justify-between text-sm">
                            <label htmlFor="waste" className="font-medium text-stone-600">
                                Waste / overage factor
                            </label>
                            <span className="font-semibold text-stone-900">{waste}%</span>
                        </div>
                        <input
                            id="waste"
                            type="range"
                            min={0}
                            max={20}
                            value={waste}
                            onChange={(e) => setWaste(parseInt(e.target.value))}
                            className="mt-2 w-full accent-orange-600"
                        />
                    </div>

                    <div className="mt-7 rounded-xl bg-stone-900 p-5 text-white sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                            You&apos;ll need approximately
                        </p>
                        <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-2">
                            <ResultStat value={result.cuYd.toFixed(2)} label="cu yd" big />
                            <ResultStat value={result.cuFt.toFixed(1)} label="cu ft" />
                            <ResultStat value={result.cuM.toFixed(2)} label="cu m" />
                            <ResultStat value={result.weightTons.toFixed(2)} label="tons" />
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {([40, 50, 60, 80] as const).map((size) => (
                                <div
                                    key={size}
                                    className="rounded-lg bg-white/5 px-3 py-2.5 text-center"
                                >
                                    <p className="text-lg font-bold tabular-nums">
                                        {result.bags[size]}
                                    </p>
                                    <p className="text-[11px] text-stone-400">{size} lb bags</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-stone-200 p-5">
                        <p className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
                            <Info className="h-4 w-4 text-orange-600" aria-hidden="true" />
                            Cost estimate (optional)
                        </p>
                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-xs font-medium text-stone-500">
                                    Ready-mix price per cu yd ($)
                                </label>
                                <input
                                    type="number"
                                    value={pricePerYard}
                                    onChange={(e) => setPricePerYard(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm tabular-nums focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                                <p className="mt-1.5 text-sm font-semibold text-stone-900">
                                    &asymp; ${result.costReadyMix.toFixed(0)} delivered
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-stone-500">
                                    80 lb bag price ($)
                                </label>
                                <input
                                    type="number"
                                    value={pricePerBag}
                                    onChange={(e) => setPricePerBag(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm tabular-nums focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                                <p className="mt-1.5 text-sm font-semibold text-stone-900">
                                    &asymp; ${result.costBagged80.toFixed(0)} bagged DIY
                                </p>
                            </div>
                        </div>
                        {result.cuYd < 3 && (
                            <p className="mt-3 text-xs text-stone-500">
                                Orders under 3–5 cu yd often carry a short-load fee of
                                $50–$150 from ready-mix suppliers — bags may be more
                                economical at this size.
                            </p>
                        )}
                    </div>

                    {/* Download PDF */}
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download as PDF
                    </button>
                </div>
            </div>
        </section>
    );
}

function Field({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-xs font-medium text-stone-500">{label}</label>
            <input
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold tabular-nums focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
        </div>
    );
}

function ResultStat({
    value,
    label,
    big,
}: {
    value: string;
    label: string;
    big?: boolean;
}) {
    return (
        <div className="flex items-baseline gap-1.5">
            <span
                className={classNames(
                    "font-display font-bold tabular-nums",
                    big ? "text-4xl text-orange-400" : "text-2xl text-white"
                )}
            >
                {value}
            </span>
            <span className="text-sm text-stone-400">{label}</span>
        </div>
    );
}