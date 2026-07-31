import React from 'react'
import {
    Play,
    Zap,
    ArrowUpRight,
    LayoutGrid,
    ChevronRight,
    TrendingUp,
    Layers,
    Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import type { Metadata } from 'next'

// Modular tools array preserved exactly
const tools = [
    {
        title: "Long-form Video Earnings",
        desc: "Estimate your YouTube ad revenue for long-form videos by country, niche, and duration based on 2026 creator-reported RPM data.",
        path: "/calculator/long-youtube-video-earnings-calculator",
        icon: <Play className="text-blue-600" size={20} fill="currentColor" />,
        badge: "Most Accurate",
        category: "YouTube",
        color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
        title: "YouTube Shorts Revenue",
        desc: "Estimate your YouTube Shorts earnings by country with 2026 RPM data. See daily, monthly, and yearly revenue breakdowns.",
        path: "/calculator/youtube-shorts-earnings-calculator",
        icon: <Zap className="text-amber-500" size={20} fill="currentColor" />,
        badge: "Fast Growth",
        category: "YouTube",
        color: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
        title: "Concrete Calculator",
        path: "/calculator/concrete-calculator",
        desc: "Calculate required bags, raw batching recipes, total cost estimates, and rebar structural layouts in seconds.",
        icon: <Layers size={20} className="text-stone-600" />,
        badge: "DIY & Pro",
        category: "Construction",
        color: "bg-stone-100 text-stone-700 border-stone-200"
    }
];

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
        <div className="min-h-screen flex flex-col bg-slate-50/50 antialiased">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Header */}
                <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 bg-white">
                    <div className="max-w-6xl mx-auto text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide mb-6">
                            <LayoutGrid size={14} className="text-blue-600" />
                            <span>TOOL REPOSITORY</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-6">
                            Utility <span className="text-blue-600">Calculators</span>
                        </h1>

                        <p className="text-slate-600 font-normal max-w-2xl text-base sm:text-lg leading-relaxed">
                            A comprehensive suite of data-driven tools designed to simplify your projects—from creator earnings
                            and digital growth to construction estimators and unit conversions.
                        </p>
                    </div>
                </section>

                {/* Grid Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tools.map((tool, idx) => (
                                <Link
                                    key={idx}
                                    href={tool.path}
                                    className="group relative flex flex-col justify-between p-6 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                                >
                                    <div>
                                        {/* Top Meta Bar */}
                                        <div className="flex items-center justify-between gap-2 mb-6">
                                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50/50 transition-colors">
                                                {tool.icon}
                                            </div>

                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${tool.color}`}>
                                                {tool.badge}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight">
                                            {tool.title}
                                        </h2>

                                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                            {tool.desc}
                                        </p>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                        <span className="flex items-center gap-1">
                                            Launch Calculator
                                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </span>

                                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Placeholder / Coming Soon Card */}
                            <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center group min-h-[260px]">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-3 shadow-xs">
                                    <Sparkles size={18} className="text-blue-500" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-800 mb-1">More Tools Coming Soon</h3>
                                <p className="text-xs text-slate-500 max-w-[200px]">
                                    We are building new utility and growth estimators weekly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}