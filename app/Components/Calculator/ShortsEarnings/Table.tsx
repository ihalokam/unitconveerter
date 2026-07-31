import React from 'react'
import { Globe, TrendingUp, Info } from 'lucide-react'

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
                            <Globe className="text-red-600 shrink-0" size={26} />
                            Global RPM <span className="text-red-600">Benchmarks</span>
                        </h2>
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">
                            YouTube Shorts Ad-Revenue Index by Territory
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl self-start sm:self-auto">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-600">Market Data 2024–2026</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-red-50/50 border border-red-100 flex items-start gap-3.5">
                    <Info size={18} className="text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-normal text-slate-700 leading-relaxed">
                        <strong className="font-semibold text-slate-900">RPM (Revenue Per Mille)</strong> indicates estimated earnings per 1,000 views. These figures represent median benchmarks for <strong className="font-semibold text-slate-900">YouTube Shorts</strong> revenue sharing and fluctuate based on niche, retention, and seasonality.
                    </p>
                </div>

                {/* The Table Container */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Rank</th>
                                    <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Territory</th>
                                    <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">User Base</th>
                                    <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-red-600 text-right">Median RPM</th>
                                    <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Tier</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item) => (
                                    <tr key={item.rank} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">#{item.rank}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg leading-none">{item.flag}</span>
                                                <span className="text-sm font-semibold text-slate-900 tracking-tight">{item.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <span className="text-xs font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md">~{item.users}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <span className="text-sm font-extrabold text-slate-900">${item.rpm.toFixed(3)}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <span
                                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.rpm >= 0.12
                                                        ? 'bg-red-50 text-red-600 border-red-200/60'
                                                        : item.rpm >= 0.04
                                                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                                                            : 'bg-amber-50 text-amber-700 border-amber-200/60'
                                                    }`}
                                            >
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