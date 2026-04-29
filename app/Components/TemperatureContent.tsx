import React from 'react';
import {
    Thermometer,
    Flame,
    Snowflake,
    Atom,
    Zap,
    Gauge,
    Triangle,
    Wind
} from 'lucide-react';

function TemperatureContent() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

            {/* Header */}
            <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6 border border-orange-500/30">
                        <Thermometer size={14} /> Thermal Physics
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        What is Temperature? <br /><span className="text-orange-400">Complete Scientific Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl font-medium">
                        Understand temperature from molecular motion to thermodynamics, heat transfer, and real-world applications.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Flame size={240} />
                </div>
            </header>

            {/* Intro */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">What is Temperature?</h2>
                <p className="text-lg text-slate-600 mb-6">
                    Temperature is a fundamental physical quantity that measures the degree of hotness or coldness of a substance. At a microscopic level, temperature is directly related to the average kinetic energy of particles such as atoms and molecules. The faster these particles move, the higher the temperature.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                    In everyday life, temperature determines weather conditions, cooking processes, and even how machines operate. In science and engineering, it plays a crucial role in thermodynamics, material science, and energy systems.
                </p>

                <div className="bg-slate-50 p-10 rounded-2xl text-center border">
                    <p className="text-sm uppercase text-slate-400 mb-3">Core Concept</p>
                    <span className="text-4xl font-mono font-bold text-slate-900">
                        Temperature ∝ Average Kinetic Energy
                    </span>
                </div>
            </section>

            {/* Sections */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">

                <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <Atom className="text-orange-500" /> Microscopic View
                    </h3>
                    <p className="text-slate-600">
                        Temperature reflects how fast particles move inside a substance. In gases, molecules move freely and rapidly, while in solids they vibrate in fixed positions. This microscopic motion defines thermal energy and directly influences physical states.
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <Snowflake className="text-blue-500" /> Absolute Zero
                    </h3>
                    <p className="text-slate-600">
                        Absolute zero (0 Kelvin or -273.15°C) is the lowest possible temperature where particle motion nearly stops. It represents a theoretical limit in physics and is essential in quantum mechanics and cryogenics.
                    </p>
                </div>

            </div>

            {/* Units */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-6">Temperature Units</h2>
                <p className="text-slate-600 mb-6">
                    Temperature is measured using different scales depending on the application. Each scale has a unique reference point and use case.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 border rounded-xl">
                        <h4 className="font-bold mb-2">Celsius (°C)</h4>
                        <p className="text-sm text-slate-600">Used in daily life and scientific contexts. Water freezes at 0°C and boils at 100°C.</p>
                    </div>
                    <div className="p-5 border rounded-xl">
                        <h4 className="font-bold mb-2">Fahrenheit (°F)</h4>
                        <p className="text-sm text-slate-600">Common in the United States. Based on historical calibration points.</p>
                    </div>
                    <div className="p-5 border rounded-xl">
                        <h4 className="font-bold mb-2">Kelvin (K)</h4>
                        <p className="text-sm text-slate-600">Scientific standard. Starts at absolute zero and is used in thermodynamics.</p>
                    </div>
                </div>
            </section>

            {/* Heat Transfer */}
            <section className="mb-20 p-8 bg-orange-50 rounded-2xl border-l-8 border-orange-500">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                    <Wind className="text-orange-500" /> Heat vs Temperature
                </h3>
                <p className="text-slate-700">
                    Temperature is not the same as heat. Temperature measures the intensity of thermal energy, while heat refers to the transfer of energy between objects due to temperature difference. Heat flows from higher temperature to lower temperature until equilibrium is reached.
                </p>
            </section>

            {/* Thermodynamics */}
            <section className="grid md:grid-cols-2 gap-8 mb-20">

                <div className="p-6 border rounded-xl">
                    <Zap className="text-orange-500 mb-3" />
                    <h4 className="font-bold mb-2">Thermal Expansion</h4>
                    <p className="text-sm text-slate-600">
                        Most materials expand when heated and contract when cooled. This principle is important in construction, bridges, and engineering systems.
                    </p>
                </div>

                <div className="p-6 border rounded-xl">
                    <Gauge className="text-orange-500 mb-3" />
                    <h4 className="font-bold mb-2">Temperature & Pressure</h4>
                    <p className="text-sm text-slate-600">
                        In gases, temperature directly affects pressure. Increasing temperature increases molecular motion, which raises pressure if volume is constant.
                    </p>
                </div>

            </section>

            {/* Ideal Gas */}
            <section className="p-10 bg-slate-900 text-white rounded-3xl text-center mb-20">
                <Triangle className="mx-auto mb-6 text-orange-400" size={48} />
                <h3 className="text-3xl font-black mb-4">Temperature in Gas Laws</h3>
                <p className="text-slate-400 mb-6">
                    Temperature plays a critical role in thermodynamics and gas behavior.
                </p>
                <span className="text-4xl font-mono text-orange-400">
                    PV = nRT
                </span>
            </section>

            {/* Conclusion */}
            <footer className="p-12 bg-slate-50 rounded-3xl text-center">
                <h2 className="text-2xl font-black mb-4">Conclusion</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Temperature is a core concept in physics that connects microscopic particle motion to macroscopic phenomena like heat transfer, weather, and energy systems. Understanding temperature helps explain everything from everyday experiences to advanced scientific processes.
                </p>
            </footer>

        </div>
    )
}

export default TemperatureContent;