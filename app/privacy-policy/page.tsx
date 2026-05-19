import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { ShieldCheck, Lock, EyeOff, DatabaseZap, Mail, Globe } from 'lucide-react'

function PrivacyPage() {
    const lastUpdated = "April 28, 2026";

    const highlights = [
        {
            title: "Local-First",
            desc: "Data never leaves your browser environment.",
            icon: <EyeOff size={24} className="text-blue-600" />
        },
        {
            title: "Zero Persistence",
            desc: "Session data is wiped instantly on refresh.",
            icon: <DatabaseZap size={24} className="text-blue-600" />
        },
        {
            title: "No Tracking",
            desc: "Zero PII collection or cross-site profiling.",
            icon: <Lock size={24} className="text-blue-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* HERO SECTION (Matches About Us Style) */}
                <section className="relative overflow-hidden bg-slate-900 py-24 px-8 text-white">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                            <ShieldCheck size={14} /> Security Documentation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                            Privacy <br />
                            <span className="text-blue-500">Policy.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
                            At Standard Convert, we prioritize your data privacy above all else. Our application is built so your sensitive industrial data remains on your device.
                        </p>
                        <p className="mt-4 text-sm text-slate-500 font-bold uppercase tracking-widest">
                            Effective Date: {lastUpdated}
                        </p>
                    </div>
                    {/* Background Watermark */}
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none text-white">
                        <ShieldCheck size={400} />
                    </div>
                </section>

                {/* HIGHLIGHT BANNER */}
                <section className="py-24 px-8 bg-slate-50/50 border-b border-slate-100">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid md:grid-cols-3 gap-8">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
                                    <div className="mb-6 p-3 bg-slate-50 rounded-2xl inline-block group-hover:bg-blue-50 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTENT BODY */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-4xl space-y-16">

                        {/* 01. Data Collection */}
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6">01. Data Collection and Processing</h2>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8">
                                The core principle of Standard Convert is <span className="text-slate-900 font-bold">Local-First Processing</span>. We do not upload, store, or transmit your file content to our servers or any third-party providers.
                            </p>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-inner">
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-blue-600">Encapsulated Environment</p>
                                    <p className="text-xl font-bold text-slate-900 leading-snug">
                                        Your data is processed entirely within your web browser's temporary memory.
                                    </p>
                                    <div className="h-1 w-20 bg-blue-600" />
                                    <p className="text-sm text-slate-500 font-medium italic">
                                        Zero Persistence: Session data is wiped instantly once the tab is closed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 02. Do Not Collect */}
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6">02. Information We Do Not Collect</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Contents of uploaded files", "Personal identifying info (PII)", "Industrial metadata", "Proprietary schemas"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 shadow-sm">
                                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 03 & 04 Grid */}
                        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">03. Usage Analytics</h3>
                                <p className="text-sm text-slate-500 font-medium leading-loose">
                                    We may collect anonymous technical info such as browser version and conversion categories. This helps us optimize performance and contains <span className="text-blue-600 font-bold">no file data</span>.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">04. Cookies</h3>
                                <p className="text-sm text-slate-500 font-medium leading-loose">
                                    We use minimal local storage for preferences (e.g., Theme selections). We do not use tracking cookies for advertising or cross-site profiling.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT / FOOTER CALLOUT */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-7xl rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                Contact Engineering
                            </h2>
                            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10">
                                If you have questions regarding our local-first architecture or security protocols, please reach out to our engineering team.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <a href="mailto:support@standardconvert.com" className="rounded-full bg-blue-600 px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                                    support@standardconvert.com
                                </a>
                                <div className="h-px w-12 bg-slate-700 hidden md:block" />
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Engineered for Privacy
                                </p>
                            </div>
                        </div>
                        {/* Subtle Watermark */}
                        <Globe size={300} className="absolute -bottom-20 -left-20 text-white opacity-[0.03] pointer-events-none" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default PrivacyPage;
