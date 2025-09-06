import { NextRequest, NextResponse } from "next/server";
import { getResumeConfig, isValidResumeType } from "@/features/resume";
import { logger } from "@/shared/utils";

// Chrome args for Puppeteer
const CHROME_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-accelerated-2d-canvas",
  "--no-first-run",
  "--no-zygote",
  "--single-process",
  "--disable-gpu",
  "--disable-web-security",
  "--disable-features=VizDisplayCompositor",
];

const apiLogger = logger;

/**
 * Launch browser with appropriate configuration based on environment
 */
async function launchBrowser() {
  if (process.env.VERCEL) {
    // Production: Use Sparticuz Chromium for Vercel
    apiLogger.info("Using @sparticuz/chromium for Vercel production");

    const chromium = await import("@sparticuz/chromium");
    const puppeteer = await import("puppeteer-core");

    return await puppeteer.default.launch({
      args: [...chromium.default.args, ...CHROME_ARGS],
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });
  } else {
    // Local development: Use regular puppeteer
    apiLogger.info("Using regular puppeteer for local development");

    const puppeteer = await import("puppeteer");

    return await puppeteer.default.launch({
      headless: true,
      args: CHROME_ARGS,
    });
  }
}

/**
 * Generate PDF for specialized resume types
 */
async function generateSpecializedResumePDF(
  resumeUrl: string,
  browser: Awaited<ReturnType<typeof launchBrowser>>
) {
  const page = await browser.newPage();

  try {
    apiLogger.debug(`Navigating to resume URL: ${resumeUrl}`);

    // Navigate to the resume page
    await page.goto(resumeUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    apiLogger.debug("Page loaded successfully");

    // // Add ATS-optimized print styles
    // await page.addStyleTag({
    //   content: getATSPrintStyles(),
    // });

    apiLogger.debug("Print styles added, generating PDF...");

    // Generate PDF with A4 format allowing multiple pages
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
        right: "0.5in",
      },
      preferCSSPageSize: false, // Allow multiple pages
    });

    apiLogger.debug("PDF generated successfully");
    return pdf;
  } finally {
    await page.close();
  }
}

// /**
//  * Get ATS-optimized print styles
//  */
// function getATSPrintStyles(): string {
//   return `
//     @media print {
//       /* Page setup for ATS compatibility */
//       @page {
//         size: A4;
//         margin: 0.5in;
//       }

//       /* Body optimization */
//       body {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//         background: white !important;
//         color: black !important;
//         font-family: "Times New Roman", serif !important;
//         font-size: 11pt !important;
//         line-height: 1.2 !important;
//         margin: 0 !important;
//         padding: 0 !important;
//       }

//       /* Hide non-printable elements */
//       .print\\:hidden {
//         display: none !important;
//       }

//       /* Container adjustments */
//       .min-h-screen {
//         min-height: auto !important;
//         background: white !important;
//         padding: 0 !important;
//       }

//       .resume-container {
//         max-width: none !important;
//         box-shadow: none !important;
//         border-radius: 0 !important;
//         margin: 0 !important;
//         padding: 0 !important;
//         background: white !important;
//       }

//       .ats-resume-wrapper {
//         padding: 0 !important;
//       }

//       /* ATS Resume styles */
//       .ats-resume {
//         background: white !important;
//         color: black !important;
//         font-family: "Times New Roman", serif !important;
//         max-width: none !important;
//         margin: 0 !important;
//         padding: 0 !important;
//       }

//       /* Header styles for ATS */
//       .ats-header {
//         border-bottom: 2px solid #333 !important;
//         padding-bottom: 12pt !important;
//         margin-bottom: 16pt !important;
//       }

//       .ats-header h1 {
//         font-size: 18pt !important;
//         font-weight: bold !important;
//         color: black !important;
//         margin: 0 0 6pt 0 !important;
//         text-align: center !important;
//       }

//       .ats-header h2 {
//         font-size: 14pt !important;
//         color: #333 !important;
//         margin: 0 0 8pt 0 !important;
//         text-align: center !important;
//       }

//       .contact-info {
//         font-size: 10pt !important;
//         color: #666 !important;
//         text-align: center !important;
//         line-height: 1.3 !important;
//       }

