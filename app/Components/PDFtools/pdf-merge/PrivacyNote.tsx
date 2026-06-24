// Server Component — privacy trust signal, SEO content

const points = [
    {
        label: 'No file uploads',
        detail: 'Your PDFs never leave your device. All processing happens inside your browser using the Web File API.',
    },
    {
        label: 'No account needed',
        detail: 'Open the page, merge your files, download the result. No sign-ups, no paywalls, no tracking.',
    },
    {
        label: 'Open in any browser',
        detail: 'Works in all modern browsers — Chrome, Firefox, Safari, Edge — on desktop and mobile.',
    },
];

export default function PrivacyNote() {
    return (
        <section className="privacy-section">
            <div className="privacy-section__inner">
                <div className="privacy-header">
                    <span className="privacy-lock" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="3" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M6 8V5.5a3 3 0 0 1 6 0V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                    </span>
                    <p className="privacy-section__eyebrow">Security Architecture</p>
                </div>
                <h2 className="privacy-section__heading">Why privacy-first matters</h2>
                <p className="privacy-section__lead">
                    Most online PDF tools require you to upload files to a remote server — creating unnecessary risk for sensitive legal, financial, or personal documents. This tool executes everything locally.
                </p>

                <ul className="privacy-points" aria-label="Privacy guarantees">
                    {points.map((p) => (
                        <li key={p.label} className="privacy-point">
                            <span className="privacy-point__check" aria-hidden="true">✓</span>
                            <div>
                                <strong className="privacy-point__label">{p.label}</strong>
                                <p className="privacy-point__detail">{p.detail}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <style>{`
        .privacy-section {
          background: #06080b;
          border-top: 1px solid #131720;
          padding: 4rem 1rem;
        }
        .privacy-section__inner {
          max-width: 640px;
          margin: 0 auto;
        }
        .privacy-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .privacy-lock {
          color: #5b8af0;
        }
        .privacy-section__eyebrow {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #5b8af0;
          margin: 0;
        }
        .privacy-section__heading {
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 600;
          color: #d0d8e8;
          margin: 0 0 0.85rem;
          letter-spacing: -0.02em;
        }
        .privacy-section__lead {
          font-size: 0.9rem;
          color: #42506a;
          line-height: 1.7;
          margin: 0 0 2rem;
        }
        .privacy-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .privacy-point {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
        }
        .privacy-point__check {
          color: #4cad7d;
          font-size: 0.85rem;
          margin-top: 0.15rem;
          flex-shrink: 0;
          font-family: 'Geist Mono', monospace;
        }
        .privacy-point__label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #b0bdd4;
          display: block;
          margin-bottom: 0.2rem;
        }
        .privacy-point__detail {
          font-size: 0.82rem;
          color: #3a4a60;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
}