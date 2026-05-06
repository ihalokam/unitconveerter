import React from 'react'
import Link from 'next/link'
import { Ruler, ArrowUpRight, Microscope, Truck } from 'lucide-react'

function Length() {
    const categories = [
        { label: "Metric Standards", units: "m, km, cm, mm", icon: <Microscope size={14} /> },
        { label: "Imperial Systems", units: "in, ft, mi", icon: <Truck size={14} /> }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/length-unit-converter-in-bulk-csv-excel-files" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-300">

                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-slate-800 p-3 text-white shadow-slate-200 shadow-lg group-hover:bg-blue-600 transition-colors">
                                <Ruler size={28} />
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                Length & Distance
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            OPEN CONVERTER <ArrowUpRight size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Content Area */}
                        <div className="lg:col-span-8">
                            <p className="text-lg leading-relaxed text-slate-600">
                                From <span className="text-slate-900 font-medium">precision machining</span> to global logistics, distance accuracy is non-negotiable.
                                Our converter handles the full spectrum of dimensional analysis, bridging the gap between
                                high-precision millimeters and large-scale kilometers or miles.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4">
                                {categories.map((cat, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 border border-slate-200">
                                        {cat.icon}
                                        <span>{cat.label}: <span className="font-normal text-slate-500">{cat.units}</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Callout */}
                        <div className="lg:col-span-4 flex items-center">
                            <div className="w-full rounded-xl bg-blue-50/50 p-5 border-l-4 border-blue-500">
                                <p className="text-sm font-medium text-blue-900 leading-snug">
                                    "Ensure mechanical specs and architectural plans translate perfectly between systems with zero rounding errors."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Background Decorative Element */}
                    <div className="absolute -bottom-10 -left-10 text-slate-50 opacity-10 pointer-events-none">
                        <Ruler size={200} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Length