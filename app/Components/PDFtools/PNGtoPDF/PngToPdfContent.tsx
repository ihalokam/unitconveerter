import React from 'react'
import {
  ShieldCheck,
  WifiOff,
  Maximize,
  Layout,
  SlidersHorizontal,
  Move,
  Zap,
  Printer
} from 'lucide-react'

function PngToPdfContent() {
  const features = [
    {
      category: "Privacy First",
      title: "Local Processing",
      desc: "Your data never leaves your device. All image-to-PDF processing happens entirely in your browser.",
      highlights: ["Zero Server Uploads", "Offline Capable Engine"],
      icon: <ShieldCheck className="text-blue-600" size={24} />
    },
    {
      category: "Layout Control",
      title: "Professional Standards",
      desc: "Tailor your PDF to meet any industrial requirement with granular layout settings.",
      highlights: ["A4, Letter, Legal, A3", "Portrait & Landscape"],
      icon: <Layout className="text-blue-600" size={24} />
    },
    {
      category: "Optimization",
      title: "Quality Management",
      desc: "Balance file size and clarity with high-precision compression and scaling options.",
      icon: <SlidersHorizontal className="text-blue-600" size={24} />
    }
  ];

  return (
    <section className="py-24 px-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
            <Zap size={14} className="text-blue-600" /> Utility Documentation
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">
            🛠️ Key <span className="text-blue-600">Features</span>
          </h2>
          <div className="h-1 w-24 bg-blue-600 rounded-full" />
        </div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          {features.map((feat, idx) => (
            <div key={idx} className="group relative">
              <div className="mb-6 inline-block p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors border border-slate-100">
                {feat.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">{feat.category}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                {feat.desc}
              </p>
              {feat.highlights && (
                <div className="flex flex-wrap gap-2">
                  {feat.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-md uppercase tracking-tighter">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Breakdown Panels */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Optimization Card */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Maximize size={20} className="text-blue-400" /> Optimization & Quality
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-400 text-sm font-medium border-b border-slate-800 pb-4 group-hover:text-white transition-colors">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span><strong>Variable Quality:</strong> Low, Medium, and High compression options.</span>
                </li>
                <li className="flex items-center gap-4 text-slate-400 text-sm font-medium border-b border-slate-800 pb-4 group-hover:text-white transition-colors">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span><strong>Grayscale Mode:</strong> Save ink with professional-looking scans.</span>
                </li>
                <li className="flex items-center gap-4 text-slate-400 text-sm font-medium group-hover:text-white transition-colors">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span><strong>Fit to Page:</strong> Automatic scaling without clipping images.</span>
                </li>
              </ul>
            </div>
            <Printer size={180} className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none" />
          </div>

          {/* Experience Card */}
          <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 group">
            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Move size={20} className="text-blue-600" /> Seamless User Experience
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                  <Move size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Drag-and-Drop Reordering</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Change page sequences easily before generation.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                  <Zap size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Custom Naming</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Set your Filename before exporting for instant organization.</p>
                </div>
              </div>

              {/* PRO TIP BADGE */}
              <div className="mt-4 p-4 bg-blue-600 rounded-2xl text-white flex items-center gap-4 shadow-lg shadow-blue-200">
                <WifiOff size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] opacity-80">Pro-Tip</p>
                  <p className="text-xs font-bold">100% Client-Side: Works without an internet connection!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PngToPdfContent