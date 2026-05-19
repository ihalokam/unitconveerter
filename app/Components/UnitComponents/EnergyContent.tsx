import React from 'react';
import {
    Zap,
    Flame,
    Battery,
    Atom,
    Sun,
    Wind,
    Triangle
} from 'lucide-react';

function EnergyContent() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

            {/* Header */}
            <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/30">
                        <Zap size={14} /> Physics Concept
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        What is Energy? <br /><span className="text-yellow-400">Complete Scientific Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl font-medium">
                        Learn energy, its types, units, formulas, and real-world applications in physics and engineering.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Flame size={240} />
                </div>
            </header>

            {/* Intro */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">What is Energy?</h2>
                <p className="text-lg text-slate-600 mb-6">
                    Energy is the ability to do work. It is one of the most fundamental concepts in physics and is present in every system, from microscopic particles to massive galaxies. Energy allows objects to move, heat to flow, light to shine, and machines to operate.
                </p>

                <p className="text-lg text-slate-600 mb-6">
                    Energy cannot be created or destroyed; it can only be transformed from one form to another. This principle is known as the Law of Conservation of Energy and is a cornerstone of physics and engineering.
                </p>

                <div className="bg-slate-50 p-10 rounded-2xl text-center border">
                    <p className="text-sm uppercase text-slate-400 mb-3">SI Unit</p>
                    <span className="text-4xl font-mono font-bold text-slate-900">
                        Joule (J)
                    </span>
                </div>
            </section>

            {/* Types */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Forms of Energy</h2>
                <p className="text-slate-600 mb-6">
                    Energy exists in multiple forms, and understanding these types is essential in science and real-world applications.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2"><Zap size={18} /> Kinetic Energy</h3>
                        <p className="text-sm text-slate-600">Energy possessed by an object due to motion.</p>
                        <p className="font-mono mt-2">KE = ½mv²</p>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2"><Triangle size={18} /> Potential Energy</h3>
                        <p className="text-sm text-slate-600">Stored energy based on position or configuration.</p>
                        <p className="font-mono mt-2">PE = mgh</p>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2"><Battery size={18} /> Electrical Energy</h3>
                        <p className="text-sm text-slate-600">Energy due to movement of electric charges.</p>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2"><Flame size={18} /> Thermal Energy</h3>
                        <p className="text-sm text-slate-600">Energy related to heat and temperature.</p>
                    </div>

                </div>
            </section>

            {/* Units */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Units of Energy</h2>
                <p className="text-slate-600 mb-6">
                    Energy is measured in different units depending on context and scale.
                </p>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Scientific Units</h3>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li>Joule (J) – SI unit</li>
                            <li>Kilojoule (kJ)</li>
                            <li>Calorie (cal)</li>
                            <li>Kilocalorie (kcal)</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-3">Electrical Units</h3>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li>Watt-hour (Wh)</li>
                            <li>Kilowatt-hour (kWh)</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* Physics Law */}
            <section className="mb-20 p-8 bg-yellow-50 rounded-2xl border-l-8 border-yellow-500">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Atom className="text-yellow-600" /> Law of Conservation of Energy
                </h3>
                <p className="text-slate-700">
                    Energy cannot be created or destroyed, only transformed from one form to another. For example, in a falling object, potential energy converts into kinetic energy. This principle ensures total energy remains constant in a closed system.
                </p>
            </section>

            {/* Real World */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Real-World Applications</h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="p-5 border rounded-xl">
                        <Sun className="text-yellow-500 mb-3" />
                        <h4 className="font-bold">Solar Energy</h4>
                        <p className="text-sm text-slate-600">Sunlight converted into electricity using solar panels.</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Wind className="text-yellow-500 mb-3" />
                        <h4 className="font-bold">Wind Energy</h4>
                        <p className="text-sm text-slate-600">Wind turbines convert kinetic energy into electrical power.</p>
                    </div>

                    <div className="p-5 border rounded-xl">
                        <Battery className="text-yellow-500 mb-3" />
                        <h4 className="font-bold">Batteries</h4>
                        <p className="text-sm text-slate-600">Store chemical energy and convert it to electrical energy.</p>
                    </div>

                </div>
            </section>

            {/* Conclusion */}
            <footer className="p-12 bg-slate-50 rounded-3xl text-center">
                <h2 className="text-2xl font-black mb-4">Conclusion</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Energy is a universal concept that powers everything around us. From motion and heat to electricity and renewable resources, understanding energy helps explain how the physical world works and enables technological advancements.
                </p>
            </footer>

        </div>
    )
}

export default EnergyContent;