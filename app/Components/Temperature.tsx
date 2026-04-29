import React from 'react'
import Link from 'next/link'
import { ThermometerSun, ArrowUpRight, FlaskConical, Fan, Info } from 'lucide-react'

function Temperature() {
    const scales = [
        { name: "Celsius", symbol: "°C", type: "Metric" },
        { name: "Fahrenheit", symbol: "°F", type: "Imperial" },
        { name: "Kelvin", symbol: "K", type: "Scientific" }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/temperature-unit-converter" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-orange-300">

                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-slate-900 p-3 text-white shadow-slate-200 shadow-lg group-hover:bg-orange-600 transition-all">
                                <ThermometerSun size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                    Temperature Analysis
                                </h2>
                                <p className="text-sm font-medium text-orange-600 uppercase tracking-widest mt-1">
                                    Thermodynamics & HVAC
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 border border-orange-100">
                            <Info size={14} /> NON-LINEAR SCALES
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                        {/* Description */}
                        <div className="lg:col-span-7">
                            <p className="text-lg leading-relaxed text-slate-600">
                                Unlike other units, thermal scales require <span className="text-slate-900 font-semibold">precise formulaic offsets</span> rather than simple multiplication.
                                Our tool ensures your data remains accurate across laboratory reactions and high-scale industrial cooling systems.
                            </p>

                            <div className="mt-6 flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <FlaskConical size={18} />
                                    <span className="text-xs font-medium uppercase">Lab Standards</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Fan size={18} />
                                    <span className="text-xs font-medium uppercase">Industrial HVAC</span>
                                </div>
                            </div>
                        </div>

                        {/* Scales & Formula Preview */}
                        <div className="lg:col-span-5">
                            <div className="space-y-3">
                                {scales.map((scale, i) => (
                                    <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-colors group-hover:bg-white">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-slate-700">{scale.name}</span>
                                            <span className="text-xs text-slate-400 uppercase">{scale.type}</span>
                                        </div>
                                        <span className="font-mono text-lg font-bold text-orange-600">{scale.symbol}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Industrial Watermark */}
                    <div className="absolute -bottom-10 -right-6 text-slate-50 opacity-10 pointer-events-none group-hover:text-orange-50 transition-colors">
                        <ThermometerSun size={180} />
                    </div>

                    {/* Navigation Hint */}
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-orange-600 transition-colors">
                        CALCULATE THERMAL DATA <ArrowUpRight size={18} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Temperature