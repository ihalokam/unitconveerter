import React from 'react';
import {
    Dna,
    Wind,
    Layers,
    Table,
    ArrowDownToLine,
    Zap,
    FlaskConical,
    Cpu,
    Infinity,
    Triangle
} from 'lucide-react';

const PressureContent: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

            {/* Header Section */}
            <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
                        <Dna size={14} /> Technical Reference
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                        What is Pressure? <br /><span className="text-blue-400">Complete Physics Guide</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl font-medium">
                        Learn pressure from fundamentals to advanced fluid dynamics, gas laws, and real-world engineering applications.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Wind size={240} />
                </div>
            </header>

            {/* Introduction */}
            <section className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <ArrowDownToLine size={24} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">What is Pressure?</h2>
                </div>

                <p className="text-lg text-slate-600 mb-6">
                    Pressure is one of the most fundamental concepts in physics and engineering. It describes how force is distributed over a surface. In simple terms, pressure tells us how concentrated a force is when applied to an area.
                </p>

                <p className="text-lg text-slate-600 mb-8">
                    For example, when you press a sharp needle into a surface, it penetrates easily because the force is concentrated into a tiny area, creating high pressure. In contrast, snowshoes prevent sinking into snow by spreading your weight over a larger area, reducing pressure.
                </p>

                <div className="bg-slate-50 border-y border-slate-200 p-10 my-8 text-center rounded-2xl">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">The Governing Equation</p>
                    <span className="text-5xl font-mono font-bold text-slate-900">
                        {`P = F / A`}
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                        <div className="bg-white border p-3 rounded-xl text-sm font-bold">Pressure (P)</div>
                        <div className="bg-white border p-3 rounded-xl text-sm font-bold">Force (F)</div>
                        <div className="bg-white border p-3 rounded-xl text-sm font-bold">Area (A)</div>
                    </div>
                </div>

                <p className="text-slate-600">
                    This simple relationship forms the foundation of fluid mechanics, thermodynamics, and engineering systems. It explains everything from hydraulic machines to atmospheric science.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Scalar Nature */}
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Layers className="text-blue-600" size={20} /> Scalar Nature of Pressure
                    </h3>
                    <p className="text-slate-600 bg-slate-50 p-5 rounded-xl">
                        Pressure is a scalar quantity, meaning it has magnitude but no direction. Unlike force, which acts in a specific direction, pressure at a point inside a fluid acts equally in all directions. This is why liquids and gases exert force uniformly on container walls. This principle explains why a balloon expands evenly and why underwater pressure surrounds the body from every side.
                    </p>
                </section>

                {/* Hydrostatic */}
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Wind className="text-blue-600" size={20} /> Hydrostatic Paradox
                    </h3>
                    <p className="text-slate-600 bg-slate-50 p-5 rounded-xl">
                        The hydrostatic paradox states that pressure at a given depth depends only on the height of the liquid above it, not the shape or volume of the container. This means a narrow tube filled to 10 meters creates the same pressure at the base as a massive tank filled to the same height. This principle is essential in dam construction and fluid storage systems.
                    </p>
                </section>
            </div>

            {/* Units */}
            <section className="my-20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-900 text-white rounded-lg">
                        <Table size={24} />
                    </div>
                    <h2 className="text-3xl font-black">Pressure Units Explained</h2>
                </div>

                <p className="text-slate-600 mb-6">
                    Pressure is measured using different unit systems depending on the industry. Understanding these units is crucial for engineering, physics, and industrial applications.
                </p>

                <div className="overflow-hidden border rounded-2xl shadow-lg">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="p-4 text-xs uppercase">Category</th>
                                <th className="p-4 text-xs uppercase">Units</th>
                                <th className="p-4 text-xs uppercase">Usage</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b">
                                <td className="p-4 font-bold">SI Units</td>
                                <td className="p-4">Pa, kPa, MPa</td>
                                <td className="p-4">Science & Engineering</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Imperial</td>
                                <td className="p-4">psi</td>
                                <td className="p-4">Automotive & Industry</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 font-bold">Manometric</td>
                                <td className="p-4">mmHg, inHg</td>
                                <td className="p-4">Medical & Barometers</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold">Atmospheric</td>
                                <td className="p-4">atm, bar</td>
                                <td className="p-4">Weather & Gas Systems</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Bernoulli */}
            <div className="p-8 border-l-8 border-blue-600 bg-blue-50 rounded-2xl mb-12">
                <h3 className="text-2xl font-black mb-3 flex items-center gap-3">
                    <Zap className="text-blue-600" /> Bernoulli’s Principle
                </h3>
                <p className="text-slate-700">
                    Bernoulli’s Principle states that when the speed of a fluid increases, its pressure decreases. This relationship is critical in aerodynamics and fluid engineering. Airplane wings generate lift because air moves faster over the top surface, reducing pressure and creating an upward force.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

                <div className="p-6 border rounded-2xl shadow-sm">
                    <FlaskConical className="text-blue-600 mb-4" />
                    <h4 className="font-bold mb-2">Gas Compressibility</h4>
                    <p className="text-sm text-slate-600">
                        Gases are highly compressible and follow Boyle’s Law (P₁V₁ = P₂V₂). Increasing pressure reduces volume. This is why gases can be stored in cylinders and used efficiently in engines and industrial systems.
                    </p>
                </div>

                <div className="p-6 border rounded-2xl shadow-sm">
                    <Cpu className="text-blue-600 mb-4" />
                    <h4 className="font-bold mb-2">Pressure vs Stress</h4>
                    <p className="text-sm text-slate-600">
                        Pressure is an external force per unit area, while stress is the internal resistance of a material. Engineers use stress values to determine whether materials like steel can withstand loads without failure.
                    </p>
                </div>
            </div>

            {/* Ideal Gas */}
            <section className="p-10 bg-slate-900 text-white rounded-3xl text-center">
                <Triangle className="mx-auto mb-6 text-blue-400" size={48} />
                <h3 className="text-3xl font-black mb-4">Ideal Gas Law</h3>
                <p className="text-slate-400 mb-6">
                    Pressure, volume, and temperature are interconnected in gases. Changing one affects the others.
                </p>
                <span className="text-5xl font-mono text-blue-400">
                    PV = nRT
                </span>
            </section>

            {/* Conclusion */}
            <footer className="mt-20 p-12 bg-slate-50 rounded-3xl text-center">
                <h2 className="text-2xl font-black mb-4">Conclusion</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Pressure is a core concept that connects physics, engineering, and real-world applications. From hydraulic machines to atmospheric science, understanding pressure helps explain how forces interact with matter and energy in our universe.
                </p>
            </footer>
        </div>
    );
};

export default PressureContent;