// Server Component wrapper around the client hero
// Keeps the section label/context server-rendered for SEO
import PDFMergeHero from "./Pdfmergehero";

export default function MergeToolSection() {
    return (
        <section className="tool-section">
            <div className="tool-section__label" aria-hidden="true">
                <span className="tool-label-text">Merge Tool</span>
            </div>

            <PDFMergeHero />

            <style>{`
        .tool-section {
          background: #080a0e;
          padding: 2.5rem 0 3rem;
        }
        .tool-section__label {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .tool-label-text {
          font-family: 'Geist Mono', 'Courier New', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2a3348;
          border: 1px solid #161c28;
          border-radius: 99px;
          padding: 0.22rem 0.8rem;
        }
      `}</style>
        </section>
    );
}