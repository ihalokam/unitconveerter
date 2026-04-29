import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Mail, MessageSquare, Globe, ShieldCheck, Clock, ArrowRight } from 'lucide-react'

function page() {
    const contactChannels = [
        {
            title: "Technical Support",
            desc: "Questions regarding conversion logic, batch processing, or API integration.",
            email: "ihalokamofficial@gmail.com",
            icon: <MessageSquare size={24} className="text-blue-600" />
        },
        {
            title: "Legal & Compliance",
            desc: "Inquiries regarding our Zero-Server architecture and data privacy protocols.",
            email: "ihalokamofficial@gmail.com",
            icon: <ShieldCheck size={24} className="text-blue-600" />
        },
        {
            title: "General Inquiries",
            desc: "Partnerships, feedback, or general questions about our industrial tools.",
            email: "ihalokamofficial@gmail.com",
            icon: <Globe size={24} className="text-blue-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* HERO SECTION */}
                <section className="relative overflow-hidden bg-slate-900 py-24 px-8 text-white">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                            <Clock size={14} /> Response Time: &lt; 24h
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                            Get in <br />
                            <span className="text-blue-500">Touch.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
                            Have questions about our batch conversion engine? Our engineering team is ready to assist with your industrial data requirements.
                        </p>
                    </div>
                    {/* Background Watermark */}
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none text-white">
                        <Mail size={400} />
                    </div>
                </section>

                {/* CONTACT CHANNELS GRID */}
                <section className="py-24 px-8 bg-slate-50/50 border-b border-slate-100">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid md:grid-cols-3 gap-8">
                            {contactChannels.map((channel, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
                                    <div className="mb-6 p-3 bg-slate-50 rounded-2xl inline-block group-hover:bg-blue-50 transition-colors">
                                        {channel.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{channel.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                                        {channel.desc}
                                    </p>
                                    <a
                                        href={`mailto:${channel.email}`}
                                        className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
                                    >
                                        Send Message <ArrowRight size={14} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FORM / DETAILED CONTACT SECTION */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6 italic underline decoration-blue-600 underline-offset-8">
                            Global Operations
                        </h2>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium mb-12">
                            BatchUnits operates as a decentralized industrial utility. While our processing is local-first, our support team is distributed across major engineering hubs to ensure continuous uptime and assistance.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-inner">
                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Direct Support</h4>
                                <p className="text-2xl font-bold text-slate-900 mb-4">ihalokamofficial@gmail.com</p>
                                <p className="text-sm text-slate-500 font-medium">For urgent technical issues regarding the conversion pipeline.</p>
                            </div>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-inner">
                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Enterprise Solutions</h4>
                                <p className="text-2xl font-bold text-slate-900 mb-4">ihalokamofficial@gmail.com</p>
                                <p className="text-sm text-slate-500 font-medium">For custom unit mapping and corporate implementation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CALLOUT */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-7xl rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                Start Converting Now
                            </h2>
                            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10">
                                No account required. No data collected. Experience the power of local-first industrial data synchronization.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <button className="rounded-full bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                                    Launch Batch Engine
                                </button>
                                <div className="h-px w-12 bg-slate-700 hidden md:block" />
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    BatchUnits v4.0 Industrial
                                </p>
                            </div>
                        </div>
                        {/* Subtle Watermark */}
                        <MessageSquare size={300} className="absolute -bottom-20 -left-20 text-white opacity-[0.03] pointer-events-none" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default page