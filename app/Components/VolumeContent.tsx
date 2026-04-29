import React from 'react';
import {
    Box,
    Droplets,
    Ruler,
    FlaskConical,
    Triangle,
    Scale3D
} from 'lucide-react';

function VolumeContent() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

            {/* Header */}
            <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-500/30">
                        <Box size={14} /> Measurement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        What is Volume? <br /><span className="text-cyan-400">Complete Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl font-medium">
                        Learn volume, units, formulas, and its applications in geometry, physics, and real-world systems.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Scale3D size={240} />
                </div>
            </header>

            {/* Intro */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">What is Volume?</h2>
                <p className="text-lg text-slate-600 mb-6">
                    Volume is a fundamental physical quantity that measures the amount of three-dimensional space occupied by an object or substance. It tells us how much space something takes up, whether it is a solid object like a cube, a liquid in a container, or a gas filling a room.
                </p>

                <p className="text-lg text-slate-600 mb-6">
                    Volume plays a crucial role in mathematics, physics, engineering, and everyday life. From calculating the capacity of water tanks to determining the amount of fuel in a container, understanding volume is essential for accurate measurement and analysis.
                </p>

                <div className="bg-slate-50 p-10 rounded-2xl text-center border">
                    <p className="text-sm uppercase text-slate-400 mb-3">SI Unit</p>
                    <span className="text-4xl font-mono font-bold text-slate-900">
                        Cubic Meter (m³)
                    </span>
                </div>
            </section>

            {/* Units */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Units of Volume</h2>
                <p className="text-slate-600 mb-6">
                    Volume is measured using cubic units in the metric system and various units in the imperial system.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Metric Units</h3>
                        <ul className="text-slate-600 space-y-2 text-sm">
                            <li>1 Cubic meter (m³) = base unit</li>
                            <li>1 Liter (L) = 0.001 m³</li>
                            <li>1 Milliliter (mL) = 1 cm³</li>
                            <li>1 Cubic centimeter (cm³)</li>
                            <li>1 Cubic millimeter (mm³)</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Imperial Units</h3>
                        <ul className="text-slate-600 space-y-2 text-sm">
                            <li>1 Cubic inch (in³)</li>
                            <li>1 Cubic foot (ft³)</li>
                            <li>1 Gallon (US/UK)</li>
                            <li>1 Quart and Pint</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* Geometry */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Volume Formulas in Geometry</h2>
                <p className="text-slate-600 mb-6">
                    Volume is widely used in geometry to calculate the space occupied by different three-dimensional shapes.
                </p>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-5 border rounded-xl">
                        <Box className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Cube</h4>
                        <p className="text-sm text-slate-600">Volume of a cube</p>
                        <p className="text-sm font-mono mt-2">V = a³</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Ruler className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Cuboid</h4>
                        <p className="text-sm text-slate-600">Rectangular box</p>
                        <p className="text-sm font-mono mt-2">V = l × w × h</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Triangle className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Cylinder</h4>
                        <p className="text-sm text-slate-600">Circular base shape</p>
                        <p className="text-sm font-mono mt-2">V = πr²h</p>
                    </div>

                </div>
            </section>

            {/* Physics */}
            <section className="mb-20 p-8 bg-cyan-50 rounded-2xl border-l-8 border-cyan-500">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <FlaskConical className="text-cyan-600" /> Volume in Physics
                </h3>
                <p className="text-slate-700 mb-4">
                    Volume plays an important role in physics, especially in fluid mechanics and thermodynamics. It is directly related to pressure and temperature in gases.
                </p>
                <p className="font-mono text-cyan-800">
                    PV = nRT
                </p>
                <p className="text-slate-600 mt-4">
                    This ideal gas law shows how pressure, volume, and temperature are interconnected. Changing one variable affects the others.
                </p>
            </section>

            {/* Liquids */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Volume of Liquids</h2>
                <p className="text-slate-600 mb-6">
                    Liquids take the shape of their container but maintain a constant volume. They are commonly measured in liters and milliliters.
                </p>

                <div className="bg-cyan-50 p-6 rounded-xl border-l-8 border-cyan-500">
                    <p className="font-mono text-cyan-800 text-lg">
                        1 L = 1000 mL = 1000 cm³
                    </p>
                </div>
            </section>

            {/* Applications */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Real-World Applications</h2>
                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-5 border rounded-xl">
                        <Droplets className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Water Storage</h4>
                        <p className="text-sm text-slate-600">Used to calculate tank capacities and water usage.</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Box className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Packaging</h4>
                        <p className="text-sm text-slate-600">Helps design containers and storage systems.</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Scale3D className="text-cyan-500 mb-3" />
                        <h4 className="font-bold">Engineering</h4>
                        <p className="text-sm text-slate-600">Important for material calculations and design.</p>
                    </div>

                </div>
            </section>

            {/* Conclusion */}
            <footer className="p-12 bg-slate-50 rounded-3xl text-center">
                <h2 className="text-2xl font-black mb-4">Conclusion</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Volume is a key concept in mathematics and science that helps us understand how much space objects occupy. From geometry formulas to real-world applications like storage, engineering, and fluid systems, mastering volume is essential for accurate calculations and problem-solving.
                </p>
            </footer>

        </div>
    )
}

export default VolumeContent;