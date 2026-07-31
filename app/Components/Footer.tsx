import React from 'react'
import Link from 'next/link'
import { Activity, Mail, Shield, FileText, Info, Globe } from 'lucide-react'

function Footer() {
    // suppressHydrationWarning on the year span prevents SSR/client mismatch warnings
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-slate-200/80 bg-slate-50/60">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="bg-slate-900 p-1.5 rounded-lg text-white shadow-sm">
                                <Activity size={18} />
                            </div>
                            <span className="text-lg font-black tracking-tight font-mono text-slate-900">
                                STANDARD<span className="text-blue-600">CONVERT</span>
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm font-normal">
                            Industrial-grade precision for bulk data transformation. Engineered for global logistics and manufacturing standards.
                        </p>
                    </div>

                    {/* Links Column 1: Tools (SEO Internal Linking) */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-5">Tools</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/unit-converter" className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Unit Converter
                                </Link>
                            </li>
                            <li>
                                <Link href="/pdf-tools" className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    PDF Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/calculator" className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    Calculators
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2: Company */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-5">Company</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/about-us" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    <Info size={14} className="text-slate-400" /> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    <Mail size={14} className="text-slate-400" /> Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 3: Legal */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-5">Compliance</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    <Shield size={14} className="text-slate-400" /> Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                    <FileText size={14} className="text-slate-400" /> Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 font-medium">
                        © <span suppressHydrationWarning>{currentYear}</span> Standard Convert. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 text-[10px] font-bold uppercase tracking-wider">
                        <Globe size={12} className="text-slate-500" />
                        <span>Local Browser Execution</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer