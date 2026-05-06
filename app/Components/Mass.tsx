import React from 'react'
import Link from 'next/link'
import { Weight, ArrowUpRight, Ship, Beaker, Check } from 'lucide-react'

function Mass() {
    const unitGroups = [
        {
            title: "Metric Units",
            list: ["Kilogram (kg)", "Gram (g)", "Milligram (mg)", "Metric Ton (t)"],
            icon: <Beaker size={16} className="text-blue-500" />
        },
        {
            title: "Imperial Units",
            list: ["Pound (lb)", "Ounce (oz)"],
            icon: <Ship size={16} className="text-blue-500" />
        }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/mass-unit-converter-in-bulk-csv-excel-files" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-300">

                    {/* Header: Icon & Title */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-slate-900 p-3 text-white shadow-slate-200 shadow-lg group-hover:bg-blue-600 transition-all">
                                <Weight size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                    Mass & Weight
                                </h2>
                                <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mt-1">
                                    Material Science & Logistics
                                </p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={32} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        {/* Description Section */}
                        <div className="space-y-4">
                            <p className="text-lg leading-relaxed text-slate-600">
                                Reliable mass conversion is essential for <span className="text-slate-900 font-semibold">shipping, manufacturing, and chemical formulation</span>.
                                Whether you are calculating the displacement of a metric ton or the precise milligram dosage, our tool ensures consistent results.
                            </p>
                            <p className="text-slate-500 text-sm italic border-l-2 border-slate-200 pl-4">
                                "Avoid the risks of manual calculation when dealing with global freight and material science."
                            </p>
                        </div>

                        {/* Unit Specification Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {unitGroups.map((group, idx) => (
                                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        {group.icon}
                                        <h4 className="font-bold text-slate-800 text-sm">{group.title}</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {group.list.map((unit, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                                <Check size={12} className="text-blue-400" />
                                                {unit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Industrial Watermark */}
                    <div className="absolute -bottom-12 -right-8 text-slate-50 opacity-10 pointer-events-none group-hover:text-blue-50 transition-colors">
                        <Weight size={220} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Mass