
import { Activity } from "lucide-react";

function HeaderTwo() {
    return (
        <div>
            {/* ── Header ── */}
            <div className="border-b border-slate-100 px-6 py-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-3 flex items-center gap-2">
                        <Activity size={12} className="text-blue-600" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-blue-600">
                            Shorts · RPM Explorer
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-[1.05]">
                        Do you know the
                        <br />
                        <span className="text-blue-600">average views</span>
                        <br />
                        and RPM?
                    </h1>
                    <p className="mt-3 text-sm text-slate-500">
                        Drag both sliders to explore how views and RPM affect your estimated earnings.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeaderTwo