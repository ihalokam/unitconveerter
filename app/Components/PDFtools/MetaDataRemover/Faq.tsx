import React from 'react'
import { HelpCircle, ChevronDown, ShieldCheck, Zap, Lock } from 'lucide-react'

function Faq() {
    const faqs = [
        {
            q: "What metadata is removed from my PDF?",
            a: "StandardConvert strips all key /Info entries including /Title, /Author, /Subject, /Keywords, /Creator, /Producer, and both Creation and Modification dates."
        },
        {
            q: "Does this remove hidden XMP metadata packets?",
            a: "Yes. Our deep-scrub engine removes XMP metadata packets and /Metadata stream references that many other tools miss entirely."
        },
        {
            q: "Is it safe to process sensitive legal documents?",
            a: "You don't upload anything. The scrubbing is done 100% locally in your browser. Your document never touches a StandardConvert server."
        },
        {
            q: "Why should I remove PDF metadata before sharing?",
            a: "Metadata can leak your name, your company's software versions, exact creation dates, and even GPS location data hidden in the /Info entries."
        },
        {
            q: "Does scrubbing metadata change the look of my PDF?",
            a: "No. The visual content remains identical. We only strip the hidden background data strings that identify document origin."
        },
        {
            q: "Can I remove metadata from a password-protected PDF?",
            a: "You must unlock the PDF first so the engine can access and scrub the trailer entries and metadata streams."
        },
        {
            q: "What are /Info trailer entries?",
            a: "These are specific locations in a PDF file's code where document history (Producer, Creator, ModDate) is stored. We purge these completely."
        },
        {
            q: "Does removing metadata reduce the PDF file size?",
            a: "Usually yes, but the reduction is minimal as text-based metadata streams are small compared to image content."
        },
    ];

    return (
        <section className="py-24 px-8 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-4xl">

                {/* Header — matches PNGtoPDF/Faq style */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 mb-4">
                        <HelpCircle size={14} className="text-blue-600" /> StandardConvert Knowledge Base
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
                        Security <span className="text-blue-600">Q&A</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto">
                        Everything you need to know about how we strip metadata privately, locally, and securely.
                    </p>
                </div>

                {/* FAQ Accordion — matches PNGtoPDF/Faq numbered style */}
                <div className="space-y-4">
                    {faqs.map((item, idx) => (
                        <div
                            key={idx}
                            className="group border border-slate-200 rounded-[1.5rem] bg-white transition-all hover:border-blue-300 hover:shadow-md"
                        >
                            <details className="w-full">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="flex items-center gap-4 pr-4">
                                        <span className="text-blue-600/30 font-mono text-sm font-bold shrink-0">
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

                {/* Trust Badge — matches PNGtoPDF/Faq bottom panel */}
                <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-white text-xl font-bold mb-2">Secure. Local. Zero Traces.</h4>
                        <p className="text-slate-400 text-sm mb-6">StandardConvert.com is built privacy-first — your documents are processed entirely in your browser's memory.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                                <Lock size={12} /> StandardConvert Privacy
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