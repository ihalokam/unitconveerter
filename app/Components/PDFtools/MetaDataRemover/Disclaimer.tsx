import React from 'react'
import { Gavel, AlertCircle, ShieldAlert, Scale, AlertTriangle, Info, ShieldCheck } from 'lucide-react'

function Disclaimer() {
    return (
        <>
            {/* Technical Disclaimer Section */}
            <section className="py-16 px-8 bg-slate-50 border-t border-slate-200">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-500 rounded-lg text-white">
                            <Scale size={20} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 italic">
                            Technical & Data Disclaimer
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Technical Limitation */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-amber-200 transition-all">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 uppercase text-sm tracking-tight">Scope of Sanitization</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        StandardConvert.com purges hidden document headers, including <code className="bg-slate-100 px-1 rounded">/Info</code> trailer entries, <code className="bg-slate-100 px-1 rounded">XMP packets</code>, and <code className="bg-slate-100 px-1 rounded">/Metadata</code> streams. However, this tool does <strong>not</strong> redact visible text, embedded watermarks, or identifying information contained within the visual body of the PDF. Users are responsible for manually redacting visible sensitive data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Liability Section */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-blue-200 transition-all">
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2 uppercase text-sm tracking-tight">Data Sovereignty</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        Because processing occurs 100% locally within your browser, StandardConvert.com never possesses, stores, or sees your files. Consequently, we cannot verify the success of a scrub or recover unsanitized versions. Use of this utility is at the user&apos;s own risk regarding legal compliance and document security.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </section>

            {/* Formal Legal Notice Section */}
            <section className="py-16 px-8 bg-slate-100 border-t-2 border-slate-200">
                <div className="mx-auto max-w-7xl">

                    {/* Critical Alert Header */}
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-300 pb-6">
                        <div className="p-2 bg-slate-900 rounded-lg text-white">
                            <Gavel size={20} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 italic">
                            Mandatory Legal Notice & Liability Release
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 gap-6">

                        {/* Primary Disclaimer Box */}
                        <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-900/5 shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-red-600">
                                    <AlertCircle size={20} className="shrink-0" />
                                    <h4 className="font-black uppercase text-xs tracking-widest">Pre-Action Verification Required</h4>
                                </div>

                                <div className="space-y-4 text-slate-600 text-sm font-medium leading-relaxed">
                                    <p>
                                        <strong>Final Verification Responsibility:</strong> While StandardConvert.com is engineered to strip technical metadata strings (including but not limited to <code className="text-blue-600">/Author</code>, <code className="text-blue-600">/CreationDate</code>, and <code className="text-blue-600">XMP Packets</code>), users are <strong>strictly required</strong> to verify the output file using independent third-party forensic tools before sharing or publishing.
                                    </p>

                                    <p className="bg-slate-50 p-6 rounded-2xl border border-slate-200 italic text-slate-900">
                                        "By utilizing this tool, you acknowledge that <strong>StandardConvert.com</strong> and its operators assume <strong>zero liability</strong> for any consequences arising from the use of sanitized files. This includes, but is not limited to, non-compliance with financial regulations, data privacy laws (GDPR, CCPA), legal discovery requirements, or any professional/financial loss resulting from metadata leakage or file corruption."
                                    </p>

                                    <p>
                                        <strong>No Legal or Financial Warranty:</strong> This software is provided "as is" without warranty of any kind. We are not responsible for how the stripped data impacts the legal standing or financial integrity of your documents. You are solely responsible for ensuring that your sanitized documents meet the specific regulatory standards of your industry or jurisdiction.
                                    </p>
                                </div>

                                {/* Verification Badge */}
                                <div className="mt-8 flex flex-col md:flex-row items-center gap-4 py-4 px-6 bg-red-50 rounded-2xl border border-red-100">
                                    <ShieldAlert className="text-red-600 shrink-0" size={24} />
                                    <p className="text-[11px] font-bold text-red-800 uppercase leading-tight">
                                        Warning: Always check and verify document properties manually before proceeding. StandardConvert.com is a local-only utility and cannot guarantee the absolute anonymity required by specific high-security financial or legal frameworks.
                                    </p>
                                </div>
                            </div>

                            {/* Background Decoration */}
                            <Scale size={180} className="absolute -bottom-10 -right-10 text-slate-100 opacity-50 pointer-events-none" />
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Disclaimer