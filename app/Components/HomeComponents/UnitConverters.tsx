import React from 'react'
import Link from 'next/link'
import {
    Gauge, Ruler, Weight, Thermometer,
    Droplets, Zap, FileSpreadsheet, Binary,
    ArrowRightLeft, ArrowRight
} from 'lucide-react'

function UnitConverters() {
    const bulkTools = [
        { name: "Pressure", href: "/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files", icon: <Gauge />, color: "text-orange-600", bg: "bg-orange-50 group-hover:bg-orange-100" },
        { name: "Length", href: "/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files", icon: <Ruler />, color: "text-blue-600", bg: "bg-blue-50 group-hover:bg-blue-100" },
        { name: "Mass", href: "/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files", icon: <Weight />, color: "text-emerald-600", bg: "bg-emerald-50 group-hover:bg-emerald-100" },
        { name: "Temperature", href: "/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files", icon: <Thermometer />, color: "text-red-600", bg: "bg-red-50 group-hover:bg-red-100" },
        { name: "Volume", href: "/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files", icon: <Droplets />, color: "text-cyan-600", bg: "bg-cyan-50 group-hover:bg-cyan-100" },
        { name: "Energy", href: "/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files", icon: <Zap />, color: "text-amber-600", bg: "bg-amber-50 group-hover:bg-amber-100" },
    ];

    const utilityTools = [
        { name: "All-in-One Converter", href: "/unit-converter", icon: <ArrowRightLeft />, desc: "Real-time interactive unit conversion." },
    ];

    return (
        <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white border-t border-slate-200/80">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-14 max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        The Tool <span className="text-blue-600">Registry</span>
                    </h2>
                    <p className="text-base text-slate-600 font-normal mt-2">
                        Select a specialized protocol to begin processing your datasets or single values.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

                    {/* Left Frame: Bulk Dataset Conversion */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                            <FileSpreadsheet className="text-blue-600" size={18} />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Bulk Dataset Conversion (CSV / XLSX)
                            </h3>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {bulkTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="group p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl hover:bg-white hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.bg} ${tool.color} mb-4 transition-colors`}>
                                            {React.cloneElement(tool.icon as React.ReactElement<{ size: number }>, { size: 22 })}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                                            {tool.name}
                                        </h4>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                                        <span>Execute Bulk</span>
                                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Frame: System Utilities */}
                    <div className="lg:col-span-4 lg:border-l lg:border-slate-200/80 lg:pl-10">
                        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                            <Binary className="text-blue-600" size={18} />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                System Utilities
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {utilityTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
                                >
                                    <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 text-slate-700 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                                        {React.cloneElement(tool.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                            {tool.name}
                                        </h4>
                                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                            {tool.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Direct PDF Hub Link */}
                        <Link
                            href="/pdf-tools"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-900 text-white rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-blue-600 shadow-sm hover:shadow-blue-500/25 transition-all duration-300"
                        >
                            <span>Explore All PDF Tools</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default UnitConverters