/**
 * Markdown → HTML → PDF engine. Two export paths, intentionally different trade-offs:
 *
 * - exportToPdf() — opens the browser's native print dialog against a dedicated print
 *   stylesheet. Gives real vector text, real CSS page-break control (break-inside:
 *   avoid on code/tables/diagrams), and working hyperlinks. Requires the user to pick
 *   "Save as PDF" in the dialog — not a silent one-click download.
 * - downloadAsPdf() — one click, no dialog, produces an actual saved .pdf file via
 *   jsPDF + html2canvas. Trades away print-CSS page-break awareness and vector text
 *   for that directness — see the comment on downloadAsPdf() for specifics.
 *
 * Shared rendering pipeline for both:
 * - marked: fast, extensible CommonMark + GFM parser (tables, task lists, strikethrough).
 * - highlight.js: syntax highlighting for fenced code blocks.
 * - KaTeX: renders $inline$ and $$block$$ LaTeX math to real vector markup (not images),
 *   so equations stay crisp and selectable in the printed PDF.
 * - Mermaid: renders flowcharts/sequence/gantt/etc. fenced ```mermaid blocks to inline SVG
 *   *before* export, because neither the browser's print engine nor html2canvas can
 *   execute the JS Mermaid needs at export time — it has to already be SVG in the DOM.
 *
 * All dependencies are loaded client-side only (dynamic import) since this whole pipeline
 * must never run during SSR — it depends on `window`, `document`, and browser Canvas/SVG.
 */

export interface RenderResult {
    html: string;
    wordCount: number;
    readingTimeMin: number;
    headingCount: number;
    codeBlockCount: number;
    mermaidCount: number;
    mathCount: number;
}

let markedInstance: import("marked").Marked | null = null;

async function getMarked() {
    if (markedInstance) return markedInstance;
    const { Marked } = await import("marked");
    const { markedHighlight } = await import("marked-highlight");
    const hljs = (await import("highlight.js")).default;

    markedInstance = new Marked(
        markedHighlight({
            langPrefix: "hljs language-",
            highlight(code: string, lang: string) {
                const language = hljs.getLanguage(lang) ? lang : "plaintext";
                return hljs.highlight(code, { language }).value;
            },
        })
    );

    markedInstance.setOptions({ gfm: true, breaks: false });
    return markedInstance;
}

/**
 * Pulls $...$ and $$...$$ segments out of raw markdown and replaces them with KaTeX-rendered
 * HTML wrapped in placeholder spans, *before* marked() runs — otherwise marked's own escaping
 * mangles backslashes and underscores inside the math.
 */
async function preprocessMath(markdown: string): Promise<{ text: string; count: number }> {
    const katex = (await import("katex")).default;
    let count = 0;

    // Block math: $$...$$ (must run before inline to avoid partial matches)
    let text = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
        count++;
        try {
            const rendered = katex.renderToString(expr.trim(), { displayMode: true, throwOnError: false });
            return `\n\n<div class="md-math-block">${rendered}</div>\n\n`;
        } catch {
            return `<div class="md-math-error">[math error]</div>`;
        }
    });

    // Inline math: $...$. Requires no whitespace immediately inside the delimiters
    // (the same heuristic Pandoc and KaTeX's auto-render extension use) so that
    // currency like "$5 and $10" is left alone instead of being swallowed as math.
    text = text.replace(/(?<!\$)\$(?!\s)([^\n$]+?)(?<!\s)\$(?!\$)/g, (_, expr) => {
        count++;
        try {
            const rendered = katex.renderToString(expr.trim(), { displayMode: false, throwOnError: false });
            return `<span class="md-math-inline">${rendered}</span>`;
        } catch {
            return `<span class="md-math-error">[math error]</span>`;
        }
    });

    return { text, count };
}

/**
 * Renders all ```mermaid fenced blocks in a finished HTML string to inline SVG.
 * Runs against a detached container so it never flashes in the live DOM.
 */
async function renderMermaidBlocks(html: string): Promise<{ html: string; count: number }> {
    if (!html.includes('language-mermaid') && !html.includes('class="mermaid"')) {
        return { html, count: 0 };
    }

    const mermaid = (await import("mermaid")).default;
    mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "strict",
        fontFamily: "var(--font-geist-mono), monospace",
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const blocks = Array.from(
        doc.querySelectorAll("pre code.language-mermaid, code.language-mermaid")
    );

    let count = 0;
    for (const block of blocks) {
        const graphDefinition = block.textContent ?? "";
        const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
        try {
            const { svg } = await mermaid.render(id, graphDefinition);
            const wrapper = doc.createElement("div");
            wrapper.className = "md-mermaid-block";
            wrapper.innerHTML = svg;
            block.closest("pre")?.replaceWith(wrapper);
            count++;
        } catch {
            const errorEl = doc.createElement("div");
            errorEl.className = "md-mermaid-error";
            errorEl.textContent = "Diagram could not be rendered — check Mermaid syntax.";
            block.closest("pre")?.replaceWith(errorEl);
        }
    }

    return { html: doc.body.innerHTML, count };
}

