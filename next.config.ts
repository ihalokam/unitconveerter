import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    const bulkSuffix = "-in-bulk-csv-excel-files";
    const routes = ["energy", "length", "mass", "pressure", "temperature", "volume"];

    const bulkRedirects = routes.map((r) => ({
      source: `/${r}-unit-converter`,
      destination: `/bulk-unit-converter/${r}-unit-converter${bulkSuffix}`,
      permanent: true,
    }));

    // Force permanent (301) www → non-www redirect so Google
    // recognises non-www as the only canonical origin.
    const wwwRedirects = [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.standardconvert.com" }],
        destination: "https://standardconvert.com/:path*",
        permanent: true,
      },
    ];

    return [...wwwRedirects, ...bulkRedirects];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
