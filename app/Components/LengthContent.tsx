import React from 'react';
import {
    Ruler,
    MoveHorizontal,
    Square,
    Box,
    Triangle,
    Scale,
    Compass
} from 'lucide-react';

function LengthContent() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/30">
                        <Ruler size={14} /> Measurement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        What is Length? <br /><span className="text-green-400">Complete Measurement Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl font-medium">
                        Learn length, units, conversions, formulas, and geometry concepts used in school and engineering.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <MoveHorizontal size={240} />
                </div>
            </div>

            {/* Intro */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">What is Length?</h2>
                <p className="text-lg text-slate-600 mb-6">
                    Length is a fundamental physical quantity that measures the distance between two points. It is one of the most basic and essential measurements used in mathematics, physics, engineering, and everyday life. Whether you are measuring the height of a building, the distance between cities, or the size of an object, length plays a central role.
                </p>

                <p className="text-lg text-slate-600 mb-6">
                    In the International System of Units (SI), the standard unit of length is the meter (m). All other units are derived from or related to the meter. Length helps define shapes, motion, geometry, and spatial relationships.
                </p>

                <div className="bg-slate-50 p-10 rounded-2xl text-center border">
                    <p className="text-sm uppercase text-slate-400 mb-3">Base Unit</p>
                    <span className="text-4xl font-mono font-bold text-slate-900">
                        1 Meter (m)
                    </span>
                </div>
            </section>

            {/* Units */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Units of Length</h2>
                <p className="text-slate-600 mb-6">
                    Length is measured using different units depending on scale and region. The metric system is widely used globally, while imperial units are still common in some countries.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Metric Units</h3>
                        <ul className="text-slate-600 space-y-2 text-sm">
                            <li>1 Kilometer (km) = 1000 meters</li>
                            <li>1 Meter (m) = base unit</li>
                            <li>1 Centimeter (cm) = 0.01 m</li>
                            <li>1 Millimeter (mm) = 0.001 m</li>
                            <li>1 Micrometer (µm) = 10⁻⁶ m</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Imperial Units</h3>
                        <ul className="text-slate-600 space-y-2 text-sm">
                            <li>1 Inch (in) = 2.54 cm</li>
                            <li>1 Foot (ft) = 12 inches</li>
                            <li>1 Yard (yd) = 3 feet</li>
                            <li>1 Mile = 1.609 km</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* Conversion */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Length Conversion</h2>
                <p className="text-slate-600 mb-6">
                    Converting between units is essential in science and engineering. Metric conversions are based on powers of 10, making them simple and consistent.
                </p>

                <div className="bg-green-50 p-6 rounded-xl border-l-8 border-green-500">
                    <p className="text-lg font-mono text-green-800">
                        1 km = 1000 m = 100000 cm = 1000000 mm
                    </p>
                </div>
            </section>

            {/* Geometry */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Length in Geometry</h2>
                <p className="text-slate-600 mb-6">
                    Length is a core component in geometry. It is used to calculate perimeter, area, and volume of shapes.
                </p>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-5 border rounded-xl">
                        <Square className="text-green-500 mb-3" />
                        <h4 className="font-bold">Perimeter</h4>
                        <p className="text-sm text-slate-600">Sum of all sides of a shape</p>
                        <p className="text-sm font-mono mt-2">P = 4a (square)</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Triangle className="text-green-500 mb-3" />
                        <h4 className="font-bold">Distance Formula</h4>
                        <p className="text-sm text-slate-600">Distance between two points</p>
                        <p className="text-sm font-mono mt-2">d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Box className="text-green-500 mb-3" />
                        <h4 className="font-bold">Volume</h4>
                        <p className="text-sm text-slate-600">3D measurement using length</p>
                        <p className="text-sm font-mono mt-2">V = l × w × h</p>
                    </div>

                </div>
            </section>

            {/* Physics */}
            <section className="mb-20 p-8 bg-green-50 rounded-2xl border-l-8 border-green-500">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Scale className="text-green-600" /> Length in Physics
                </h3>
                <p className="text-slate-700 mb-4">
                    In physics, length is used to describe motion, displacement, and distance. It plays a key role in equations involving speed, velocity, and acceleration.
                </p>
                <p className="font-mono text-green-800">
                    Speed = Distance / Time
                </p>
            </section>

            {/* Measurement Tools */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Measuring Instruments</h2>
                <p className="text-slate-600 mb-6">
                    Different tools are used to measure length depending on precision requirements.
                </p>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-5 border rounded-xl">
                        <Ruler className="text-green-500 mb-3" />
                        <h4 className="font-bold">Ruler</h4>
                        <p className="text-sm text-slate-600">Used for small measurements</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Compass className="text-green-500 mb-3" />
                        <h4 className="font-bold">Vernier Caliper</h4>
                        <p className="text-sm text-slate-600">High precision measurements</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <MoveHorizontal className="text-green-500 mb-3" />
                        <h4 className="font-bold">Measuring Tape</h4>
                        <p className="text-sm text-slate-600">Used for long distances</p>
                    </div>

                </div>
            </section>

            {/* Conclusion */}
            <section className="p-12 bg-slate-50 rounded-3xl text-center">
                <h2 className="text-2xl font-black mb-4">Conclusion</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Length is a fundamental concept that connects mathematics, physics, and real-world applications. From basic measurements to advanced engineering calculations, understanding length and its units is essential for solving problems and building accurate systems.
                </p>
            </section>

        </div>
    )
}

export default LengthContent;