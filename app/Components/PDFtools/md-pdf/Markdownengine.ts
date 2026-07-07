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
  calloutCount: number;
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

/**
 * GitHub Alert + Obsidian Callout syntax: a blockquote whose first line is `[!TYPE]`,
 * optionally followed by a fold indicator (+/-) and a custom title. Both ecosystems use
 * the same underlying pattern, so one config covers GitHub's 5 alert types and Obsidian's
 * broader callout set (including aliases like `caution` -> warning, `error` -> danger).
 * Unrecognized types fall back to "note" styling, matching Obsidian's own behavior.
 */
interface CalloutConfig {
  label: string;
  color: string; // accent used for left border, icon, and title text
  // Precomputed light tint of `color` toward white (~7%), used as the callout
  // background. This is a static hex value rather than a CSS color-mix() call
  // because html2canvas (used by downloadAsPdf()) throws and aborts the entire
  // capture on any color function newer than hex/rgb/hsl — color-mix(), oklch(),
  // and color() all break it. Precomputing avoids the runtime function entirely.
  bgTint: string;
  // Minimal Lucide-style icon path, inlined as SVG so no icon font/network dependency
  // is introduced — keeps the "100% client-side" story in Trust.tsx true.
  iconPath: string;
}

const CALLOUT_TYPES: Record<string, CalloutConfig> = {
  note: { label: "Note", color: "#0969da", bgTint: "#eef4fc", iconPath: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" },
  abstract: { label: "Abstract", color: "#0c8c7c", bgTint: "#eef7f6", iconPath: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" },
  info: { label: "Info", color: "#0969da", bgTint: "#eef4fc", iconPath: "M12 16v-4M12 8h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z" },
  todo: { label: "Todo", color: "#0969da", bgTint: "#eef4fc", iconPath: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" },
  tip: { label: "Tip", color: "#0c8c7c", bgTint: "#eef7f6", iconPath: "M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" },
  success: { label: "Success", color: "#1a7f37", bgTint: "#eff6f1", iconPath: "M20 6L9 17l-5-5" },
  question: { label: "Question", color: "#9a6700", bgTint: "#f8f4ed", iconPath: "M9.1 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z" },
  warning: { label: "Warning", color: "#9a6700", bgTint: "#f8f4ed", iconPath: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" },
  failure: { label: "Failure", color: "#cf222e", bgTint: "#fcf0f0", iconPath: "M18 6L6 18M6 6l12 12" },
  danger: { label: "Danger", color: "#cf222e", bgTint: "#fcf0f0", iconPath: "M13 2L3 14h7l-1 8 10-12h-7l1-8z" },
  bug: { label: "Bug", color: "#cf222e", bgTint: "#fcf0f0", iconPath: "M8 2l1.5 1.5M16 2l-1.5 1.5M9 7h6a4 4 0 014 4v4a6 6 0 01-12 0v-4a4 4 0 014-4zM3 13h4M17 13h4M5 21l2.5-2.5M19 21l-2.5-2.5" },
  example: { label: "Example", color: "#6639ba", bgTint: "#f4f1fa", iconPath: "M4 6h16M4 12h16M4 18h7" },
  quote: { label: "Quote", color: "#6b7280", bgTint: "#f5f5f6", iconPath: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v4z" },
  // GitHub-specific: IMPORTANT is its own distinct purple type ("key information users
  // need to know to achieve their goal"), separate from tip (green) — kept separate
  // rather than folded into Obsidian's looser "tip, hint, important" alias grouping.
  important: { label: "Important", color: "#8250df", bgTint: "#f6f3fd", iconPath: "M12 16v-4M12 8h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z" },
};

// Aliases map to a canonical type above.
const CALLOUT_ALIASES: Record<string, string> = {
  summary: "abstract", tldr: "abstract",
  hint: "tip",
  check: "success", done: "success",
  help: "question", faq: "question",
  attention: "warning",
  fail: "failure", missing: "failure",
  error: "danger",
  // GitHub's own alert spec defines CAUTION as its own most-severe, red type — the
  // same severity tier as Obsidian's "danger", not an alias of "warning" (orange).
  // Some third-party Obsidian community write-ups group caution under warning instead,
  // but GitHub is the authoritative source for what its own CAUTION type means, since
  // it's GitHub's syntax to begin with.
  caution: "danger",
  cite: "quote",
};

function resolveCalloutType(rawType: string): { key: string; config: CalloutConfig } {
  const normalized = rawType.toLowerCase().trim();
  const canonical = CALLOUT_ALIASES[normalized] ?? normalized;
  const config = CALLOUT_TYPES[canonical];
  return config ? { key: canonical, config } : { key: "note", config: CALLOUT_TYPES.note };
}

const CALLOUT_MARKER = /^\[!([a-zA-Z-]+)\]([+-]?)\s*(.*)$/;

/**
 * Finds every <blockquote> in marked's output whose content starts with a callout
 * marker (`[!type]`, optionally `+`/`-` and a custom title) and rewrites it into a
 * styled callout block. Runs as HTML post-processing rather than markdown preprocessing
 * — unlike math, a callout's body can contain anything marked already knows how to
 * render (bold, links, lists, code, nested blockquotes), so it's far simpler to let
 * marked parse the blockquote normally first and restructure the result afterward.
 */
function transformCallouts(html: string): { html: string; count: number } {
  if (!html.includes("[!")) return { html, count: 0 };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blockquotes = Array.from(doc.querySelectorAll("blockquote"));

  let count = 0;
  for (const bq of blockquotes) {
    const firstP = bq.querySelector("p");
    if (!firstP) continue;

    // The marker line is either the entire first <p> (blank-line-separated style) or
    // the first line of it, joined to the rest of that paragraph's content by \n
    // (the common single-blank-line-free style) — see markdownEngine.ts research notes.
    const firstLine = (firstP.textContent ?? "").split("\n")[0];
    const match = CALLOUT_MARKER.exec(firstLine.trim());
    if (!match) continue;

    const [, rawType, fold, customTitle] = match;
    const { key, config } = resolveCalloutType(rawType);
    count++;

    // Strip the marker line out of the first paragraph, preserving any remaining
    // inline-formatted content (bold/links/code) that followed it on the same line.
    const restOfFirstP = firstP.innerHTML.split(/\n/).slice(1).join("\n").trim();
    if (restOfFirstP) {
      firstP.innerHTML = restOfFirstP;
    } else {
      firstP.remove();
    }

    const title = customTitle.trim() || config.label;
    const isFoldable = fold === "+" || fold === "-";
    const startsOpen = fold !== "-";

    // Foldable callouts (+/-) use native <details>/<summary> so fold/unfold works with
    // zero JS wiring even though this HTML is injected via dangerouslySetInnerHTML.
    // Non-foldable callouts use plain <div>s since there's nothing to toggle.
    const wrapper = doc.createElement(isFoldable ? "details" : "div");
    wrapper.className = `md-callout md-callout-${key}`;
    wrapper.setAttribute("data-callout", key);
    wrapper.setAttribute("style", `--md-callout-color: ${config.color}; --md-callout-bg: ${config.bgTint};`);
    if (isFoldable && startsOpen) wrapper.setAttribute("open", "");

    const titleBar = doc.createElement(isFoldable ? "summary" : "div");
    titleBar.className = "md-callout-title";
    // Stroke color is set as an explicit SVG attribute (config.color) rather than
    // stroke="currentColor" inheriting from CSS — html2canvas has long-standing,
    // version-dependent unreliability resolving CSS-driven fill/stroke on inline SVG,
    // so baking the color directly into the markup removes that failure mode entirely
    // for the downloadAsPdf() path, while looking identical everywhere else.
    titleBar.innerHTML = `<svg class="md-callout-icon" viewBox="0 0 24 24" fill="none" stroke="${config.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${config.iconPath}"/></svg><span>${escapeHtml(title)}</span>${isFoldable ? `<svg class="md-callout-fold" viewBox="0 0 24 24" fill="none" stroke="${config.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>` : ""
      }`;

    const body = doc.createElement("div");
    body.className = "md-callout-body";
    // Move every remaining child of the original blockquote into the new body.
    while (bq.firstChild) {
      body.appendChild(bq.firstChild);
    }

    wrapper.appendChild(titleBar);
    wrapper.appendChild(body);
    bq.replaceWith(wrapper);
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
    return { html: "", wordCount: 0, readingTimeMin: 0, headingCount: 0, codeBlockCount: 0, mermaidCount: 0, mathCount: 0, calloutCount: 0 };
  }

  const { text: mathProcessed, count: mathCount } = await preprocessMath(markdown);
  const marked = await getMarked();
  const rawHtml = await marked.parse(mathProcessed);
  const { html: withCallouts, count: calloutCount } = transformCallouts(rawHtml as string);
  const { html: withMermaid, count: mermaidCount } = await renderMermaidBlocks(withCallouts);

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
    calloutCount,
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

  const printHtml = forceOpenDetails(html);
  const themeClass = `theme-${options.theme}`;

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(options.title || "Document")}</title>
<link id="hljs-css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<link id="katex-css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<style>${printStylesheet(options.pageSize, options.margin)}</style>
</head>
<body class="${themeClass}">
<article class="md-document">${printHtml}</article>
<a href="https://standardconvert.com/" class="md-watermark" target="_blank" rel="noopener">standardconvert.com</a>
<script>
  (function () {
    // Maximum time to wait for remote resources before printing anyway (ms).
    // KaTeX fonts can be slow on first load; 4 s covers even slow connections
    // while still being far shorter than the old "wait a few seconds manually" workaround.
    var FALLBACK_MS = 4000;
    var printed = false;

    function doPrint() {
      if (printed) return;
      printed = true;
      window.print();
    }

    // Safety valve: always print eventually even if a resource hangs.
    var fallback = setTimeout(doPrint, FALLBACK_MS);

    function tryPrint() {
      // document.fonts.ready resolves after every @font-face declared in the
      // page's stylesheets (including those loaded via CDN <link> tags) has
      // either downloaded or failed. This is the correct signal to use instead
      // of a blind setTimeout, because window.onload fires as soon as the HTML
      // is parsed — before the CDN stylesheet fetches and their referenced fonts
      // have finished downloading.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          clearTimeout(fallback);
          doPrint();
        });
      } else {
        // Older Safari / Firefox ESR fallback: fonts API unavailable.
        // Give an extra 800 ms beyond stylesheet load for @font-face downloads.
        setTimeout(function () {
          clearTimeout(fallback);
          doPrint();
        }, 800);
      }
    }

    // Track how many external <link> stylesheets still need to load.
    // We only proceed to tryPrint() once all of them have fired their
    // load event (or errored), because document.fonts.ready only knows
    // about fonts that are already referenced by parsed CSS — if the
    // stylesheet hasn't loaded yet, its @font-face rules aren't visible yet.
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    var pending = links.length;

    if (pending === 0) {
      // No external stylesheets; go straight to font-ready check.
      tryPrint();
      return;
    }

    function onLinkSettled() {
      pending -= 1;
      if (pending === 0) {
        // All stylesheets are parsed; NOW wait for the fonts they declared.
        tryPrint();
      }
    }

    Array.prototype.forEach.call(links, function (link) {
      // If a <link> already has its sheet populated the load event has already
      // fired (can happen when the browser serves from cache synchronously).
      if (link.sheet) {
        onLinkSettled();
      } else {
        link.addEventListener('load', onLinkSettled);
        link.addEventListener('error', onLinkSettled); // count errors too, don't hang
      }
    });
  })();
</script>
</body>
</html>`);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));
}

/**
 * Collapsed (-) callouts use <details> without the `open` attribute so they fold/unfold
 * on screen — but a PDF is a static document, and a reader can't click anything in it.
 * Both export paths run this first so a collapsed callout's content is never silently
 * missing from the output; it just always renders expanded in the PDF.
 */
function forceOpenDetails(html: string): string {
  if (!html.includes("<details")) return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  doc.querySelectorAll("details").forEach((el) => el.setAttribute("open", ""));
  return doc.body.innerHTML;
}

const pageDimensionsMm: Record<PageSize, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};



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
    pre, table, .md-mermaid-block, .md-math-block, blockquote, .md-callout, ul, ol {
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

    /* --- GitHub Alert / Obsidian Callout rendering. Colors come from inline style
       attributes set per-type in transformCallouts(), so this block only needs to lay
       out the structure shared by every type. Print is static, so collapsed (-) callouts
       still render fully expanded here — folding only makes sense on screen. --- */
    .md-callout {
      margin: 1em 0;
      border-radius: 6px;
      border: 1px solid var(--md-callout-color, #888);
      border-left-width: 4px;
      background: var(--md-callout-bg, #f5f5f5);
      overflow: hidden;
      /* Browsers default to print-color-adjust: economy, which can strip or lighten
         backgrounds to save ink — without this override the tinted callout background
         can silently disappear in the printed PDF even though it renders fine on screen. */
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .md-callout-title {
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 0.5em 0.9em;
      font-weight: 600;
      font-size: 0.95em;
      color: var(--md-callout-color, #444);
      break-after: avoid;
    }
    .md-callout-icon { width: 16px; height: 16px; flex-shrink: 0; }
    .md-callout-fold { display: none; } /* purely a screen/interactive affordance */
    .md-callout-body {
      padding: 0 0.9em 0.8em 0.9em;
      font-style: normal;
      color: #1a1a1a;
    }
    .md-callout-body > *:first-child { margin-top: 0; }
    .md-callout-body > *:last-child { margin-bottom: 0; }
    .md-callout-collapsed .md-callout-body { display: block; } /* always expand for print */

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