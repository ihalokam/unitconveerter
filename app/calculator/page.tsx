import React from 'react'
import {
    Play,
    Zap,
    ArrowUpRight,
    LayoutGrid,
    ChevronRight,
    TrendingUp,
    Layers
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

// modular array - add new tools here in 5 seconds
const tools = [
    {
        title: "Long-form Video Earnings",
        desc: "Estimate your YouTube ad revenue for long-form videos by country, niche, and duration. Uses 2026 creator-reported RPM data.",
        path: "/calculator/long-youtube-video-earnings-calculator",
        icon: <Play className="text-blue-600" size={20} fill="currentColor" />,
        badge: "Most Accurate",
        color: "from-blue-600/10 to-transparent"
    },
    {
        title: "YouTube Shorts Revenue",
        desc: "Estimate your YouTube Shorts earnings by country with 2026 RPM data. See daily, monthly, and yearly revenue breakdowns.",
        path: "/calculator/youtube-shorts-earnings-calculator",
        icon: <Zap className="text-orange-500" size={20} fill="currentColor" />,
        badge: "Fast Growth",
        color: "from-orange-500/10 to-transparent"
    },
    {
        title: "Concrete Calculator",
        path: "/calculator/concrete-calculator",
        desc: "Calculate bags, raw batching recipes, cost estimates, and rebar layouts.",
        icon: <Layers size={20} className="text-stone-500" />,
        tag: "DIY & Pro",
        badge: "Construction",
        color: "from-stone-500/15 to-transparent"
    }
];

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Daily use calculators for differenet purposes",
    description: "The calculators you need for daily use, to make your work more easy",
    alternates: {
        canonical: "https://standardconvert.com/calculator"
    },
    keywords: [
        "YouTube earnings calculator",
        "YouTube revenue estimator",
        "YouTube shorts earnings calculator",
        "YouTube long video earnings calculator",
        "YouTube RPM calculator",
        "how much does YouTube pay",
        "concrete calculator",
        "concrete volume estimator",
        "bag counts for slabs",
        "construction calculators",
        "utility tools",
    ],
    openGraph: {
        title: "Free Utility & Growth Calculators – Standard Convert",
        description: "Explore our collection of specialized calculators, from YouTube revenue estimators to construction and concrete volume tools.",
        url: "https://standardconvert.com/calculator",
        siteName: "Standard Convert",
        type: "website",
        images: [{ url: "https://standardconvert.com/og.webp", width: 1200, height: 630, alt: "Utility Calculators" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Earnings Calculators – Standard Convert",
        description: "Estimate YouTube long-form and Shorts earnings by country and niche with 2026 RPM data.",
        images: ["https://standardconvert.com/og.webp"],
    },
}

export default function CalculatorDictionary() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Hero Header */}
                <section className="pt-24 pb-16 px-6 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid size={14} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                Tool Repository
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                            Utility <span className="text-blue-600">Calculators</span>
                        </h1>
                        <p className="mt-6 text-slate-500 font-medium max-w-xl text-sm leading-relaxed">
                            A comprehensive suite of data-driven tools designed to simplify your projects—from creator earnings
                            and digital growth to construction estimators and unit conversions.
                        </p>
                    </div>
                </section>

                {/* Grid Section */}
                <section className="py-20 px-6 bg-slate-50/50">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tools.map((tool, idx) => (
                                <Link
                                    key={idx}
                                    href={tool.path}
                                    className="group relative flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Decorative Background Gradient */}
                                    <div className={`absolute top-0 left-0 w-full h-full bg-linear-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                {tool.icon}
                                            </div>
                                            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-300 group-hover:text-blue-600 transition-colors">
                                                {tool.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-3">
                                            {tool.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">
                                            {tool.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-50">
                                        <span className="font-mono text-[10px] font-black text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-2">
                                            Launch Calculator <ChevronRight size={12} />
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Placeholder / "Coming Soon" card to maintain grid balance */}
                            <div className="p-8 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center group">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                                    <TrendingUp size={20} />
                                </div>
                                <p className="font-mono text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    New Tools in Development
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Branding */}
                <section className="py-12 border-t border-slate-100">
                    <div className="max-w-5xl mx-auto px-6 flex justify-center">
                        <div className="flex items-center gap-3 grayscale opacity-30">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-900">
                                Creator Lab // 2026
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}