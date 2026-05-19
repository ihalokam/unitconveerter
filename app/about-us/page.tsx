import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import {
    ShieldCheck,
    Target,
    Cpu,
    Zap,
    Globe,
    Microscope,
    ArrowRight
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Standard Convert – Privacy-First Browser Tools',
    description: 'Learn about Standard Convert – a privacy-first tool suite with zero-server architecture for engineers and professionals. 100% client-side processing.',
    alternates: { canonical: 'https://standardconvert.com/about-us' },
    openGraph: {
        title: 'About Standard Convert – Privacy-First Browser Tools',
        description: 'Learn about Standard Convert – a privacy-first tool suite with zero-server architecture for engineers and professionals.',
        url: 'https://standardconvert.com/about-us',
        siteName: 'Standard Convert',
        type: 'website',
        images: [{ url: 'https://standardconvert.com/og.webp', width: 1200, height: 630, alt: 'About Standard Convert' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Standard Convert – Privacy-First Browser Tools',
        description: 'A privacy-first tool suite with zero-server architecture for engineers and professionals.',
        images: ['https://standardconvert.com/og.webp'],
    },
}

function AboutPage() {
    const values = [
        {
            title: "Zero-Server Architecture",
            desc: "Our engine lives in your browser. Files never touch a remote server, eliminating leak risks and ensuring compliance with industrial security standards.",
            icon: <ShieldCheck className="text-blue-600" size={24} />
        },
        {
            title: "Industrial-Grade Precision",
            desc: "Engineered for aerospace and thermodynamics where decimals matter. We handle PSI, Kelvin, Joules, and more with high-precision logic.",
            icon: <Target className="text-blue-600" size={24} />
        },
        {
            title: "Modern Workflow",
            desc: "A streamlined 4-step pipeline designed to take the friction out of bulk data transformation without a steep learning curve.",
            icon: <Cpu className="text-blue-600" size={24} />
        }
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-slate-900 font-sans">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-slate-900 py-24 px-8 text-white">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-blue-500/30">
                            Established 2026
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                            Precision at Scale, <br />
                            <span className="text-blue-500">Privacy by Design.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
                            Standard Convert was engineered to bridge the gap between complex industrial data requirements and the uncompromising need for data privacy.
                        </p>
                    </div>
                    {/* Background Graphic */}
                    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                        <Globe size={400} />
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 px-8 border-b border-slate-100">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-6 flex items-center gap-3">
                                    <Microscope size={28} className="text-blue-600" /> Our Mission
                                </h2>
                                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                    Our mission is to empower engineers, data scientists, and industrial professionals with high-performance transformation tools that operate entirely within the browser.
                                    <br /><br />
                                    We believe that professional-grade utility shouldn't come at the cost of data security. By prioritizing <span className="text-slate-900 font-bold">Local-First</span> processing, we give you back control over your most sensitive datasets.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-inner">
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Core Philosophy</p>
                                    <p className="text-2xl font-bold text-slate-900 leading-snug">
                                        "In an era where 'cloud-first' often means sacrificing control, we've taken a different path."
                                    </p>
                                    <div className="h-1 w-20 bg-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="py-24 px-8 bg-slate-50/50">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Why Standard Convert?</h2>
                            <p className="text-slate-500 font-medium mt-2">Built for the modern industrial workflow.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((val, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-blue-200 group">
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

                {/* Commitment Footer */}
                <section className="py-24 px-8">
                    <div className="mx-auto max-w-7xl rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                Our Commitment
                            </h2>
                            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10">
                                As industrial standards evolve, Standard Convert evolves with them—continuously updating our conversion logic to meet the latest global benchmarks in engineering and manufacturing.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <span className="text-blue-500 font-mono font-bold tracking-widest text-sm uppercase">Standard Convert v4.0</span>
                                <div className="h-px w-12 bg-slate-700 hidden md:block" />
                                <p className="text-slate-500 text-sm italic font-medium">Engineered for the Modern Industrial Workflow.</p>
                            </div>
                        </div>
                        {/* Subtle Watermark */}
                        <Zap size={300} className="absolute -bottom-20 -left-20 text-white opacity-[0.03] pointer-events-none" />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default AboutPage