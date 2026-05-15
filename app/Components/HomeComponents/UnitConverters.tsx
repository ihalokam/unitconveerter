import React from 'react'
import Link from 'next/link'
import {
    Gauge, Ruler, Weight, Thermometer,
    Droplets, Zap, FileSpreadsheet, Binary,
    FileType, ArrowRightLeft, ShieldCheck
} from 'lucide-react'

function UnitConverters() {
    const bulkTools = [
        { name: "Pressure", href: "/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files", icon: <Gauge />, color: "text-orange-600" },
        { name: "Length", href: "/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files", icon: <Ruler />, color: "text-blue-600" },
        { name: "Mass", href: "/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files", icon: <Weight />, color: "text-emerald-600" },
        { name: "Temperature", href: "/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files", icon: <Thermometer />, color: "text-red-600" },
        { name: "Volume", href: "/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files", icon: <Droplets />, color: "text-cyan-600" },
        { name: "Energy", href: "/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files", icon: <Zap />, color: "text-yellow-600" },
    ];

    const utilityTools = [
        { name: "All-in-One Converter", href: "/unit-converter", icon: <ArrowRightLeft />, desc: "Real-time interactive unit conversion." },

    ];

    return (
        <section className="py-24 px-8 bg-white">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        The Tool <span className="text-blue-600">Registry</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-2">Select a specialized protocol to begin processing.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Column 1 & 2: Bulk Processing (The Core Feature) */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <FileSpreadsheet className="text-slate-400" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Bulk Dataset Conversion (CSV/XLSX)</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {bulkTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
                                >
                                    <div className={`${tool.color} mb-4 transition-transform group-hover:scale-110`}>
                                        {React.cloneElement(tool.icon as React.ReactElement<{ size: number }>, { size: 28 })}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1">{tool.name}</h4>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                                        Execute Bulk →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: General Utilities & PDF */}
                    <div className="lg:border-l lg:border-slate-100 lg:pl-12">
                        <div className="flex items-center gap-3 mb-8">
                            <Binary className="text-slate-400" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">System Utilities</h3>
                        </div>

                        <div className="space-y-4">
                            {utilityTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="flex items-start gap-4 p-5 rounded-3xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all group"
                                >
                                    <div className="p-3 bg-slate-100 rounded-2xl text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {React.cloneElement(tool.icon as React.ReactElement<{ size: number }>, { size: 20 })}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{tool.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tool.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Direct PDF Hub Link */}
                        <Link
                            href="/pdf-tools"
                            className="mt-8 flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors"
                        >
                            Explore All PDF Tools
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default UnitConverters