import React from 'react';
import {
  Weight,
  Scale,
  Atom,
  Globe,
  Box,
  Triangle,
  Zap
} from 'lucide-react';

function MassCintent() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white text-slate-800 font-sans leading-relaxed">

      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 mb-16 text-white shadow-2xl">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6 border border-purple-500/30">
            <Weight size={14} /> Physical Quantity
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            What is Mass? <br /><span className="text-purple-400">Complete Physics Guide</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">
            Learn mass, units, formulas, and its role in physics, motion, and real-world systems.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Scale size={240} />
        </div>
      </header>

      {/* Intro */}
      <section className="mb-20">
        <h2 className="text-3xl font-black mb-6">What is Mass?</h2>
        <p className="text-lg text-slate-600 mb-6">
          Mass is a fundamental physical quantity that measures the amount of matter present in an object. It is one of the most important properties in physics and does not change regardless of location. Unlike weight, which depends on gravity, mass remains constant whether you are on Earth, the Moon, or in space.
        </p>
        <p className="text-lg text-slate-600 mb-6">
          Mass also represents an object's resistance to acceleration, a property known as inertia. The greater the mass, the more force is required to change its motion. This concept is central to Newtonian mechanics and modern physics.
        </p>

        <div className="bg-slate-50 p-10 rounded-2xl text-center border">
          <p className="text-sm uppercase text-slate-400 mb-3">SI Unit</p>
          <span className="text-4xl font-mono font-bold text-slate-900">
            Kilogram (kg)
          </span>
        </div>
      </section>

      {/* Units */}
      <section className="mb-20">
        <h2 className="text-3xl font-black mb-6">Units of Mass</h2>
        <p className="text-slate-600 mb-6">
          Mass is measured using both metric and imperial systems depending on the application and region.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold mb-3">Metric Units</h3>
            <ul className="text-slate-600 space-y-2 text-sm">
              <li>1 Kilogram (kg) = base unit</li>
              <li>1 Gram (g) = 0.001 kg</li>
              <li>1 Milligram (mg) = 0.000001 kg</li>
              <li>1 Tonne (t) = 1000 kg</li>
            </ul>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold mb-3">Imperial Units</h3>
            <ul className="text-slate-600 space-y-2 text-sm">
              <li>1 Pound (lb) ≈ 0.4536 kg</li>
              <li>1 Ounce (oz) = 1/16 pound</li>
              <li>1 Ton (US) ≈ 907 kg</li>
              <li>1 Ton (UK) ≈ 1016 kg</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Physics */}
      <section className="mb-20 p-8 bg-purple-50 rounded-2xl border-l-8 border-purple-500">
        <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
          <Atom className="text-purple-600" /> Mass in Physics
        </h3>
        <p className="text-slate-700 mb-4">
          Mass plays a critical role in physics. It is directly related to force and acceleration through Newton’s Second Law of Motion.
        </p>
        <p className="font-mono text-purple-800">
          F = m × a
        </p>
        <p className="text-slate-600 mt-4">
          This equation shows that the force applied to an object is equal to its mass multiplied by its acceleration. A larger mass requires more force to accelerate.
        </p>
      </section>

      {/* Mass vs Weight */}
      <section className="mb-20">
        <h2 className="text-3xl font-black mb-6">Mass vs Weight</h2>
        <p className="text-slate-600 mb-6">
          Mass and weight are often confused, but they are different physical quantities.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl">
            <h4 className="font-bold mb-2">Mass</h4>
            <p className="text-sm text-slate-600">
              Amount of matter in an object. Constant everywhere. Measured in kilograms.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h4 className="font-bold mb-2">Weight</h4>
            <p className="text-sm text-slate-600">
              Force due to gravity acting on mass. Changes with location.
            </p>
            <p className="font-mono text-purple-700 mt-2">
              W = m × g
            </p>
          </div>
        </div>
      </section>

      {/* Density */}
      <section className="mb-20">
        <h2 className="text-3xl font-black mb-6">Mass and Density</h2>
        <p className="text-slate-600 mb-6">
          Density is a property that relates mass to volume. It describes how compact matter is within a given space.
        </p>

        <div className="bg-purple-50 p-6 rounded-xl border-l-8 border-purple-500">
          <p className="font-mono text-purple-800 text-lg">
            Density = Mass / Volume
          </p>
        </div>
      </section>

      {/* Energy */}
      <section className="mb-20 p-8 bg-slate-900 text-white rounded-3xl text-center">
        <Triangle className="mx-auto mb-6 text-purple-400" size={48} />
        <h3 className="text-3xl font-black mb-4">Mass–Energy Relation</h3>
        <p className="text-slate-400 mb-6">
          In modern physics, mass and energy are equivalent as described by Einstein’s famous equation.
        </p>
        <span className="text-4xl font-mono text-purple-400">
          E = mc²
        </span>
      </section>

      {/* Applications */}
      <section className="mb-20">
        <h2 className="text-3xl font-black mb-6">Real-World Applications</h2>
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-5 border rounded-xl">
            <Globe className="text-purple-500 mb-3" />
            <h4 className="font-bold">Astronomy</h4>
            <p className="text-sm text-slate-600">Mass determines gravitational attraction between planets.</p>
          </div>

          <div className="p-5 border rounded-xl">
            <Box className="text-purple-500 mb-3" />
            <h4 className="font-bold">Engineering</h4>
            <p className="text-sm text-slate-600">Mass is crucial in structural design and load calculations.</p>
          </div>

          <div className="p-5 border rounded-xl">
            <Zap className="text-purple-500 mb-3" />
            <h4 className="font-bold">Energy Systems</h4>
            <p className="text-sm text-slate-600">Mass is converted into energy in nuclear reactions.</p>
          </div>

        </div>
      </section>

      {/* Conclusion */}
      <footer className="p-12 bg-slate-50 rounded-3xl text-center">
        <h2 className="text-2xl font-black mb-4">Conclusion</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Mass is a fundamental property of matter that plays a vital role in physics, engineering, and everyday life. From motion and force to energy and gravity, understanding mass helps explain how the physical world behaves and enables accurate scientific calculations.
        </p>
      </footer>

    </div>
  )
}

export default MassCintent;