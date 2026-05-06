import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Scale, FileCheck, AlertTriangle, Cpu, Gavel, ShieldAlert, Globe } from 'lucide-react'

function page() {
    const lastUpdated = "April 28, 2026";

    const keyTerms = [
        {
            title: "Zero-Server Usage",
            desc: "Licensed for local browser execution only. No data persistence.",
            icon: <Cpu size={24} className="text-blue-600" />
        },
        {
            title: "Industrial Precision",
            desc: "High-precision logic provided 'as is' for professional use.",
            icon: <FileCheck size={24} className="text-blue-600" />
        },
        {
            title: "Risk Mitigation",
            desc: "Users are responsible for verifying critical conversion outputs.",
            icon: <ShieldAlert size={24} className="text-blue-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <Navbar />

            <main>
                {/* HERO SECTION (Matches About Us Style) */}
                <section className="relative overflow-hidden bg-slate-900 py-24 px-8 text-white">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                            <Scale size={14} /> Legal Documentation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                            Terms of <br />
                            <span className="text-blue-500">Service.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
                            By accessing Standard Convert, you agree to our specialized local-first governance protocols. Last updated: {lastUpdated}
                        </p>
                    </div>
                    {/* Background Watermark */}
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                        <Gavel size={400} />
                    </div>
                </section>

                {/* KEY HIGHLIGHTS GRID */}
                <section className="py-24 px-8 bg-slate-50/50 border-b border-slate-100">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid md:grid-cols-3 gap-8">
                            {keyTerms.map((val, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md group">
                                    <div className="mb-6 p-3 bg-slate-50 rounded-2xl inline-block group-hover:bg-blue-50 transition-colors">
                                        {val.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {val.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DETAILED CONTENT SECTION */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="space-y-16">

                            {/* 01. Acceptance */}
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6">01. Acceptance of Terms</h2>
                                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                    By using the Standard Convert interface, you acknowledge that you have read and agree to be bound by these terms. This license is personal, non-transferable, and applies strictly to the use of our browser-based transformation engine.
                                </p>
                            </div>

                            {/* 02. Accuracy Callout */}
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-inner">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-200">
                                        <AlertTriangle size={32} />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">High-Stakes Verification</p>
                                        <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                                            Data Accuracy & User Responsibility
                                        </h3>
                                        <p className="text-slate-500 font-medium">
                                            While we engineer our logic for PSI, Kelvin, and Joule conversions to the highest precision, tools are provided "as is." Verification is mandatory for aerospace, medical, and hazardous material logistics.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 03. Liability */}
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6">03. Limitations of Liability</h2>
                                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                    Standard Convert shall not be held liable for any damages (including loss of data or profit) arising out of the use or inability to use our tools. Since we do not store data, we cannot recover results once you close your browser session.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* COMMITMENT / FOOTER CALLOUT */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-7xl rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                Governing Law
                            </h2>
                            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10">
                                These terms are governed by the laws of the jurisdiction in which Standard Convert is registered. For legal and compliance inquiries, please contact our team.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <a href="mailto:ihalokamofficial@gmail.com" className="rounded-full bg-blue-600 px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                                    ihalokamofficial@gmail.com
                                </a>
                                <div className="h-px w-12 bg-slate-700 hidden md:block" />
                                <p className="text-slate-500 text-sm italic font-medium">Engineered for the Modern Industrial Workflow.</p>
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

export default page