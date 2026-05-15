import React from 'react'
import { Globe, BarChart3, TrendingUp, Info } from 'lucide-react'

function Table() {
    const data = [
        { rank: 1, country: "India", users: "491M", rpm: 0.02, flag: "🇮🇳" },
        { rank: 2, country: "United States", users: "253M", rpm: 0.21, flag: "🇺🇸" },
        { rank: 3, country: "Brazil", users: "144M", rpm: 0.04, flag: "🇧🇷" },
        { rank: 4, country: "Indonesia", users: "143M", rpm: 0.015, flag: "🇮🇩" },
        { rank: 5, country: "Mexico", users: "84M", rpm: 0.035, flag: "🇲🇽" },
        { rank: 6, country: "Japan", users: "79M", rpm: 0.115, flag: "🇯🇵" },
        { rank: 7, country: "Germany", users: "65M", rpm: 0.125, flag: "🇩🇪" },
        { rank: 8, country: "Vietnam", users: "62M", rpm: 0.02, flag: "🇻🇳" },
        { rank: 9, country: "Philippines", users: "58M", rpm: 0.025, flag: "🇵🇭" },
        { rank: 10, country: "Turkey", users: "57M", rpm: 0.03, flag: "🇹🇷" },
        { rank: 11, country: "Pakistan", users: "56M", rpm: 0.012, flag: "🇵🇰" },
        { rank: 12, country: "United Kingdom", users: "55M", rpm: 0.13, flag: "🇬🇧" },
        { rank: 13, country: "Egypt", users: "51M", rpm: 0.012, flag: "🇪🇬" },
        { rank: 14, country: "France", users: "50M", rpm: 0.08, flag: "🇫🇷" },
        { rank: 15, country: "Bangladesh", users: "47M", rpm: 0.01, flag: "🇧🇩" },
        { rank: 16, country: "Thailand", users: "48M", rpm: 0.035, flag: "🇹🇭" },
        { rank: 17, country: "South Korea", users: "43M", rpm: 0.17, flag: "🇰🇷" },
        { rank: 18, country: "Italy", users: "42M", rpm: 0.07, flag: "🇮🇹" },
        { rank: 19, country: "Spain", users: "40M", rpm: 0.06, flag: "🇪🇸" },
        { rank: 20, country: "Canada", users: "32M", rpm: 0.12, flag: "🇨🇦" },
    ];

    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Table Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic flex items-center gap-3">
                            <Globe className="text-blue-600" size={28} /> Global RPM <span className="text-blue-600">Benchmarks</span>
                        </h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Shorts Ad-Revenue Index by Territory</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Live Market Data 2024-2026</span>
                    </div>
                </div>

                <div className="mt-6 p-6 rounded-3xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                    <Info size={20} className="text-blue-600 shrink-0" />
                    <p className="text-[10px] font-medium text-blue-700/70 leading-relaxed uppercase tracking-wider">
                        RPM (Revenue Per Mille) indicates estimated earnings per 1,000 views.
                        These figures are median benchmarks for <span className="font-black">YouTube Shorts</span> ad-revenue sharing and
                        will fluctuate based on niche, viewer retention, and seasonality.
                    </p>
                </div>

                {/* The Table Container */}
                <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rank</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Territory</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">User Base</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right text-blue-600">Median RPM</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Tier</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.map((item) => (
                                    <tr key={item.rank} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-slate-300 group-hover:text-blue-600 transition-colors">#{item.rank}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl leading-none">{item.flag}</span>
                                                <span className="text-sm font-bold text-slate-900 tracking-tight">{item.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">~{item.users}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-slate-900 tracking-tight">${item.rpm.toFixed(3)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.rpm >= 0.12
                                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                : item.rpm >= 0.04
                                                    ? 'bg-slate-50 text-slate-600 border-slate-100'
                                                    : 'bg-orange-50 text-orange-600 border-orange-100'
                                                }`}>
                                                {item.rpm >= 0.12 ? 'Premium' : item.rpm >= 0.04 ? 'Mid' : 'Volume'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </section>
    )
}

export default Table