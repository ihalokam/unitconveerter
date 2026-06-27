const VERIFICATION_METHODS = [
    {
        label: "Easiest",
        title: "Turn off your Wi-Fi and try it anyway",
        steps: [
            "Disconnect from the internet, or switch your device to airplane mode.",
            "Come back to this page (it's already loaded, so it'll still be here).",
            "Paste or upload a markdown file and export it.",
        ],
        why:
            "If the conversion still works with no network connection, your file physically cannot have been sent anywhere — there's no connection for it to travel over. This is the fastest way to settle the question without any technical background.",
        caveat:
            "One honest limitation: this catches the vast majority of upload-based tools, but in theory a page could pre-cache a result while you were still online. Use the Network tab method below if you want to rule that out too.",
    },
    {
        label: "Most thorough",
        title: "Watch the Network tab while you convert",
        steps: [
            "Right-click anywhere on this page and choose Inspect (or press F12 / Cmd+Opt+I).",
            "Click the Network tab, then check \"Disable cache\" and clear the log.",
            "Paste your markdown, run the conversion, and export — watch what shows up in the request list.",
        ],
        why:
            "Every request a page makes — to any server, anywhere — shows up here. You'll see this page's own assets load once at the start (HTML, fonts, the libraries that render Mermaid and KaTeX). What you will not see is a new request fire the moment you click convert, and nothing in the list will carry your document's text as a payload.",
        caveat:
            "Filter by clicking the Fetch/XHR tab if the full list feels noisy — that narrows it to the kind of request that could actually carry your file content.",
    },
    {
        label: "For developers",
        title: "Check what the browser itself enforces",
        steps: [
            "Still in DevTools, open the Console tab.",
            "Look at the page's Content-Security-Policy via the Network tab → click the main document request → Headers.",
            "A connect-src directive scoped to 'self' (or no outbound hosts listed) means the browser will block and log an error for any script-initiated request to an external domain — not just on this load, but on every future one too.",
        ],
        why:
            "This is the strongest check because it isn't just an observation of what happened to be sent during your test — it's a constraint the browser enforces automatically. If a future version of this page ever tried to add a call to an external server, a correctly scoped CSP would block it outright and throw a visible console error, not let it through silently.",
        caveat:
            "This depends on the header actually being set correctly server-side — it's a good sign when present, but its absence alone doesn't mean a site is sending data. Combine it with the Network tab check.",
    },
];

export default function Trust() {
    return (
        <section className="bg-white border-b border-neutral-200">
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="max-w-2xl mb-12">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-wide">
                        Privacy, proven not promised
                    </span>
                    <h2 className="mt-2 text-3xl font-semibold text-neutral-950 tracking-tight">
                        Don&apos;t take our word for it — check yourself
                    </h2>
                    <p className="mt-4 text-neutral-600 leading-relaxed">
                        Every part of this converter — parsing your markdown, rendering Mermaid diagrams,
                        typesetting LaTeX, and generating the final PDF — runs inside your browser tab.
                        Nothing you paste or upload is sent to a server. We're not asking you to trust a
                        privacy badge. Here are three ways to confirm it yourself, in increasing order of
                        rigor.
                    </p>
                </div>

                <div className="grid gap-8">
                    {VERIFICATION_METHODS.map((method, i) => (
                        <article
                            key={method.title}
                            className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 border-t border-neutral-200 pt-8 first:border-t-0 first:pt-0"
                        >
                            <div className="md:w-32 flex flex-row md:flex-col items-baseline md:items-start gap-2">
                                <span className="font-mono text-sm text-neutral-400">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="inline-block rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                                    {method.label}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-neutral-950">{method.title}</h3>

                                <ol className="mt-3 space-y-1.5">
                                    {method.steps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-neutral-700 flex gap-2.5">
                                            <span className="font-mono text-neutral-400 shrink-0">{idx + 1}.</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>

                                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{method.why}</p>

                                <p className="mt-2 text-xs text-neutral-500 leading-relaxed border-l-2 border-neutral-200 pl-3">
                                    {method.caveat}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-5">
                    <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="font-medium text-neutral-900">On source code:</span> this tool
                        isn&apos;t currently open-source, so we&apos;re not going to claim &quot;audit the
                        code yourself&quot; as a verification method — that wouldn&apos;t be honest if the
                        repo isn&apos;t public. What we can stand behind is that the behavior is checkable
                        independently of the source, using the three methods above. If that&apos;s not
                        enough assurance for your use case, that&apos;s a completely reasonable line to
                        draw, and a fully offline, source-available CLI tool may be the better fit for you.
                    </p>
                </div>
            </div>
        </section>
    );
}