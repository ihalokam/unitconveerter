// ─── Tool Registry ────────────────────────────────────────────────────────────
// To add a new tool, just append an object to the relevant category's `tools`
// array. No other file needs touching.

export interface Tool {
    name: string;
    description: string;
    href: string;
    badge?: string;
}

export interface Category {
    id: string;
    label: string;
    icon: string; // emoji or short text glyph
    tools: Tool[];
}

export const TOOL_REGISTRY: Category[] = [
    {
        id: "unit-converters",
        label: "Unit Converters",
        icon: "⚖️",
        tools: [
            {
                name: "Unit Converter",
                description: "Convert between common units across mass, length, temperature, volume, energy and more.",
                href: "/unit-converter",
            },
            {
                name: "Bulk Mass Converter",
                description: "Convert mass values in bulk via CSV / Excel file upload.",
                href: "/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
            {
                name: "Bulk Length Converter",
                description: "Convert hundreds of length values at once from a spreadsheet.",
                href: "/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
            {
                name: "Bulk Temperature Converter",
                description: "Batch-convert temperature readings across Celsius, Fahrenheit & Kelvin.",
                href: "/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
            {
                name: "Bulk Volume Converter",
                description: "Convert volume units in bulk — litres, gallons, cubic metres and more.",
                href: "/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
            {
                name: "Bulk Energy Converter",
                description: "Convert energy values in bulk — joules, calories, kWh, BTU and more.",
                href: "/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
            {
                name: "Bulk Pressure Converter",
                description: "Convert pressure readings in bulk — Pa, bar, psi, atm and more.",
                href: "/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files",
                badge: "CSV",
            },
        ],
    },
    {
        id: "pdf-tools",
        label: "PDF Tools",
        icon: "📄",
        tools: [
            {
                name: "Image to PDF Converter",
                description: "Convert JPG, PNG, WebP and other images to a PDF in seconds — no upload, fully in-browser.",
                href: "/pdf-tools/image-to-pdf-converter",
                badge: "Privacy-first",
            },
            {
                name: "Markdown to PDF",
                description: "Paste or write Markdown and export a clean, print-ready PDF instantly.",
                href: "/pdf-tools/markdown-to-pdf",
            },
            {
                name: "Merge PDFs",
                description: "Drag and drop multiple PDF files and merge them into a single document.",
                href: "/pdf-tools/merge-pdfs",
            },
            {
                name: "PDF Metadata Remover",
                description: "Strip author, title, and all hidden metadata from PDF files privately.",
                href: "/pdf-tools/pdf-metadata-remover",
                badge: "Privacy",
            },
        ],
    },
    {
        id: "calculators",
        label: "Calculators",
        icon: "🧮",
        tools: [
            {
                name: "Age Calculator",
                description: "Calculate your exact age in years, months, days — plus zodiac, birthstone, and cosmic stats.",
                href: "/calculator/age-calculator",
                badge: "Popular",
            },
            {
                name: "YouTube Long-form Earnings",
                description: "Estimate YouTube ad revenue for long-form videos by country, niche and duration.",
                href: "/calculator/long-youtube-video-earnings-calculator",
            },
            {
                name: "YouTube Shorts Earnings",
                description: "Estimate Shorts revenue by country with 2026 RPM data — daily, monthly and yearly.",
                href: "/calculator/youtube-shorts-earnings-calculator",
            },
            {
                name: "Concrete Calculator",
                description: "Calculate bags, batching recipes, cost estimates and rebar layouts for concrete work.",
                href: "/calculator/concrete-calculator",
            },
        ],
    },
];
