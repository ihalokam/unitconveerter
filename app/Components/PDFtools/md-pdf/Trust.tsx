import React from "react";

const VERIFICATION_METHODS = [
    {
        label: "Easiest",
        title: "Turn off your Wi-Fi and try it anyway",
        steps: [
            "Disconnect from the internet, or switch your device to airplane mode.",
            "Come back to this page (it's already loaded, so it'll still be here).",
            "Paste or upload a markdown file and export it.",
        ],
        why: "If the conversion still works with no network connection, your file physically cannot have been sent anywhere — there's no connection for it to travel over. This is the fastest way to settle the question without any technical background.",
        caveat: "One honest limitation: this catches the vast majority of upload-based tools, but in theory a page could pre-cache a result while you were still online. Use the Network tab method below if you want to rule that out too.",
    },
    {
        label: "Most thorough",
        title: "Watch the Network tab while you convert",
        steps: [
            "Right-click anywhere on this page and choose Inspect (or press F12 / Cmd+Opt+I).",
            "Click the Network tab, then check \"Disable cache\" and clear the log.",
            "Paste your markdown, run the conversion, and export — watch what shows up in the request list.",
        ],
        why: "Every request a page makes — to any server, anywhere — shows up here. You'll see this page's own assets load once at the start (HTML, fonts, the libraries that render Mermaid and KaTeX). What you will not see is a new request fire the moment you click convert, and nothing in the list will carry your document's text as a payload.",
        caveat: "Filter by clicking the Fetch/XHR tab if the full list feels noisy — that narrows it to the kind of request that could actually carry your file content.",
    },
    {
        label: "For developers",
        title: "Check what the browser itself enforces",
        steps: [
            "Still in DevTools, open the Console tab.",
            "Look at the page's Content-Security-Policy via the Network tab → click the main document request → Headers.",
            "A connect-src directive scoped to 'self' (or no outbound hosts listed) means the browser will block and log an error for any script-initiated request to an external domain — not just on this load, but on every future one too.",
        ],
        why: "This is the strongest check because it isn't just an observation of what happened to be sent during your test — it's a constraint the browser enforces automatically. If a future version of this page ever tried to add a call to an external server, a correctly scoped CSP would block it outright and throw a visible console error, not let it through silently.",
        caveat: "This depends on the header actually being set correctly server-side — it's a good sign when present, but its absence alone doesn't mean a site is sending data. Combine it with the Network tab check.",
    },
];

export default function Trust() {
    return (
        <section className="bg-neutral-50 border-b border-neutral-200/80 selection:bg-neutral-900 selection:text-white">
            <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">

                {/* Header Section */}
                <div className="max-w-3xl mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-neutral-300/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                            Privacy Verifiable
                        </span>
                    </div>
                    <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-neutral-950 tracking-tight">
                        Don&apos;t take our word for it — check yourself
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
                        Every part of this converter — parsing your markdown, rendering Mermaid diagrams,
                        typesetting LaTeX, and generating the final PDF — runs inside your browser tab.
                        Nothing you paste or upload is sent to a server. We're not asking you to trust a
                        privacy badge. Here are three ways to confirm it yourself.
                    </p>
                </div>

                {/* Grid Layout for Verification Methods */}
                <div className="grid gap-12">
                    {VERIFICATION_METHODS.map((method, i) => (
                        <article
                            key={method.title}
                            className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-t border-neutral-200/70 pt-10 first:border-t-0 first:pt-0"
                        >
                            {/* Left Meta Column */}
                            <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xl font-light text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="inline-block rounded-md bg-white border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700 shadow-sm">
                                        {method.label}
                                    </span>
                                </div>
                            </div>

                            {/* Right Content Column */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight">
                                    {method.title}
                                </h3>

                                <ol className="space-y-3 bg-white border border-neutral-200/80 rounded-xl p-5 shadow-sm">
                                    {method.steps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-neutral-700 flex items-start gap-3">
                                            <span className="font-mono text-xs text-neutral-400 bg-neutral-50 border border-neutral-200 px-1.5 py-0.5 rounded shrink-0 select-none mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>

                                <div className="space-y-3 px-1">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Why this works</h4>
                                    <p className="text-sm text-neutral-600 leading-relaxed">{method.why}</p>
                                </div>

                                <blockquote className="rounded-lg border-l-2 border-neutral-300 bg-neutral-100/60 px-4 py-3 text-xs text-neutral-500 leading-relaxed font-normal">
                                    <span className="font-semibold text-neutral-700 block mb-0.5">Note:</span>
                                    {method.caveat}
                                </blockquote>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Open Source / Transparency Disclaimer Footer */}
                <div className="mt-16 rounded-xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 shrink-0 font-mono text-xs text-neutral-500 uppercase tracking-wider">
                            Code
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                            <span className="font-semibold text-neutral-900 block mb-1">Regarding Source Code Transparency:</span>
                            This tool isn&apos;t currently open-source, so we&apos;re not going to claim &quot;audit the
                            code yourself&quot; as a verification method — that wouldn&apos;t be honest if the
                            repo isn&apos;t public. What we can stand behind is that the behavior is checkable
                            independently of the source, using the sandbox methods outlined above. If that&apos;s not
                            enough assurance for your workflow, that&apos;s a completely reasonable line to
                            draw, and a fully offline, source-available CLI tool may be a better fit for your architecture.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}