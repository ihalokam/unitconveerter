import React from 'react'
import Link from 'next/link'
import { Droplets, ArrowUpRight, Box, Cylinder, Pipette } from 'lucide-react'

function Volume() {
    const volumeTypes = [
        {
            label: "Liquid Capacity",
            units: "Liters (L), US Gallons, Fluid Ounces",
            icon: <Pipette size={16} />
        },
        {
            label: "Cubic Dimensions",
            units: "m³, cm³, Milliliters (mL)",
            icon: <Box size={16} />
        }
    ]

    return (
        <div className="mx-auto max-w-7xl px-8 py-6">
            <Link href="/volume-unit-converter" className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-cyan-300">

                    {/* Header: Icon & Title */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-slate-900 p-3 text-white shadow-slate-200 shadow-lg group-hover:bg-cyan-600 transition-all">
                                <Droplets size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                    Volume & Fluid Capacity
                                </h2>
                                <p className="text-sm font-medium text-cyan-600 uppercase tracking-widest mt-1">
                                    Fluid Dynamics & Logistics
                                </p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-cyan-500 transition-colors" size={32} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                        {/* Left Side: Content */}
                        <div className="lg:col-span-7">
                            <p className="text-lg leading-relaxed text-slate-600">
                                Managing <span className="text-slate-900 font-semibold">fluid dynamics and storage capacity</span> requires absolute precision.
                                Our converter handles both liquid capacities and cubic dimensions, allowing seamless movement between Liters, US Gallons, and cubic meters.
                            </p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {volumeTypes.map((type, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors group-hover:bg-white">
                                        <div className="text-cyan-600">{type.icon}</div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{type.label}</p>
                                            <p className="text-xs text-slate-500">{type.units}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Visual Context Card */}
                        <div className="lg:col-span-5 flex items-center justify-center">
                            <div className="w-full rounded-xl bg-gradient-to-br from-cyan-50 to-slate-50 p-6 border border-cyan-100 text-center">
                                <Cylinder className="mx-auto text-cyan-200 mb-2" size={40} />
                                <h4 className="text-sm font-bold text-cyan-900">Industrial Storage Ready</h4>
                                <p className="text-xs text-cyan-700 mt-2">
                                    Optimized for upstream fluid management and large-scale chemical storage planning.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Industrial Watermark */}
                    <div className="absolute -bottom-10 -right-4 text-slate-50 opacity-10 pointer-events-none group-hover:text-cyan-50 transition-colors">
                        <Droplets size={180} />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Volume