function countWords(markdown: string): number {
    const stripped = markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/[#*_`>\-[\]()!]/g, " ");
    return stripped.split(/\s+/).filter(Boolean).length;
}

/**
 * Full pipeline: markdown source → final HTML ready to inject into the preview/print pane.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<RenderResult> {
    if (!markdown.trim()) {
        return { html: "", wordCount: 0, readingTimeMin: 0, headingCount: 0, codeBlockCount: 0, mermaidCount: 0, mathCount: 0 };
    }

    const { text: mathProcessed, count: mathCount } = await preprocessMath(markdown);
    const marked = await getMarked();
    const rawHtml = await marked.parse(mathProcessed);
    const { html: withMermaid, count: mermaidCount } = await renderMermaidBlocks(rawHtml as string);

    const wordCount = countWords(markdown);
    const headingCount = (markdown.match(/^#{1,6}\s/gm) ?? []).length;
    const codeBlockCount = (markdown.match(/^```/gm) ?? []).length / 2;

    return {
        html: withMermaid,
        wordCount,
        readingTimeMin: Math.max(1, Math.round(wordCount / 200)),
        headingCount,
        codeBlockCount: Math.floor(codeBlockCount),
        mermaidCount,
        mathCount,
    };
}

export type PageSize = "a4" | "letter";
export type PageMargin = "narrow" | "normal" | "wide";

export interface PrintOptions {
    title: string;
    pageSize: PageSize;
    margin: PageMargin;
    theme: "default" | "report" | "resume" | "academic";
}

const marginValues: Record<PageMargin, string> = {
    narrow: "12mm",
    normal: "20mm",
    wide: "30mm",
};

/**
 * Opens a dedicated print window containing only the rendered document and a print-tuned
 * stylesheet, then triggers window.print(). This isolates the print context from the app
 * chrome (toolbar, editor pane) so @page rules and break-inside controls apply cleanly.
 */
export function exportToPdf(html: string, options: PrintOptions) {
    const printWindow = window.open("", "_blank", "width=900,height=1100");
    if (!printWindow) {
        throw new Error("Pop-up blocked. Allow pop-ups for this site to export a PDF.");
    }

    const themeClass = `theme-${options.theme}`;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(options.title || "Document")}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<style>${printStylesheet(options.pageSize, options.margin)}</style>
</head>
<body class="${themeClass}">
<article class="md-document">${html}</article>
<a href="https://standardconvert.com/" class="md-watermark" target="_blank" rel="noopener">standardconvert.com</a>
<script>
  window.onload = function () {
    setTimeout(function () {
      window.print();
    }, 250);
  };
</script>
</body>
</html>`);
    printWindow.document.close();
}

function escapeHtml(str: string): string {
    return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));
}

const pageDimensionsMm: Record<PageSize, { w: number; h: number }> = {
    a4: { w: 210, h: 297 },
    letter: { w: 215.9, h: 279.4 },
};

/**
 * "Download as PDF" — same high-quality print-window pipeline as exportToPdf().
 * Opens the browser's Save-as-PDF dialog (the same one the Export button uses)
 * and auto-closes the popup once the dialog is dismissed, so there's no dangling window.
 * This replaces the previous html2canvas raster path which had persistent layout bugs.
 */
export function downloadAsPdf(html: string, options: PrintOptions): void {
    const printWindow = window.open("", "_blank", "width=900,height=1100");
    if (!printWindow) {
        throw new Error("Pop-up blocked. Allow pop-ups for this site to download a PDF.");
    }

    const themeClass = `theme-${options.theme}`;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(options.title || "Document")}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<style>${printStylesheet(options.pageSize, options.margin)}</style>
</head>
<body class="${themeClass}">
<article class="md-document">${html}</article>
<a href="https://standardconvert.com/" class="md-watermark" target="_blank" rel="noopener">standardconvert.com</a>
<script>
  window.onload = function () {
    setTimeout(function () {
      window.print();
      // Close the helper popup after the print dialog is dismissed (works in Chrome/Edge/Firefox).
      window.close();
    }, 300);
  };
<\/script>
</body>
</html>`);
    printWindow.document.close();
}


