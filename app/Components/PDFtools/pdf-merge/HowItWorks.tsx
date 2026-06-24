// Server Component — rendered at build/request time for SEO

const steps = [
    {
        number: '01',
        title: 'Upload your PDFs',
        description:
            'Drag and drop any number of PDF files into the upload zone, or click to open your file browser. Multiple files accepted at once.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="4" y="2" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M16 2v6h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M20 22v5M17.5 24.5l2.5-2.5 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Set your order',
        description:
            'Drag files up or down in the queue to arrange them exactly how you want. The merged PDF will follow this sequence page by page.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="22" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <rect x="3" y="12" width="22" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <rect x="3" y="19" width="22" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M22 7h0M22 14h0M22 21h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Merge & download',
        description:
            'Hit the Merge button. Your browser combines the PDFs locally — nothing is uploaded to any server. The final file downloads instantly.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 4v14M10 14l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 22h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <section className="how-section">
            <div className="how-section__inner">
                <p className="how-section__eyebrow">Protocol</p>
                <h2 className="how-section__heading">How it works</h2>

                <ol className="steps" aria-label="How to merge PDFs">
                    {steps.map((step) => (
                        <li key={step.number} className="step">
                            <div className="step__icon">{step.icon}</div>
                            <div className="step__body">
                                <div className="step__num">{step.number}</div>
                                <h3 className="step__title">{step.title}</h3>
                                <p className="step__desc">{step.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <style>{`
        .how-section {
          background: #0a0c10;
          border-top: 1px solid #1a1e28;
          padding: 4rem 1rem;
        }
        .how-section__inner {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }
        .how-section__eyebrow {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5b8af0;
          margin: 0 0 0.6rem;
        }
        .how-section__heading {
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 600;
          color: #e2e8f0;
          margin: 0 0 2.5rem;
          letter-spacing: -0.02em;
        }
        .steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          text-align: left;
        }
        .step {
          background: #0d1017;
          border: 1px solid #1a2030;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .step__icon {
          color: #5b8af0;
          width: 44px;
          height: 44px;
          background: #0f1830;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step__body {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .step__num {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: #2e3a52;
          margin-bottom: 0.15rem;
        }
        .step__title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #c8d4e8;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .step__desc {
          font-size: 0.82rem;
          color: #4a5568;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
}