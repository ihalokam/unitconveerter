import React from 'react'
import { Target, BarChart3, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

export default function NicheTable() {
    const nicheData = [
        { category: "Real Estate", rpm: "$10 – $38", note: "Property tours, investment advice; massive advertiser demand", status: "Premium" },
        { rank: 1, category: "Insurance / Legal", rpm: "$10 – $35", note: "Legal advice, insurance comparisons; high lead value", status: "Premium" },
        { category: "SaaS / B2B Tech", rpm: "$10 – $32", note: "Software reviews, enterprise tools; strong ROI", status: "Premium" },
        { category: "AI & Software", rpm: "$8 – $30", note: "AI tools, coding tutorials; rapidly growing niche", status: "Premium" },
        { category: "Finance & Investing", rpm: "$8 – $20+", note: "Banking, investing, and credit niches", status: "Premium" },
        { category: "Automotive", rpm: "$5 – $18", note: "Car reviews, maintenance guides; strong brands", status: "High" },
        { category: "Business & Marketing", rpm: "$5 – $15", note: "Entrepreneurship, sales, digital marketing", status: "High" },
        { category: "Technology", rpm: "$4 – $12", note: "Product reviews, gadgets, software reviews", status: "High" },
        { category: "News & Politics", rpm: "$3 – $10", note: "Mid-tier; spikes during global events", status: "Mid" },
        { category: "Education", rpm: "$3 – $8", note: "Tutorials, career skills, language learning", status: "Mid" },
        { category: "Health & Medical", rpm: "$2 – $7", note: "Wellness, medical info; high volume", status: "Mid" },
        { category: "Sports", rpm: "$2 – $7", note: "Match analysis, commentary; high engagement", status: "Mid" },
        { category: "Mixed / General", rpm: "$2 – $6", note: "Variety channels; averages depend on niche mix", status: "Standard" },
        { category: "Music", rpm: "$1 – $5", note: "Performances; limited by copyright sharing", status: "Standard" },
        { category: "Gaming", rpm: "$0.50 – $4", note: "Large audiences but low advertiser competition", status: "Standard" },
        { category: "Comedy", rpm: "$1 – $4", note: "Skits, memes; high views, low RPM yield", status: "Standard" },
        { category: "Kids Content", rpm: "$1 – $4", note: "Special category; strict COPPA ad rules", status: "Special" },
        { category: "Vlogs & Lifestyle", rpm: "$0.50 – $3", note: "Daily vlogs; high personal branding value", status: "Standard" },
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Target size={16} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Niche Intelligence</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                            Niches with <span className="text-blue-600">Best YT video RPM</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-4 text-sm leading-relaxed">
                            Advertisers pay higher premiums for niches with high buyer intent.
                            Choosing a high-RPM category can increase your earnings by <span className="text-slate-900 font-bold">10x</span> even with the same view count.
                        </p>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/30">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-900">
                                <tr>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-widest">Niche / Category</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-widest">Avg RPM (USD)</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-widest hidden lg:table-cell">Advertiser Context</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-widest text-right">Yield</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {nicheData.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-blue-50/40 transition-colors">
                                        <td className="px-8 py-5">
                                            <span className="font-black text-slate-900 uppercase italic tracking-tight text-sm">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp size={14} className="text-emerald-500" />
                                                <span className="font-mono text-sm font-black text-slate-900">{item.rpm}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 hidden lg:table-cell">
                                            <span className="text-[11px] text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                                                {item.note}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className={`px-3 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-widest ${item.status === 'Premium' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                                                item.status === 'High' ? 'bg-slate-900 text-white' :
                                                    'bg-slate-100 text-slate-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Strategy Footer */}
                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex items-start gap-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase italic text-white mb-2">Intent-Based Pricing</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                Real Estate and SaaS command the highest RPMs because the viewer is often looking to make a large purchase. Advertisers are willing to pay $30+ CPM to reach these specific users.
                            </p>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    )
}