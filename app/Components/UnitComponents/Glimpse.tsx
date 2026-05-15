import React from 'react'
import {
    Database,
    ArrowRightLeft,
    Settings,
    ShieldCheck,
    Cpu,
    Globe
} from 'lucide-react';

const Glimpse = () => {
    const inputData = [
        { bar: "1.0", meter: "100", gram: "500", litre: "2.5", celsius: "20" },
        { bar: "2.5", meter: "250", gram: "1000", litre: "5.0", celsius: "25" },
        { bar: "0.8", meter: "50", gram: "250", litre: "1.2", celsius: "18" },
    ];

    const outputData = [
        { psi: "14.50", km: "0.100", pound: "1.102", ml: "2500", kelvin: "293.15" },
        { psi: "36.26", km: "0.200", pound: "2.204", ml: "5000", kelvin: "298.15" },
        { psi: "11.60", km: "0.050", pound: "0.551", ml: "1200", kelvin: "291.15" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800 relative">
            {/* Header */}
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                    High-Precision Industrial Bulk Unit Conversion
                </h2>
            </div>

            <div className="mx-auto max-w-7xl relative">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 relative z-10">

                    {/* Left Column: Input side */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                                <Settings size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Automated Batch Processing</h3>
                                <p className="text-sm text-slate-600">Convert large-scale CSV and Excel datasets instantly without manual spreadsheet entry.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Industrial-Grade Precision</h3>
                                <p className="text-sm text-slate-600">Engineered for accuracy in critical sectors like Oil & Gas, Logistics, and Chemical Engineering.</p>
                            </div>
                        </div>

                        {/* Input Table */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            <div className="bg-slate-100 px-4 py-3 text-center font-bold text-slate-700">
                                Bulk Data Input & Transformation
                            </div>
                            <div className="bg-slate-200/50 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Input Data Table
                            </div>
                            <table className="w-full text-center text-sm">
                                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Bar</th>
                                        <th className="px-4 py-3 font-semibold">meter</th>
                                        <th className="px-4 py-3 font-semibold">gram</th>
                                        <th className="px-4 py-3 font-semibold">Litre</th>
                                        <th className="px-4 py-3 font-semibold">celsius</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {inputData.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50">
                                            <td className="px-4 py-3">{row.bar}</td>
                                            <td className="px-4 py-3">{row.meter}</td>
                                            <td className="px-4 py-3">{row.gram}</td>
                                            <td className="px-4 py-3">{row.litre}</td>
                                            <td className="px-4 py-3">{row.celsius}</td>
                                        </tr>
                                    ))}
                                    <tr className="h-12"><td></td><td></td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Output side */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-right lg:text-left">High-Volume Transformation</h3>
                                <p className="text-sm text-slate-600 text-right lg:text-left">Handles complex unit conversions across different measurement systems simultaneously.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-right lg:text-left">Centralised Data Integrity</h3>
                                <p className="text-sm text-slate-600 text-right lg:text-left">Ensures consistent accuracy across all industrial data points for manufacturing and energy management.</p>
                            </div>
                        </div>

                        {/* Output Table */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            <div className="bg-slate-100 px-4 py-3 text-center font-bold text-slate-700">
                                High-Precision Converted Output
                            </div>
                            <div className="bg-slate-200/50 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Output Data Table
                            </div>
                            <table className="w-full text-center text-sm">
                                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold uppercase">PSI</th>
                                        <th className="px-4 py-3 font-semibold uppercase">km</th>
                                        <th className="px-4 py-3 font-semibold uppercase">pound</th>
                                        <th className="px-4 py-3 font-semibold uppercase">mL</th>
                                        <th className="px-4 py-3 font-semibold uppercase">kelvin</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {outputData.map((row, i) => (
                                        <tr key={i} className="bg-blue-50/30 hover:bg-blue-50">
                                            <td className="px-4 py-3">{row.psi}</td>
                                            <td className="px-4 py-3">{row.km}</td>
                                            <td className="px-4 py-3">{row.pound}</td>
                                            <td className="px-4 py-3">{row.ml}</td>
                                            <td className="px-4 py-3">{row.kelvin}</td>
                                        </tr>
                                    ))}
                                    <tr className="h-12"><td></td><td></td><td></td><td></td><td></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Central Overlay Arrow (SVG) */}
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex z-0">
                    <div className="relative h-64 w-64 opacity-10">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-600 animate-pulse" strokeWidth="1">
                            <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Decorative Industry Elements footer */}
            <div className="mt-16 flex justify-center gap-12 text-slate-300">
                <Globe size={48} />
                <Database size={48} />
                <ArrowRightLeft size={48} />
            </div>
        </div>
    )
}

export default Glimpse;