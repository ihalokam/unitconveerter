import React from 'react'
import { HelpCircle, ChevronDown, ShieldCheck, Zap, Lock, Globe } from 'lucide-react'

function Faq() {
    const faqData = [
        {
            q: "Is it safe to convert my sensitive images to PDF on StandardConverter.com?",
            a: "Absolutely. StandardConverter.com uses a 'Zero-Server' architecture. Your images are never uploaded; the conversion happens entirely within your browser's local memory, ensuring your sensitive industrial data never leaves your device."
        },
        {
            q: "Can I use StandardConverter without an internet connection?",
            a: "Yes. Once the tool is loaded, StandardConverter.com operates locally. You can convert PNG, JPG, and WebP files to PDF completely offline, making it ideal for secure, low-connectivity industrial sites."
        },
        {
            q: "What is the file size limit for StandardConverter?",
            a: "We do not impose artificial file size limits. Since StandardConverter.com utilizes your local machine's hardware for processing, your only limit is the available RAM on your computer or mobile device."
        },
        {
            q: "How does StandardConverter.com handle multiple file merges?",
            a: "You can drag and drop dozens of files simultaneously. StandardConverter allows you to reorder these pages visually before generating the final PDF to ensure a professional sequence."
        },
        {
            q: "Will my PDF output be high-resolution?",
            a: "Yes. StandardConverter.com is engineered for industrial precision. By selecting our 'High' quality setting, the PDF preserves the original DPI of your source images for crisp, clear documentation."
        },
        {
            q: "Is there a cost to use the professional layout features?",
            a: "StandardConverter.com provides professional-grade layout control—including A4, Letter, and Legal sizing—completely free. Our goal is to provide a reliable utility for global engineering standards."
        },
        {
            q: "Does StandardConverter.com collect any metadata?",
            a: "No. Our privacy-by-design approach means we do not collect industrial metadata, proprietary schemas, or personal identifying information. Your workflow is completely anonymous."
        },
        {
            q: "How do I ensure my PDFs are ink-friendly for printing?",
            a: "StandardConverter includes a 'Grayscale' toggle in the optimization panel, allowing you to convert colored photos into black-and-white PDFs, saving ink and creating a clean scanned look."
        },
        {
            q: "Is StandardConverter.com compatible with mobile browsers?",
            a: "Yes. It is fully optimized for mobile Chrome and Safari. You get the same local-processing power on your phone as you do on a desktop, without needing to install an app."
        },
        {
            q: "Why should I choose StandardConverter over other online tools?",
            a: "StandardConverter.com is the only tool that combines 'Zero-Server' privacy with high-precision industrial layout controls. It is built for professionals who cannot risk data exposure on cloud servers."
        }
    ];

    return (
        <section className="py-24 px-8 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl">

                {/* SEO Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
                        <HelpCircle size={14} className="text-blue-600" /> StandardConverter Knowledge Base
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
                        FAQ<span className="text-blue-600">s</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto">
                        Clarifying the technical standards behind the world's most secure local-first conversion engine.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData.map((item, idx) => (
                        <div
                            key={idx}
                            className="group border border-slate-200 rounded-[1.5rem] bg-white transition-all hover:border-blue-300 hover:shadow-md"
                        >
                            <details className="w-full">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="flex items-center gap-4 pr-4">
                                        <span className="text-blue-600/30 font-mono text-sm font-bold">
                                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                        </span>
                                        <h3 className="text-base font-bold text-slate-900 group-open:text-blue-600 transition-colors text-left">
                                            {item.q}
                                        </h3>
                                    </span>
                                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                                </summary>
                                <div className="px-6 pb-6 text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                                    <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl">
                                        <Zap size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                        <p>{item.a}</p>
                                    </div>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-white text-xl font-bold mb-2">Secure. Standard. Local.</h4>
                        <p className="text-slate-400 text-sm mb-6">StandardConverter.com is updated regularly to meet evolving global data security standards.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                                <Lock size={12} /> StandardConverter Privacy
                            </span>
                        </div>
                    </div>
                    <ShieldCheck size={200} className="absolute -right-20 -bottom-20 text-white opacity-[0.03] pointer-events-none" />
                </div>
            </div>
        </section>
    )
}

export default Faq