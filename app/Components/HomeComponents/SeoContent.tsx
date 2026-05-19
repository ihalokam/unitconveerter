import React from 'react'

function SeoContent() {
    return (
        <section className="py-16 px-8 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            What is Standard Convert?
                        </h2>
                        <p className="text-slate-500 leading-relaxed mb-4">
                            Standard Convert is a free, privacy-first browser utility suite built for engineers, data scientists,
                            creators, and everyday professionals. Every tool on this site runs entirely in your browser — your
                            files and data never leave your device. There are no servers storing your data, no accounts required,
                            and no hidden tracking.
                        </p>
                        <p className="text-slate-500 leading-relaxed">
                            Whether you need to convert units in bulk via CSV, transform images into a PDF, strip hidden metadata
                            from a document, or estimate your YouTube channel earnings, Standard Convert gives you professional-grade
                            precision in a clean, fast interface.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            Our Tool Suite
                        </h2>
                        <ul className="space-y-3 text-slate-500">
                            <li>
                                <span className="font-semibold text-slate-700">Unit Converter</span> — Convert across 15+ categories
                                including mass, length, temperature, volume, energy, and pressure. Supports bulk CSV processing for
                                large datasets.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-700">Image to PDF Converter</span> — Combine multiple
                                images (JPG, PNG, WebP) into a single PDF document, 100% locally in your browser.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-700">PDF Metadata Remover</span> — Strip hidden author,
                                creation date, GPS, XMP, and producer metadata from PDF files before sharing them.
                            </li>
                            <li>
                                <span className="font-semibold text-slate-700">YouTube Earnings Calculators</span> — Estimate
                                long-form and Shorts revenue by country and niche using 2026 creator-reported RPM data.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Why Privacy-First Matters</h2>
                    <p className="text-slate-500 leading-relaxed">
                        Many online tools require you to upload your files to a remote server for processing, creating unnecessary
                        privacy risks — especially for sensitive legal, financial, or proprietary documents. Standard Convert
                        solves this by executing all computation in your browser using modern Web APIs. This means faster
                        processing, zero data exposure, and full compliance with enterprise security standards. Our zero-server
                        architecture isn't a feature — it's a core design principle that makes Standard Convert the trusted choice
                        for professionals who can't afford data leaks.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SeoContent