function printStylesheet(pageSize: PageSize, margin: PageMargin): string {
    return `
    @page { size: ${pageSize}; margin: ${marginValues[margin]}; }
    * { box-sizing: border-box; }
    body {
      font-family: var(--font-geist-sans), -apple-system, sans-serif;
      color: #0a0a0a;
      line-height: 1.65;
      font-size: 11pt;
      margin: 0;
      padding-bottom: 16pt;
    }
    .md-document { max-width: 100%; }

    /* --- Watermark link, repeats on every printed page in Chromium-based print engines.
       position: fixed inside a print context is re-rendered per page rather than once. ---*/
    .md-watermark {
      position: fixed;
      bottom: 4mm;
      left: 0;
      right: 0;
      text-align: center;
      font-family: var(--font-geist-mono), monospace;
      font-size: 7pt;
      letter-spacing: 0.02em;
      color: #b3b3b3;
      text-decoration: none;
    }
    .md-watermark:hover { color: #888; }
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.25;
      margin: 1.4em 0 0.6em;
      break-after: avoid;
      page-break-after: avoid;
    }
    h1 { font-size: 22pt; border-bottom: 2px solid #0a0a0a; padding-bottom: 0.3em; }
    h2 { font-size: 16pt; margin-top: 1.8em; }
    h3 { font-size: 13pt; }
    p { margin: 0.7em 0; orphans: 3; widows: 3; }
    img { max-width: 100%; break-inside: avoid; }

    /* --- This is the page-break-control differentiator --- */
    pre, table, .md-mermaid-block, .md-math-block, blockquote, ul, ol {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    pre {
      background: #f6f6f6;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 14px 16px;
      overflow-x: auto;
      font-family: var(--font-geist-mono), monospace;
      font-size: 9.5pt;
    }
    code { font-family: var(--font-geist-mono), monospace; }
    :not(pre) > code {
      background: #f0f0f0;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
      font-size: 10pt;
    }
    table thead { display: table-header-group; } /* repeat header row across page breaks */
    tr { break-inside: avoid; page-break-inside: avoid; }
    th, td { border: 1px solid #d8d8d8; padding: 6px 10px; text-align: left; }
    th { background: #f6f6f6; font-weight: 600; }
    blockquote {
      border-left: 3px solid #0a0a0a;
      margin: 1em 0;
      padding: 0.2em 1em;
      color: #444;
      font-style: italic;
    }
    .md-mermaid-block { text-align: center; margin: 1.4em 0; }
    .md-mermaid-block svg { max-width: 100%; height: auto !important; }
    .md-math-block { text-align: center; margin: 1em 0; overflow-x: auto; }
    a { color: #0a0a0a; text-decoration: underline; }
    hr { border: none; border-top: 1px solid #d8d8d8; margin: 2em 0; break-after: avoid; }

    /* Section break helper — users can type <!--pagebreak--> which we convert upstream,
       or apply class="page-break-before" via raw HTML in their markdown. */
    .page-break-before { break-before: page; page-break-before: always; }

    .theme-report h1 { font-family: var(--font-geist-sans); letter-spacing: -0.01em; }
    .theme-resume body { font-size: 10pt; }
    .theme-resume h1 { font-size: 18pt; border-bottom: none; }
    .theme-academic body { font-family: Georgia, "Times New Roman", serif; font-size: 11.5pt; line-height: 1.8; }
    .theme-academic h1, .theme-academic h2, .theme-academic h3 { font-family: var(--font-geist-sans); }
  `;
}

/**
 * Stylesheet variant for the html2canvas download path.
 * Identical to printStylesheet() except all var(--font-geist-*) references are replaced
 * with real system font stacks — html2canvas cannot resolve Next.js CSS custom properties
 * that are declared on :root via the framework, so they come back as empty strings and
 * cause text to render at a browser-default size / fallback font that breaks layout.
 */
function downloadStylesheet(pageSize: PageSize, margin: PageMargin): string {
    const sansStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    const monoStack = "'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace";

    return `
    * { box-sizing: border-box; }
    .md-document {
      font-family: ${sansStack};
      color: #0a0a0a;
      line-height: 1.65;
      font-size: 11pt;
      margin: 0;
      padding: ${marginValues[margin]} ${marginValues[margin]} 16pt;
      max-width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.25;
      margin: 1.4em 0 0.6em;
    }
    h1 { font-size: 22pt; border-bottom: 2px solid #0a0a0a; padding-bottom: 0.3em; }
    h2 { font-size: 16pt; margin-top: 1.8em; }
    h3 { font-size: 13pt; }
    p { margin: 0.7em 0; }
    img { max-width: 100%; }
    pre {
      background: #f6f6f6;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      padding: 14px 16px;
      overflow-x: hidden;
      font-family: ${monoStack};
      font-size: 9.5pt;
      white-space: pre-wrap;
      word-break: break-all;
    }
    code { font-family: ${monoStack}; }
    :not(pre) > code {
      background: #f0f0f0;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
      font-size: 10pt;
    }
    th, td { border: 1px solid #d8d8d8; padding: 6px 10px; text-align: left; }
    th { background: #f6f6f6; font-weight: 600; }
    blockquote {
      border-left: 3px solid #0a0a0a;
      margin: 1em 0;
      padding: 0.2em 1em;
      color: #444;
      font-style: italic;
    }
    .md-mermaid-block { text-align: center; margin: 1.4em 0; }
    .md-mermaid-block svg { max-width: 100%; height: auto !important; }
    .md-math-block { text-align: center; margin: 1em 0; overflow-x: auto; }
    a { color: #0a0a0a; text-decoration: underline; }
    hr { border: none; border-top: 1px solid #d8d8d8; margin: 2em 0; }
    .theme-resume .md-document { font-size: 10pt; }
    .theme-resume h1 { font-size: 18pt; border-bottom: none; }
    .theme-academic .md-document { font-family: Georgia, "Times New Roman", serif; font-size: 11.5pt; line-height: 1.8; }
  `;
}