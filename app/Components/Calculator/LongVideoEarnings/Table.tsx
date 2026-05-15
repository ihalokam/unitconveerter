import React from 'react'
import { Globe2, TrendingUp, Zap, BarChart3 } from 'lucide-react'

function Table() {
    const data = [
        { country: "United States", users: "~250M+", rpm: "$8 – $20+", tier: "Tier 1", flag: "🇺🇸" },
        { country: "United Kingdom", users: "~60M", rpm: "$7 – $16", tier: "Tier 1", flag: "🇬🇧" },
        { country: "Canada", users: "~40M", rpm: "$6 – $14", tier: "Tier 1", flag: "🇨🇦" },
        { country: "Germany", users: "~80M", rpm: "$6 – $13", tier: "Tier 1", flag: "🇩🇪" },
        { country: "France", users: "~65M", rpm: "$5 – $12", tier: "Tier 1", flag: "🇫🇷" },
        { country: "Japan", users: "~120M", rpm: "$4 – $10", tier: "Tier 1", flag: "🇯🇵" },
        { country: "South Korea", users: "~45M", rpm: "$4 – $9", tier: "Tier 1", flag: "🇰🇷" },
        { country: "Italy", users: "~50M", rpm: "$4 – $9", tier: "Tier 1", flag: "🇮🇹" },
        { country: "Spain", users: "~45M", rpm: "$4 – $9", tier: "Tier 1", flag: "🇪🇸" },
        { country: "Mexico", users: "~100M", rpm: "$2 – $6", tier: "Tier 2", flag: "🇲🇽" },
        { country: "Brazil", users: "~150M", rpm: "$2 – $6", tier: "Tier 2", flag: "🇧🇷" },
        { country: "Turkey", users: "~60M", rpm: "$2 – $5", tier: "Tier 2", flag: "🇹🇷" },
        { country: "Egypt", users: "~55M", rpm: "$1 – $3.50", tier: "Tier 2", flag: "🇪🇬" },
        { country: "Thailand", users: "~50M", rpm: "$1 – $3.50", tier: "Tier 2", flag: "🇹🇭" },
        { country: "India", users: "~450M+", rpm: "$0.80 – $3", tier: "Tier 3", flag: "🇮🇳" },
        { country: "Vietnam", users: "~75M", rpm: "$1 – $3", tier: "Tier 3", flag: "🇻🇳" },
        { country: "Philippines", users: "~70M", rpm: "$0.70 – $2.50", tier: "Tier 3", flag: "🇵🇭" },
        { country: "Pakistan", users: "~70M", rpm: "$0.50 – $2", tier: "Tier 3", flag: "🇵🇰" },
        { country: "Bangladesh", users: "~55M", rpm: "$0.40 – $1.80", tier: "Tier 3", flag: "🇧🇩" },
        { country: "Indonesia", users: "~140M", rpm: "$0.60 – $2.20", tier: "Tier 3", flag: "🇮🇩" },
    ];

    return (
        <section className="py-24 px-6 bg-slate-50/50">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe2 size={16} className="text-blue-600" />
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Regional Intelligence</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">
                            Countries with Highest <span className="text-blue-600">RPM</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-4 text-sm leading-relaxed">
                            The countries with highest RPM rates on Youtube video. Which also shows the purchasing power of countries. So you can target those countries to get high RPM rates on your videos.
                        </p>
                    </div>


                </div>

                {/* Table Container */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">Territory</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">Est. Users (2026)</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">RPM Range (USD)</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{row.flag}</span>
                                                <span className="font-black text-slate-900 uppercase italic tracking-tight text-sm">{row.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-mono text-xs font-bold text-slate-500">{row.users}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp size={14} className="text-emerald-500" />
                                                <span className="font-mono text-sm font-black text-slate-900">{row.rpm}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-widest border ${row.tier === 'Tier 1' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                row.tier === 'Tier 2' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-slate-50 text-slate-400 border-slate-100'
                                                }`}>
                                                {row.tier}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[2rem] bg-slate-900 text-white flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <BarChart3 size={18} />
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-wider leading-relaxed">
                            <span className="text-blue-400">Pro Logic:</span> High-tier countries (US/UK) pay more because advertisers compete for high purchasing power audiences.
                        </p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white border border-slate-100 flex items-center gap-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Global RPM Index updated with creator-reported data from Q2 2026.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Table