import React from 'react'
import { Clock, Zap, Info, ChevronRight, BarChart3 } from 'lucide-react'

export default function VidLengthTable() {
    const lengthData = [
        {
            length: "30+ min",
            ads: "6–12 mid-rolls",
            rpm: "$8 – $15+",
            note: "Highest RPM potential; long-form podcasts, tutorials, and deep-dives.",
            intensity: "bg-blue-600 text-white"
        },
        {
            length: "15–30 min",
            ads: "3–6 mid-rolls",
            rpm: "$5 – $12",
            note: "Strong RPM uplift; ideal for education, tech, and storytelling.",
            intensity: "bg-slate-900 text-white"
        },
        {
            length: "8–15 min",
            ads: "1–3 mid-rolls",
            rpm: "$4 – $8",
            note: "Mid-roll eligibility starts here. RPM often doubles vs short videos.",
            intensity: "bg-slate-800 text-white"
        },
        {
            length: "5–8 min",
            ads: "0 mid-rolls",
            rpm: "$2.50 – $5",
            note: "Higher watch time than <5m, but lacks mid-roll ad frequency.",
            intensity: "bg-slate-100 text-slate-400"
        },
        {
            length: "< 5 min",
            ads: "0 mid-rolls",
            rpm: "$2 – $4",
            note: "Limited to pre-roll/post-roll ads only; lowest yield.",
            intensity: "bg-slate-50 text-slate-300"
        }
    ];

    return (
        <section className="py-24 px-6 bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={16} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Duration Logic</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                        YT video Duration and <span className="text-blue-600">RPM</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-4 text-sm max-w-2xl leading-relaxed">
                        Video length is the primary catalyst for revenue growth. Once you cross the 8-minute mark,
                        the ability to insert mid-rolls exponentially increases your <span className="text-slate-900 font-bold">Effective RPM</span>.
                    </p>
                </div>

                {/* Table Layout */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">Video Duration</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">Mid-Roll Access</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest">Est. RPM (USD)</th>
                                    <th className="px-8 py-6 font-mono text-[10px] font-black uppercase tracking-widest text-right">Potential</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {lengthData.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-blue-50/30 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform"></div>
                                                <span className="font-black text-slate-900 uppercase italic tracking-tight text-base">
                                                    {item.length}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                                                {item.ads}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Zap size={14} className="text-orange-500" fill="currentColor" />
                                                <span className="font-mono text-sm font-black text-slate-900">{item.rpm}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`inline-block px-4 py-1.5 rounded-full font-mono text-[10px] font-black uppercase tracking-widest ${item.intensity}`}>
                                                {idx === 0 ? "MAX YIELD" : idx < 3 ? "HIGH" : "BASE"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Technical Strategy Cards */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Info size={20} />
                            </div>
                            <h4 className="text-sm font-black uppercase italic text-slate-900">The 8-Minute Pivot</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Historically, 10 minutes was the requirement. As of 2026 standards, the 8-minute mark is the critical threshold.
                            If your video is 7:59, you lose <span className="text-blue-600 font-bold">up to 60%</span> of your potential ad inventory.
                        </p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                                <BarChart3 size={20} />
                            </div>
                            <h4 className="text-sm font-black uppercase italic text-white">Compounding Logic</h4>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            Longer videos don't just have "more ads"; they have higher <span className="text-white">Retention Value</span>.
                            A 30-minute video can sustain 8+ ads, making the RPM significantly higher than three 10-minute videos combined.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}