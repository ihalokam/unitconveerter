import React from 'react';
import { ShieldCheck, Lock, HardDrive, EyeOff, ServerOff, CheckCircle } from 'lucide-react';

function Trust() {
    const securityFeatures = [
        { text: "No Data Storage", icon: <ServerOff size={18} /> },
        { text: "No Hidden Uploads", icon: <EyeOff size={18} /> },
        { text: "No Third-Party Access", icon: <Lock size={18} /> },
        { text: "Everything Runs Locally", icon: <HardDrive size={18} /> },
    ];

    return (
        <section className="bg-slate-50 py-20 px-6 border-y border-slate-200">
            <div className="max-w-5xl mx-auto">

                {/* Heading & Subtext */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                        <ShieldCheck size={14} /> Edge Computing Security
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900">
                        Your Data Stays With You
                    </h2>
                    <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto font-medium">
                        Built with privacy as the foundation—your files are processed entirely on your device, not our servers.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">

                    {/* Background Pattern Hint */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.03] pointer-events-none text-slate-900">
                        <ShieldCheck size={300} />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We designed this platform with one principle first: <span className="text-slate-900 font-bold underline decoration-emerald-400 decoration-2">your data is yours</span>.
                                All file processing—whether CSV or Excel—happens directly in your browser's RAM.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                In professional environments like <span className="font-semibold text-slate-800">engineering, finance, and research</span>,
                                even small datasets can be sensitive. This tool ensures you can work with confidence, knowing your data never leaves your local environment.
                            </p>

                            <div className="pt-6 border-t border-slate-100">
                                <p className="text-slate-500 italic text-sm">
                                    "Data isn’t just numbers—it represents real work, decisions, and value. We keep it fully under your control."
                                </p>
                            </div>
                        </div>

                        {/* Security Points Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {securityFeatures.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-5 transition-all hover:border-emerald-300 hover:bg-emerald-50/30 group"
                                >
                                    <div className="p-2 rounded-lg bg-white shadow-sm text-slate-400 group-hover:text-emerald-600 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <span className="font-bold text-slate-700 tracking-tight">
                                        {feature.text}
                                    </span>
                                    <CheckCircle size={16} className="ml-auto text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Footnote */}
                <div className="mt-8 flex justify-center items-center gap-6 text-slate-400 grayscale opacity-70">
                    <span className="text-[10px] font-black uppercase tracking-widest">WASM Processing</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Compliant environment</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Zero Server Logs</span>
                </div>
            </div>
        </section>
    );
}

export default Trust;