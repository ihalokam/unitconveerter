"use strict";

import React from 'react';
import Link from 'next/link';
import {
    Ruler, Weight, Thermometer, Square,
    Waves, Wind, Clock, Zap, Battery,
    Gauge, Database, Cpu, ArrowRight,
    Sparkles
} from 'lucide-react';

// Static categories built around your dataset for preview display
const PREVIEW_CATEGORIES = [
    { label: 'Length', icon: <Ruler size={18} />, desc: 'mm, cm, m, km, inch, ft, yard, miles, nmi' },
    { label: 'Mass', icon: <Weight size={18} />, desc: 'mg, g, kg, tonne, oz, lb, stone' },
    { label: 'Temperature', icon: <Thermometer size={18} />, desc: 'Celsius, Fahrenheit, Kelvin matrix' },
    { label: 'Area', icon: <Square size={18} />, desc: 'Metric & Imperial grid bounds' },
    { label: 'Volume', icon: <Waves size={18} />, desc: 'ml, L, m³, cubic inch/ft, US/UK gallons' },
    { label: 'Speed', icon: <Wind size={18} />, desc: 'm/s, km/h, mph, knots, ft/s dynamic arrays' },
    { label: 'Time', icon: <Clock size={18} />, desc: 'ms, s, min, hr, days, weeks, months, years' },
    { label: 'Energy', icon: <Zap size={18} />, desc: 'J, kJ, cal, kcal, Wh, kWh, BTU computations' },
    { label: 'Power', icon: <Battery size={18} />, desc: 'W, kW, MW, horsepower, BTU/hr structural outputs' },
    { label: 'Pressure', icon: <Gauge size={18} />, desc: 'Pa, kPa, bar, PSI, atm, mmHg (Torr)' },
    { label: 'Data', icon: <Database size={18} />, desc: 'Bits, Bytes, KB, MB, GB, TB, PB storage thresholds' },
    { label: 'Frequency', icon: <Cpu size={18} />, desc: 'Hz, kHz, MHz, GHz cyclical clock rates' },
];

function UnitConv() {
    return (
        <section className="w-full bg-slate-50/50 text-slate-900 font-sans py-16 sm:py-20 px-4 sm:px-6 border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto">

                {/* Badge Header */}
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <Sparkles size={13} className="text-blue-600" />
                    <span>Unit Conversion Engine</span>
                </div>

                {/* Section Headline Block */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Engineered for <span className="text-blue-600">Speed & Precision</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-600 leading-relaxed">
                            Execute hyper-precise conversions across 15+ complex dimension sets, international currencies, and raw data infrastructures.
                        </p>
                    </div>

                    {/* Action Button */}
                    <Link
                        href="/unit-converter"
                        className="group inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shrink-0 shadow-sm hover:shadow-md hover:shadow-blue-500/20"
                    >
                        <span>Convert Any Unit</span>
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {PREVIEW_CATEGORIES.map((category, index) => (
                        <Link
                            href="/unit-converter"
                            key={index}
                            className="group relative block p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                    {category.icon}
                                </div>
                                <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-600 transition-colors bg-slate-50 group-hover:bg-blue-50/50 px-2.5 py-1 rounded-md">
                                    Quick Convert
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {category.label}
                            </h3>

                            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px]">
                                {category.desc}
                            </p>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                                <span className="group-hover:text-blue-600 transition-colors flex items-center gap-1">
                                    Explore units
                                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default UnitConv;