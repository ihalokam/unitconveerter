import React from 'react'
import Link from 'next/link'
import { Zap, ArrowUpRight, Activity, BatteryCharging, Flame } from 'lucide-react'

function Energy() {
    const energySectors = [
        { label: "Mechanical", units: "Joule (J), Kilojoule (kJ)", icon: <Activity size={16} /> },
        { label: "Electrical", units: "Wh, Kilowatt-hour (kWh)", icon: <BatteryCharging size={16} /> },
        { label: "Thermal", units: "Calorie (cal), BTU", icon: <Flame size={16} /> }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/energy-unit-converter" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-amber-300">

                    {/* Header: Icon & Title */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-slate-900 p-3 text-white shadow-slate-200 shadow-lg group-hover:bg-amber-500 transition-all">
                                <Zap size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                    Energy & Power Analysis
                                </h2>
                                <p className="text-sm font-medium text-amber-600 uppercase tracking-widest mt-1">
                                    Efficiency & Thermal Auditing
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black text-amber-700 border border-amber-100 uppercase tracking-tighter">
                            Single Source of Truth
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                        {/* Description */}
                        <div className="lg:col-span-6">
                            <p className="text-lg leading-relaxed text-slate-600">
                                Bridge the gap between <span className="text-slate-900 font-semibold">electrical, mechanical, and thermal</span> energy units.
                                Synchronize fragmented formats like kWh or BTUs for accurate power consumption analysis and facility efficiency auditing.
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 text-amber-600 font-bold text-sm">
                                Start Efficiency Audit <ArrowUpRight size={18} />
                            </div>
                        </div>

                        {/* Unit Categorization Grid */}
                        <div className="lg:col-span-6 grid grid-cols-1 gap-3">
                            {energySectors.map((sector, i) => (
                                <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors group-hover:bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="text-amber-500 bg-white p-1.5 rounded-lg border border-slate-100">
                                            {sector.icon}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{sector.label}</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">{sector.units}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Industrial Watermark */}
                    <div className="absolute -bottom-10 -right-6 text-slate-50 opacity-10 pointer-events-none group-hover:text-amber-50 transition-colors">
                        <Zap size={200} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Energy