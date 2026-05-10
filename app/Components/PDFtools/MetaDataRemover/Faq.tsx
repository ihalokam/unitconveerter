import React from 'react'
import { ChevronDown, Zap } from 'lucide-react'

function Faq() {
    const faqs = [
        { q: "What metadata is removed from my PDF?", a: "StandardConverter strips all key entries including /Title, /Author, /Subject, /Keywords, /Creator, /Producer, and both Creation and Modification dates." },
        { q: "Does this remove hidden XMP metadata packets?", a: "Yes. Our deep-scrub engine removes XMP metadata packets and /Metadata stream references that many other tools miss." },
        { q: "Is it safe to upload sensitive legal documents?", a: "You don't upload anything. The scrubbing is done 100% locally in your browser. Your document never touches a StandardConverter server." },
        { q: "Why should I remove PDF metadata before sharing?", a: "Metadata can leak your name, your company's software versions, exact creation dates, and even GPS location data hidden in the /Info entries." },
        { q: "Does scrubbing metadata change the look of my PDF?", a: "No. The visual content remains identical. We only strip the hidden background data strings that identify document origin." },
        { q: "Can I remove metadata from a password-protected PDF?", a: "You must unlock the PDF first so the engine can access and scrub the trailer entries and metadata streams." },
        { q: "What are /Info trailer entries?", a: "These are specific locations in a PDF file's code where document history (Producer, Creator, ModDate) is stored. We purge these completely." },
        { q: "Does your tool remove the 'Trapped' metadata flag?", a: "Yes, our engine specifically targets and removes the /Trapped flag along with other print-related identifiers." },
        { q: "Is this tool free for industrial use?", a: "StandardConverter.com provides this as a free utility for professionals who need an industrial-grade, local-first sanitization tool." },
        { q: "Does removing metadata reduce the PDF file size?", a: "Usually yes, but the reduction is minimal as text-based metadata streams are small compared to image content." }
    ];

    return (
        <section className="py-24 px-8 bg-white">
            <div className="mx-auto max-w-4xl">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12 text-center uppercase">
                    Security <span className="text-blue-600">Q&A</span>
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden">
                            <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                                {faq.q}
                                <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="p-6 pt-0 text-sm text-slate-500 font-medium bg-slate-50/50">
                                <div className="flex gap-3">
                                    <Zap size={16} className="text-blue-600 shrink-0 mt-1" />
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Faq