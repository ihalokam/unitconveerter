import React from 'react'
import { FileSearch, Settings2, ShieldCheck, Download } from 'lucide-react'

function Guide() {
    const steps = [
        { icon: <FileSearch />, title: "Load Document", desc: "Select the PDF from your device. StandardConverter scans the file structure." },
        { icon: <Settings2 />, title: "Analyze Streams", desc: "Our engine locates hidden /Info trailer entries and XMP packets." },
        { icon: <ShieldCheck />, title: "Scrub Headers", desc: "Metadata references are purged from the /Creator and /Producer fields." },
        { icon: <Download />, title: "Secure Export", desc: "Download your sanitized PDF. No server history or logs are created." }
    ];

    return (
        <section className="py-24 px-8 bg-slate-50 border-y border-slate-200">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-center text-3xl font-black uppercase tracking-tighter mb-16 underline decoration-blue-600 underline-offset-8 italic">
                    The Sanitization Workflow
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="text-center">
                            <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-sm transition-transform hover:scale-110">
                                {step.icon}
                            </div>
                            <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">{step.title}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Guide