//       .contact-info > div {
//         margin-bottom: 3pt !important;
//       }

//       /* Section styles */
//       .ats-section {
//         margin-bottom: 16pt !important;
//         page-break-inside: avoid !important;
//       }

//       .ats-section-title {
//         font-size: 14pt !important;
//         font-weight: bold !important;
//         color: black !important;
//         margin: 0 0 8pt 0 !important;
//         border-bottom: 1px solid #333 !important;
//         padding-bottom: 2pt !important;
//         text-transform: uppercase !important;
//       }

//       /* Text styles */
//       p {
//         font-size: 11pt !important;
//         line-height: 1.3 !important;
//         margin: 0 0 6pt 0 !important;
//         color: black !important;
//       }

//       h3 {
//         font-size: 12pt !important;
//         font-weight: bold !important;
//         color: black !important;
//         margin: 6pt 0 3pt 0 !important;
//       }

//       h4 {
//         font-size: 11pt !important;
//         font-weight: bold !important;
//         color: black !important;
//         margin: 3pt 0 2pt 0 !important;
//       }

//       /* List styles for ATS */
//       ul {
//         margin: 3pt 0 6pt 0 !important;
//         padding-left: 16pt !important;
//       }

//       li {
//         font-size: 11pt !important;
//         line-height: 1.3 !important;
//         margin-bottom: 2pt !important;
//         color: black !important;
//       }

//       /* Grid layouts - convert to linear for ATS */
//       .skills-grid,
//       .education-grid,
//       .languages-grid {
//         display: block !important;
//       }

//       .skills-grid > div,
//       .education-grid > div,
//       .languages-grid > div {
//         margin-bottom: 8pt !important;
//         display: block !important;
//         width: 100% !important;
//       }

//       /* Experience and project items */
//       .experience-item,
//       .project-item {
//         margin-bottom: 12pt !important;
//         page-break-inside: avoid !important;
//       }

//       .experience-header,
//       .project-header {
//         margin-bottom: 4pt !important;
//       }

//       /* Technology lists - convert to paragraph */
//       .technologies p,
//       .project-technologies p {
//         font-style: italic !important;
//         color: #555 !important;
//       }

//       /* Ensure page breaks work properly */
//       .experience-item:last-child,
//       .project-item:last-child {
//         margin-bottom: 0 !important;
//       }

//       /* Remove unnecessary styling */
//       .flex,
//       .flex-wrap,
//       .justify-between,
//       .items-center {
//         display: block !important;
//       }

//       /* Dates and locations */
//       .text-sm {
//         font-size: 10pt !important;
//       }

//       /* Force standard fonts for ATS compatibility */
//       * {
//         font-family: "Times New Roman", serif !important;
//       }
//     }
//   `;
// }

/**
 * API Route handler for specialized resume PDF generation
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string; type: string }> }
) {
  let browser;

  try {
    const { locale, type } = await params;

    // Validate resume type
    if (!isValidResumeType(type)) {
      apiLogger.warn(`Invalid resume type: ${type}`);
      return NextResponse.json({ error: "Invalid resume type" }, { status: 400 });
    }

    // Validate resume config exists
    const config = getResumeConfig(type);
    if (!config) {
      apiLogger.warn(`No config found for resume type: ${type}`);
      return NextResponse.json({ error: "Resume configuration not found" }, { status: 404 });
    }

    apiLogger.info(`Generating PDF for ${type} resume in ${locale} locale`);

    // Get the base URL
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    // Construct resume URL
    const resumeUrl = `${baseUrl}/${locale}/resume/${type}`;

    apiLogger.debug(`Resume URL: ${resumeUrl}`);

    // Launch browser
    browser = await launchBrowser();

    // Generate PDF
    const pdf = await generateSpecializedResumePDF(resumeUrl, browser);

    apiLogger.info(`Successfully generated ${type} resume PDF`);

    // Return PDF response
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="muhammad-ahmed-shehzad-${type}-resume-${locale}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    apiLogger.error("PDF generation failed", error as Error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        apiLogger.warn(
          `Failed to close browser: ${closeError instanceof Error ? closeError.message : String(closeError)}`
        );
      }
    }
  }
}
