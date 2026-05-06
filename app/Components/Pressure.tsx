import React from 'react'
import Link from 'next/link'
import { Gauge, ArrowUpRight, CheckCircle2 } from 'lucide-react'

function Pressure() {
    const units = [
        { category: "Metric (SI)", items: "Megapascal (MPa), Kilopascal (kPa), Pascal (Pa)" },
        { category: "Imperial", items: "PSI (Pound-force per square inch)" },
        { category: "Industrial", items: "Bar, Standard Atmosphere (atm)" }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/pressure-unit-converter-in-bulk-csv-excel-files" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-300">

                    {/* Top Row: Icon & Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-blue-600 p-3 text-white shadow-blue-200 shadow-lg group-hover:scale-110 transition-transform">
                                <Gauge size={28} />
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                Pressure Conversion
                            </h2>
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={32} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Description */}
                        <div className="lg:col-span-2">
                            <p className="text-lg leading-relaxed text-slate-600">
                                Stop relying on manual spreadsheets for high-stakes calculations. Our industrial-grade batch converter ensures
                                <span className="font-semibold text-slate-800"> consistent precision across thousands of data points</span>,
                                bridging the gap between metric and imperial standards.
                            </p>
                            <p className="mt-4 text-slate-500 italic border-l-4 border-blue-100 pl-4">
                                Optimized for Oil & Gas sensor logs and mechanical system validation (MPa, Bar, PSI, and atm).
                            </p>
                        </div>

                        {/* Right: Unit List */}
                        <div className="rounded-xl bg-slate-50 p-6 border border-slate-100">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Supported Standards</h4>
                            <ul className="space-y-3">
                                {units.map((u, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
                                        <div>
                                            <span className="block font-bold text-slate-700 text-sm">{u.category}</span>
                                            <span className="text-xs text-slate-500">{u.items}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Subtle Background Accent */}
                    <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-10 group-hover:text-blue-50 transition-colors">
                        <Gauge size={160} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Pressure