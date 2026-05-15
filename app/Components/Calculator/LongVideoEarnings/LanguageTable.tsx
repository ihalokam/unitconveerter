import React from 'react'
import { Languages, TrendingUp, HelpCircle, Activity } from 'lucide-react'

// This is a React Server Component (RSC) by default
export default function LanguageTable() {
    const fullData = [
        { rank: 1, lang: "English", rpm: "$6 – $20+", note: "Highest demand; Finance/Tech can hit $25+" },
        { rank: 2, lang: "German", rpm: "$6 – $13", note: "Strong Tier-1 market" },
        { rank: 3, lang: "Japanese", rpm: "$4 – $10", note: "Tech & gaming heavy" },
        { rank: 4, lang: "French", rpm: "$5 – $12", note: "Stable mid-high" },
        { rank: 5, lang: "Spanish (Spain)", rpm: "$4 – $9", note: "EU market" },
        { rank: 6, lang: "Spanish (LatAm)", rpm: "$2 – $6", note: "Mexico, Argentina, Colombia" },
        { rank: 7, lang: "Italian", rpm: "$4 – $9", note: "EU Tier-1" },
        { rank: 8, lang: "Korean", rpm: "$4 – $9", note: "Tech, K-pop niches" },
        { rank: 9, lang: "Dutch", rpm: "$6 – $12", note: "Netherlands, Belgium" },
        { rank: 10, lang: "Arabic (Gulf)", rpm: "$5 – $11", note: "UAE, Saudi Arabia" },
        { rank: 11, lang: "Turkish", rpm: "$2 – $5", note: "Mid-tier" },
        { rank: 12, lang: "Portuguese (Brazil)", rpm: "$2 – $6", note: "Large audience, mid RPM" },
        { rank: 13, lang: "Hindi", rpm: "$0.80 – $3", note: "India’s largest audience" },
        { rank: 14, lang: "Urdu", rpm: "$0.50 – $2", note: "Pakistan" },
        { rank: 15, lang: "Bengali", rpm: "$0.40 – $1.80", note: "Bangladesh" },
        { rank: 16, lang: "Indonesian", rpm: "$0.60 – $2.20", note: "Huge scale, low RPM" },
        { rank: 17, lang: "Vietnamese", rpm: "$1 – $3", note: "Growing market" },
        { rank: 18, lang: "Tagalog/Filipino", rpm: "$0.70 – $2.50", note: "Philippines" },
        { rank: 19, lang: "Russian", rpm: "$2 – $6", note: "Mid-tier" },
        { rank: 20, lang: "Polish", rpm: "$2 – $5", note: "EU mid-range" },
        { rank: 21, lang: "Thai", rpm: "$1 – $3.50", note: "Tourism niches strong" },
        { rank: 22, lang: "Malay", rpm: "$2 – $6", note: "Malaysia" },
        { rank: 23, lang: "Persian (Farsi)", rpm: "$1 – $3", note: "Iran diaspora" },
        { rank: 24, lang: "Hebrew", rpm: "$3 – $7", note: "Israel" },
        { rank: 25, lang: "Czech", rpm: "$2 – $5", note: "EU" },
        { rank: 26, lang: "Greek", rpm: "$2 – $5", note: "EU" },
        { rank: 27, lang: "Romanian", rpm: "$2 – $5", note: "EU" },
        { rank: 28, lang: "Hungarian", rpm: "$2 – $5", note: "EU" },
        { rank: 29, lang: "Swedish", rpm: "$4 – $9", note: "Nordic Tier-1" },
        { rank: 30, lang: "Danish", rpm: "$4 – $9", note: "Nordic Tier-1" },
        { rank: 31, lang: "Norwegian", rpm: "$4 – $9", note: "Nordic Tier-1" },
        { rank: 32, lang: "Finnish", rpm: "$3 – $7", note: "Smaller audience" },
        { rank: 33, lang: "Chinese (Mandarin)", rpm: "$1 – $3", note: "Limited ads due to restrictions" },
        { rank: 34, lang: "Cantonese", rpm: "$1 – $3", note: "Hong Kong diaspora" },
        { rank: 35, lang: "Tamil", rpm: "$0.80 – $2.50", note: "South India" },
        { rank: 36, lang: "Telugu", rpm: "$0.80 – $2.50", note: "South India" },
        { rank: 37, lang: "Kannada", rpm: "$0.80 – $2.50", note: "South India" },
        { rank: 38, lang: "Malayalam", rpm: "$0.80 – $2.50", note: "Kerala" },
        { rank: 39, lang: "Marathi", rpm: "$0.80 – $2.50", note: "India" },
        { rank: 40, lang: "Gujarati", rpm: "$0.80 – $2.50", note: "India" },
        { rank: 41, lang: "Punjabi", rpm: "$0.80 – $2.50", note: "India/Pakistan" },
        { rank: 42, lang: "Sinhala", rpm: "$0.70 – $2", note: "Sri Lanka" },
        { rank: 43, lang: "Nepali", rpm: "$0.70 – $2", note: "Nepal" },
        { rank: 44, lang: "Burmese", rpm: "$0.70 – $2", note: "Myanmar" },
        { rank: 45, lang: "Swahili", rpm: "$1 – $3", note: "East Africa" },
        { rank: 46, lang: "Hausa", rpm: "$0.80 – $2", note: "Nigeria" },
        { rank: 47, lang: "Yoruba", rpm: "$0.80 – $2", note: "Nigeria" },
        { rank: 48, lang: "Zulu", rpm: "$0.80 – $2", note: "South Africa" },
        { rank: 49, lang: "Afrikaans", rpm: "$2 – $5", note: "South Africa" },
        { rank: 50, lang: "Amharic", rpm: "$0.70 – $2", note: "Ethiopia" }
    ];

    return (
        <section className="py-24 px-6 bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto">

                {/* Static Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Languages size={16} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Data Repository</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Language and <span className="text-blue-600">youtube RPM</span>
                    </h2>
                </div>

                {/* Server-Rendered Table */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/20">
                    <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
                        <table className="w-full text-left border-collapse border-spacing-0">
                            <thead className="sticky top-0 z-20 bg-slate-900">
                                <tr>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-[0.2em]">Rank</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-[0.2em]">Language</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-[0.2em]">Est. RPM (USD)</th>
                                    <th className="px-8 py-5 font-mono text-[10px] font-black uppercase text-white tracking-[0.2em] hidden md:table-cell">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {fullData.map((item) => (
                                    <tr key={item.rank} className="hover:bg-slate-50/80">
                                        <td className="px-8 py-4 font-mono text-xs font-black text-slate-300">
                                            {item.rank.toString().padStart(2, '0')}
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="font-black text-slate-900 uppercase italic text-sm">
                                                {item.lang}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp size={14} className="text-emerald-500" />
                                                <span className="font-mono text-sm font-black text-slate-900">{item.rpm}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 hidden md:table-cell">
                                            <span className="text-[11px] text-slate-400 font-medium">
                                                {item.note}
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