import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://portfolio-azure-five-75.vercel.app/sitemap.xml

# Block access to sensitive files
Disallow: /api/
Disallow: /_next/
Disallow: /performance-analysis.js`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
