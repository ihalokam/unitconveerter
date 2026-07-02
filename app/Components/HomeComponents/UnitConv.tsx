"use strict";

import React from 'react';
import Link from 'next/link';
import {
    Ruler, Weight, Thermometer, Square,
    Waves, Wind, Clock, Zap, Battery,
    Gauge, Database, Crosshair, Droplets,
    Cpu, ArrowRight
} from 'lucide-react';

// Static categories built around your dataset for preview display
const PREVIEW_CATEGORIES = [
    { label: 'Length', icon: <Ruler size={16} />, desc: 'mm, cm, m, km, inch, ft, yard, miles, nmi' },
    { label: 'Mass', icon: <Weight size={16} />, desc: 'mg, g, kg, tonne, oz, lb, stone' },
    { label: 'Temperature', icon: <Thermometer size={16} />, desc: 'Celsius, Fahrenheit, Kelvin matrix' },
    { label: 'Area', icon: <Square size={16} />, desc: 'Metric & Imperial grid bounds' },
    { label: 'Volume', icon: <Waves size={16} />, desc: 'ml, L, m³, cubic inch/ft, US/UK gallons' },
    { label: 'Speed', icon: <Wind size={16} />, desc: 'm/s, km/h, mph, knots, ft/s dynamic arrays' },
    { label: 'Time', icon: <Clock size={16} />, desc: 'ms, s, min, hr, days, weeks, months, years' },
    { label: 'Energy', icon: <Zap size={16} />, desc: 'J, kJ, cal, kcal, Wh, kWh, BTU computations' },
    { label: 'Power', icon: <Battery size={16} />, desc: 'W, kW, MW, horsepower, BTU/hr structural outputs' },
    { label: 'Pressure', icon: <Gauge size={16} />, desc: 'Pa, kPa, bar, PSI, atm, mmHg (Torr)' },
    { label: 'Data', icon: <Database size={16} />, desc: 'Bits, Bytes, KB, MB, GB, TB, PB storage thresholds' },
    { label: 'Frequency', icon: <Cpu size={16} />, desc: 'Hz, kHz, MHz, GHz cyclical clock rates' },
];

function UnitConv() {
    return (
        <section className="w-full bg-white text-[#121212] font-sans py-16 px-6 border-t border-b border-gray-200">
            <div className="max-w-6xl mx-auto">

                {/* Terminal Header Metadata Block */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-[10px] tracking-widest font-mono text-gray-400 uppercase">
                    <span>***SAAS//SYSTEM_CORE_PROTOCOL***</span>
                    <span>•</span>
                    <span className="text-[#3b82f6] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                        SYS STATUS: READY
                    </span>
                    <span>•</span>
                    <span>MODULE: MATH_CONVERSION_LAYER</span>
                </div>

                {/* Industrial Punchy Main Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none text-[#121212]">
                            UNIT CONVERSION ENGINE <span className="text-[#3b82f6]">ENGINEERED FOR PRAGMATISTS.</span>
                        </h2>
                        <p className="mt-3 text-sm text-gray-500 font-mono max-w-xl">
                            Execute hyper-precise conversions across 15+ complex dimension sets, international currencies, and raw binary infrastructures.
                        </p>
                    </div>

                    {/* Prompt Trigger Button */}
                    <Link
                        href="/unit-converter"
                        className="group inline-flex items-center gap-3 bg-[#121212] hover:bg-[#3b82f6] text-white font-mono text-xs font-bold tracking-widest uppercase px-6 py-4 rounded transition-all duration-200 shrink-0 self-start md:self-auto shadow-md"
                    >
                        CONVERT ANY UNIT
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* The Grid Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {PREVIEW_CATEGORIES.map((category, index) => (
                        <Link
                            href="/unit-converter"
                            key={index}
                            className="group relative block p-5 rounded-lg border border-gray-100 bg-gradient-to-b from-gray-50/50 to-gray-50/10 hover:from-white hover:to-white hover:border-[#3b82f6]/30 hover:shadow-[0_4px_20px_-4px_rgba(59,130,246,0.1)] transition-all duration-200"
                        >
                            {/* Linear Wireframe Icon Container */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 bg-white group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/20 transition-colors">
                                    {category.icon}
                                </div>
                                <span className="font-mono text-[9px] tracking-wider text-gray-300 group-hover:text-[#3b82f6]/50 transition-colors">
                                    [0x0{index.toString(16).toUpperCase()}]
                                </span>
                            </div>

                            {/* Text Meta info */}
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                                {category.label}
                            </h3>

                            <p className="mt-1.5 text-xs text-gray-400 font-sans leading-relaxed min-h-[32px]">
                                {category.desc}
                            </p>

                            {/* Fine Print Blueprint Lines */}
                            <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-[10px] font-mono text-gray-400">
                                <span className="group-hover:text-[#3b82f6] transition-colors">INITIALIZE →</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#3b82f6]">ALIGNED</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default UnitConv;