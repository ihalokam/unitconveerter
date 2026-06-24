// Server Component — static, SEO-indexed headline section

export default function PageHero() {
    return (
        <header className="page-hero">
            <div className="page-hero__inner">
                <p className="page-hero__eyebrow">Client-Side Binary Protocol</p>
                <h1 className="page-hero__heading">
                    Merge PDFs,<br />
                    <span className="page-hero__accent">your order.</span>
                </h1>
                <p className="page-hero__sub">
                    Combine multiple PDF files into one. Drag to reorder, then merge —
                    entirely in your browser. Zero uploads, zero servers, zero data exposure.
                </p>
                <div className="page-hero__badges">
                    <span className="badge">100% Client-Side</span>
                    <span className="badge">No Account Required</span>
                    <span className="badge">Free Forever</span>
                </div>
            </div>

            <style>{`
        .page-hero {
          background: #080a0e;
          padding: 4rem 1rem 3rem;
          border-bottom: 1px solid #141820;
        }
        .page-hero__inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .page-hero__eyebrow {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5b8af0;
          margin: 0 0 1rem;
        }
        .page-hero__heading {
          font-size: clamp(2rem, 6vw, 3.2rem);
          font-weight: 700;
          color: #e2e8f0;
          margin: 0 0 1rem;
          letter-spacing: -0.035em;
          line-height: 1.15;
        }
        .page-hero__accent {
          color: #5b8af0;
        }
        .page-hero__sub {
          font-size: 1rem;
          color: #4a5568;
          margin: 0 auto 1.75rem;
          max-width: 540px;
          line-height: 1.7;
        }
        .page-hero__badges {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .badge {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #3a5080;
          border: 1px solid #1a2540;
          border-radius: 99px;
          padding: 0.25rem 0.75rem;
          background: #0a0f1a;
        }
      `}</style>
        </header>
    );
}