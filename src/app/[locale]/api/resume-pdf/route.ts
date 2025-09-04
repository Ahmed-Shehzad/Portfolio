import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/shared/utils/production-logger";

const apiLogger = logger.createComponentLogger("ResumeAPI");

// Common Chrome arguments
const CHROME_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-web-security",
  "--disable-features=VizDisplayCompositor",
  "--disable-dev-shm-usage",
  "--disable-software-rasterizer",
  "--disable-gpu",
  "--disable-extensions",
];

async function launchBrowser() {
  // Detect if we're running on Vercel
  const isVercel = process.env["VERCEL"] === "1" || !!process.env["VERCEL_ENV"];

  apiLogger.info("Launching browser", { isVercel, nodeEnv: process.env.NODE_ENV });

  if (isVercel) {
    // Production on Vercel: Use @sparticuz/chromium with puppeteer-core
    apiLogger.info("Using @sparticuz/chromium for Vercel deployment");

    const chromium = await import("@sparticuz/chromium");
    const puppeteerCore = await import("puppeteer-core");

    const execPath = await chromium.default.executablePath();
    apiLogger.debug("Chromium executable path obtained", { execPath });

    return await puppeteerCore.default.launch({
      args: [...chromium.default.args, ...CHROME_ARGS],
      executablePath: execPath,
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
async function generateResumePDF(
  baseUrl: string,
  locale: string,
  browser: Awaited<ReturnType<typeof launchBrowser>>
) {
  const page = await browser.newPage();

  // Set headers to bypass security checkpoints
  await page.setExtraHTTPHeaders({
    "user-agent": "Mozilla/5.0 (compatible; PDF-Generator/1.0)",
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "accept-language": "en-US,en;q=0.5",
    "accept-encoding": "gzip, deflate, br",
    connection: "keep-alive",
    "upgrade-insecure-requests": "1",
  });

  // Set viewport for consistent rendering
  await page.setViewport({ width: 1200, height: 800 });

  apiLogger.debug("Navigation in progress", { url: `${baseUrl}/${locale}/resume` });

  // Navigate with timeout and wait for network idle
  await page.goto(`${baseUrl}/${locale}/resume`, {
    waitUntil: ["networkidle0", "domcontentloaded"],
    timeout: 60000, // Increased timeout for slow serverless starts
  });

  apiLogger.debug("Page loaded, waiting for content");

  // Wait for the main content to load
  await page.waitForSelector("main", { timeout: 30000 });

  // Wait for images and content to load
  await page.waitForSelector('[data-testid="profile-image"], img', { timeout: 10000 }).catch(() => {
    // Continue if image doesn't load
  });

  // Wait a bit more for any lazy-loaded content
  await new Promise((resolve) => setTimeout(resolve, 3000));

  apiLogger.debug("Content loaded, generating PDF");

  // Add print styles to compress content to single page
  await page.addStyleTag({
    content: getResumePrintStyles(),
  });

  apiLogger.debug("Print styles added, generating PDF");

  // Generate PDF with single page optimization
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "5mm",
      right: "5mm",
      bottom: "5mm",
      left: "5mm",
    },
    displayHeaderFooter: false,
    preferCSSPageSize: true, // Use CSS page size
    scale: 0.9, // More aggressive scale to fit everything on one page
    pageRanges: "1", // Ensure only one page
  });

  await page.close();
  apiLogger.info("PDF generated successfully");

  return pdf;
}

function getResumePrintStyles(): string {
  return `
  /* Print styles for resume page - single page exact browser alignment */
  @media print {
    /* Force single page layout */
    @page {
      size: A4;
      margin: 0; /* No page margins - handled by content */
    }

    /* Body setup for single page fit */
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100vh !important; /* Fixed viewport height */
      overflow: hidden !important; /* Prevent overflow to second page */
      font-size: 12px !important; /* Increased from 10px for better visibility */
      line-height: 1.3 !important; /* Improved line height */
    }

    /* Main screen container - exact browser alignment */
    .min-h-screen {
      min-height: 100vh !important;
      height: 100vh !important;
      max-height: 100vh !important;
      padding: 0 !important;
      margin: 0 !important;
      background: white !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      align-items: center !important;
      width: 100% !important;
    }

    /* Hide download button completely */
    .min-h-screen > div:first-child {
      display: none !important;
    }

    /* Container alignment exactly as browser */
    .min-h-screen > * {
      margin: 0 !important;
      width: 100% !important;
      max-width: none !important;
    }

    /* Resume container - single page constraint */
    .resume-container {
      height: 100vh !important;
      max-height: 100vh !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 8px !important; /* Minimal padding for single page */
      box-shadow: none !important;
      border-radius: 0 !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      page-break-inside: avoid !important;
      page-break-after: avoid !important;
    }

    /* Grid layout exactly as browser but compressed */
    .resume-grid {
      display: grid !important;
      grid-template-columns: 200px 1fr !important; /* Sidebar increased by 20% (180px * 1.2), main content takes remaining space */
      gap: 8px !important; /* Minimal gap */
      width: 100% !important;
      max-width: 100% !important; /* Remove A4 constraint to use full page width */
      height: 100% !important;
      flex: 1 !important;
      overflow: hidden !important;
    }

    /* Main content width and text adjustment */
    main {
      padding: 6px !important;
      height: 100% !important;
      width: 100% !important;
      max-width: 100% !important; /* Remove width constraint to take all available space */
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      justify-content: flex-start !important; /* Exact browser alignment */
    }

    /* Main sections width control and content spacing */
    main > section {
      width: 100% !important;
      max-width: 90% !important;
      margin: 0 !important; /* Remove all vertical margins between sections */
      padding: 0 !important; /* Remove any padding that might create space */
    }

    main > section > div {
      width: 100% !important;
      max-width: 90% !important;
      margin: 0 !important; /* Remove margins from section divs */
    }

    /* Text content width and readability adjustments */
    main p,
    main .text-md,
    main .text-sm,
    .employment-section p,
    .employment-section .text-md,
    .employment-section .text-sm,
    .employment-section ul li {
      width: 100% !important;
      max-width: 90% !important;
      text-align: justify !important;
      text-justify: inter-word !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      hyphens: auto !important;
    }

    /* Prevent any page breaks */
    * {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-before: avoid !important;
      page-break-after: avoid !important;
    }

    /* Ultra-compact spacing for single page */
    .print-compact {
      margin-bottom: 0.2rem !important;
    }

    .print-compact-small {
      margin-bottom: 0.3rem !important;
    }

    /* Minimal spacing for sections */
    .skills-section > li {
      margin-top: 0.2rem !important; /* Match cover letter spacing */
      margin-bottom: 0.2rem !important; /* Match cover letter spacing */
    }

    .employment-section > div > article {
      margin-bottom: 0 !important; /* Removed vertical margin between articles */
    }

    /* Article styling without vertical margins */
    article {
      margin-bottom: 0 !important; /* Removed vertical margin between articles */
      display: block !important; /* Ensure articles are visible */
      visibility: visible !important; /* Force visibility */
      opacity: 1 !important; /* Ensure not transparent */
      overflow: visible !important; /* Allow content to show */
    }

    article:last-child {
      margin-bottom: 0 !important; /* Keep no margin for last article */
    }

    /* Article content visibility and formatting */
    article * {
      visibility: visible !important; /* Ensure all content inside articles is visible */
      display: block !important; /* Make sure content has proper display */
      opacity: 1 !important; /* Ensure content is not transparent */
    }

    article p,
    article div,
    article span,
    article h1,
    article h2,
    article h3,
    article h4,
    article h5,
    article h6 {
      display: block !important;
      visibility: visible !important;
      font-size: inherit !important; /* Inherit readable font size */
      color: black !important; /* Ensure text is visible */
      margin-bottom: 0.2rem !important;
    }

    /* List items inside articles - vertical spacing and line height */
    article ul {
      display: block !important;
      visibility: visible !important;
      margin: 0.2rem 0 !important;
    }

    article ul > li {
      display: list-item !important;
      visibility: visible !important;
      margin-bottom: 0.25rem !important;
      line-height: 1.3 !important;
      font-size: inherit !important;
      color: black !important;
      list-style: disc !important; /* Ensure bullet points show */
      margin-left: 1rem !important; /* Indent for bullets */
    }

    /* Sidebar - minimal padding, exact browser alignment */
    aside {
      padding: 6px !important;
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      justify-content: flex-start !important; /* Exact browser alignment */
    }

    /* Minimal margins for sidebar headings - match cover letter */
    aside h4 {
      margin-top: 1rem !important; /* Increased from 0.3rem */
      margin-bottom: 0.25rem !important; /* Increased from 0.15rem */
      font-size: 0.6rem !important; /* Match cover letter font size */
    }

    aside h5 {
      margin-top: 0.25rem !important;
      margin-bottom: 0.1rem !important;
      font-size: 0.7rem !important;
    }

    aside p,
    aside div,
    aside ul {
      font-size: 0.6rem !important;
      margin: 0.1rem 0 !important;
    }

    /* Match cover letter sidebar list styling */
    aside .space-y-2 > * + *,
    aside .space-y-3 > * + *,
    aside ul li {
      font-size: 0.55rem !important; /* Match cover letter font size */
      margin-top: 0.2rem !important; /* Match cover letter margin */
      line-height: 1.2 !important;
    }

    /* Vertical margins between ul > div elements in sidebar */
    aside ul > div {
      margin-top: 0.75rem !important;
      margin-bottom: 0.75rem !important;
    }

    aside .text-md {
      line-height: 1.1 !important;
      margin: 0.1rem 0 !important;
      font-size: 0.6rem !important;
    }

    /* Section distribution for single page fit */
    main > section:last-child {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }

    .employment-section {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      overflow: visible !important; /* Changed from hidden to visible */
    }

    .employment-section > div {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.2rem !important; /* Increased gap for better spacing */
    }

    /* Employment section content visibility */
    .employment-section article {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    .employment-section article * {
      visibility: visible !important;
      opacity: 1 !important;
      color: black !important;
      font-size: 0.8rem !important; /* Readable font size */
    }

    .employment-section article h3,
    .employment-section article h4,
    .employment-section article h5 {
      font-weight: bold !important;
      display: block !important;
    }

    .employment-section article p {
      line-height: 1.4 !important;
      display: block !important;
    }

    /* Increased header sizes for better prominence - reduced margins */
    h1 {
      font-size: 1.5rem !important; /* Increased from 1.2rem */
      margin: 0 0 0.2rem 0 !important; /* Reduced from 0.4rem */
    }

    h2 {
      font-size: 1.1rem !important; /* Increased from 0.9rem */
      margin: 0.1rem 0 0.1rem 0 !important; /* Reduced from 0.3rem and 0.2rem */
    }

    h3 {
      font-size: 1rem !important; /* Increased from 0.8rem */
      margin: 0.1rem 0 0.05rem 0 !important; /* Reduced from 0.2rem and 0.15rem */
    }

    h4 {
      font-size: 0.85rem !important; /* Increased from 0.7rem */
      margin: 0.05rem 0 0.05rem 0 !important; /* Reduced from 0.15rem and 0.1rem */
    }

    h5 {
      font-size: 0.75rem !important; /* Increased from 0.65rem */
      margin: 0.05rem 0 !important; /* Reduced from 0.1rem */
    }

    /* Ultra-compact text sizes - match cover letter styling */
    .text-md {
      font-size: 0.8rem !important; /* Match cover letter */
      line-height: 1.1rem !important;
      margin: 0.05rem 0 !important;
    }

    /* Skills and Languages list items - match cover letter styling exactly */
    .skills-section li,
    .skills-section li span,
    .skills-section li .text-md,
    aside ul li,
    aside ul li span {
      font-size: 0.55rem !important; /* Match cover letter exact size */
      line-height: 1.2 !important; /* Match cover letter line height */
      margin-top: 0.2rem !important; /* Match cover letter margins */
      margin-bottom: 0.1rem !important;
    }

    /* Text elements in Skills/Languages cards */
    .skills-section li .text-sm,
    aside ul li .text-sm {
      font-size: 0.5rem !important;
    }

    .skills-section li .text-xs,
    aside ul li .text-xs {
      font-size: 0.45rem !important;
    }

    /* Smaller profile image for single page */
    .size-30 {
      width: 4rem !important;
      height: 4rem !important;
    }

    /* Minimal card styling for single page - complete card styling */
    .rounded-lg {
      border-radius: 0.2rem !important;
    }

    .bg-white {
      background-color: white !important; /* Keep white background for card effect */
    }

    .shadow-sm {
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important; /* Keep subtle shadow for card effect */
    }

    .p-3 {
      padding: 0.3rem !important;
    }

    /* Force single page */
    html {
      height: 100vh !important;
      max-height: 100vh !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }`;
}

function getBaseUrl(request: NextRequest): string {
  // Get the base URL from the request
  const protocol =
    request.headers.get("x-forwarded-proto") ||
    request.headers.get("x-forwarded-protocol") ||
    (request.url.startsWith("https") ? "https" : "http") ||
    "https";
  const host = request.headers.get("host");
  return `${protocol}://${host}`;
}

export async function GET(request: NextRequest, context: { params: Promise<{ locale: string }> }) {
  let browser: Awaited<ReturnType<typeof launchBrowser>> | undefined;

  try {
    const baseUrl = getBaseUrl(request);
    const { locale } = await context.params;
    apiLogger.info("Starting PDF generation", { url: `${baseUrl}/${locale}/resume` });

    try {
      apiLogger.debug("About to launch browser");
      browser = await launchBrowser();
      apiLogger.info("Browser launched successfully");
    } catch (browserError) {
      apiLogger.error("Browser launch failed");
      return NextResponse.json(
        {
          error: "Browser launch failed",
          details: browserError instanceof Error ? browserError.message : String(browserError),
        },
        { status: 500 }
      );
    }

    try {
      const pdf = await generateResumePDF(baseUrl, locale, browser);

      apiLogger.info("PDF generated successfully", { size: pdf.length });

      // Return PDF as response
      return new NextResponse(Buffer.from(pdf), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=resume.pdf",
          "Content-Length": pdf.length.toString(),
        },
      });
    } catch (pageError) {
      apiLogger.error("Page navigation/PDF generation failed");
      return NextResponse.json(
        {
          error: "Page navigation failed",
          details: pageError instanceof Error ? pageError.message : String(pageError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    apiLogger.error("PDF generation error");

    const errorStack =
      process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        error: "PDF generation failed",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        stack: errorStack,
      },
      { status: 500 }
    );
  } finally {
    // Ensure browser is closed even if there's an error
    if (browser) {
      try {
        await browser.close();
        apiLogger.debug("Browser closed successfully");
      } catch {
        apiLogger.error("Failed to close browser");
      }
    }
  }
}
