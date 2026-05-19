import React from 'react'
import Link from 'next/link'
import { Activity, Mail, Shield, FileText, Info, Globe } from 'lucide-react'

function Footer() {
    // suppressHydrationWarning on the year span prevents SSR/client mismatch warnings
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-slate-900 p-1 rounded text-white">
                                <Activity size={16} />
                            </div>
                            <span className="text-lg font-black tracking-tighter font-mono">
                                STANDARD<span className="text-blue-600">CONVERT</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Industrial-grade precision for bulk data transformation. Engineered for global logistics and manufacturing standards.
                        </p>
                    </div>

                    {/* Links Column 1: Tools (SEO Internal Linking) */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Tools</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/unit-converter" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Unit Converter
                                </Link>
                            </li>
                            <li>
                                <Link href="/pdf-tools" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    PDF Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/calculator" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Calculators
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2: Company */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about-us" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    <Info size={14} /> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    <Mail size={14} /> Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 3: Legal */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Compliance</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/privacy-policy" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    <Shield size={14} /> Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    <FileText size={14} /> Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 font-medium">
                        © <span suppressHydrationWarning>{currentYear}</span> Standard Convert. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-slate-400">
                        <Globe size={16} />
                        <span className="text-[10px] font-bold uppercase">Multi-Regional Processing</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer