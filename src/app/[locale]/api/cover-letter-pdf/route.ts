import { NextRequest, NextResponse } from "next/server";

// Interface for cover letter form data
interface CoverLetterFormData {
  specificReason: string;
  salaryExpectations: string;
  expectedJoiningDate: string;
  companyName: string;
  positionName: string;
}

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
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;

  console.error(`Running on Vercel: ${isVercel}`);
  console.error(`NODE_ENV: ${process.env.NODE_ENV}`);

  if (isVercel) {
    // Production on Vercel: Use @sparticuz/chromium with puppeteer-core
    console.error("Using @sparticuz/chromium for Vercel deployment");

    const chromium = await import("@sparticuz/chromium");
    const puppeteerCore = await import("puppeteer-core");

    const execPath = await chromium.default.executablePath();
    console.error(`Chromium executable path: ${execPath}`);

    return await puppeteerCore.default.launch({
      args: [...chromium.default.args, ...CHROME_ARGS],
      executablePath: execPath,
      headless: true,
    });
  } else {
    // Local development: Use regular puppeteer
    console.error("Using regular puppeteer for local development");

    const puppeteer = await import("puppeteer");

    return await puppeteer.default.launch({
      headless: true,
      args: CHROME_ARGS,
    });
  }
}

async function generateCoverLetterPDF(
  coverLetterUrl: string,
  formData: CoverLetterFormData,
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

  console.error(`Navigating to: ${coverLetterUrl}`);

  // Navigate with timeout and wait for network idle
  await page.goto(coverLetterUrl, {
    waitUntil: ["networkidle0", "domcontentloaded"],
    timeout: 60000,
  });

  console.error("Page loaded, waiting for content...");

  // Wait for the main content to load
  await page.waitForSelector("main", { timeout: 30000 });

  // Wait for images and content to load
  await page.waitForSelector('[data-testid="profile-image"], img', { timeout: 10000 }).catch(() => {
    // Continue if image doesn't load
  });

  // Wait a bit more for any lazy-loaded content
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.error("Content loaded, injecting form data...");

  // Inject form data directly into the page using JavaScript
  const formDataString = JSON.stringify(formData);
  const injectionScript = `
    (function() {
      const data = ${formDataString};

      // Set form data in localStorage for React components to read
      window.localStorage.setItem("coverLetterPDFData", JSON.stringify(data));

      // Trigger a custom event to notify React components
      window.dispatchEvent(
        new CustomEvent("coverLetterDataReady", {
          detail: data,
        })
      );
    })();
  `;

  await page.addScriptTag({
    content: injectionScript,
  });

  // Wait a moment for React to process the data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.error("Form data injected, generating PDF...");

  // Add print styles to optimize cover letter for printing
  await page.addStyleTag({
    content: getCoverLetterPrintStyles(),
  });

  console.error("Print styles added, generating PDF...");

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
    preferCSSPageSize: true,
    scale: 0.9, // More aggressive scale to fit everything on one page
    pageRanges: "1", // Ensure only one page
  });

  await page.close();
  console.error("PDF generated successfully");

  return pdf;
}

function getCoverLetterPrintStyles(): string {
  return `
    /* Print styles for cover letter page - single page exact browser alignment */
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

      /* Cover letter container - single page constraint */
      .cover-letter-container {
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
      .cover-letter-grid {
        display: grid !important;
        grid-template-columns: 200px 1fr !important; /* Narrower sidebar for single page */
        gap: 8px !important; /* Minimal gap */
        width: 100% !important;
        max-width: 210mm !important; /* A4 width constraint */
        height: 100% !important;
        flex: 1 !important;
        overflow: hidden !important;
      }

      /* Main content width and text adjustment */
      main {
        padding: 6px !important;
        height: 100% !important;
        width: 100% !important;
        max-width: calc(210mm - 200px - 8px) !important; /* Remaining width after sidebar and gap */
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        justify-content: flex-start !important; /* Exact browser alignment */
      }

      /* Main sections width control and content spacing */
      main > section {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important; /* Remove all vertical margins between sections */
        padding: 0 !important; /* Remove any padding that might create space */
      }

      main > section:last-child {
        margin: 0 !important; /* Remove all margins from last section */
      }

      /* Text content width and readability adjustments */
      main p,
      main .text-md,
      main .text-sm,
      .cover-letter-content p,
      .cover-letter-content .text-md,
      .cover-letter-content .text-sm,
      .cover-letter-content ul li {
        width: 100% !important;
        max-width: 100% !important;
        text-align: justify !important;
        text-justify: inter-word !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        hyphens: auto !important;
      }

      /* Adjusted font sizes for main content paragraphs (10% decrease) */
      main p,
      main .text-md,
      .cover-letter-content p,
      .cover-letter-content .text-md {
        font-size: 0.82rem !important; /* Decreased by 10% from 0.91rem */
        line-height: 1.4 !important; /* Maintained good line height */
      }

      main .text-sm,
      .cover-letter-content .text-sm {
        font-size: 0.77rem !important; /* Decreased by 10% from 0.85rem */
        line-height: 1.3 !important;
      }

      main .text-xs,
      .cover-letter-content .text-xs {
        font-size: 0.70rem !important; /* Decreased by 10% from 0.78rem */
        line-height: 1.2 !important;
      }

      main ul li,
      .cover-letter-content ul li {
        font-size: 0.82rem !important; /* Decreased by 10% from 0.91rem for list items */
        line-height: 1.3 !important;
      }

      /* Prevent any page breaks */
      * {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-before: avoid !important;
        page-break-after: avoid !important;
      }

      /* Cover letter content positioning */
      .cover-letter-content {
        overflow: hidden !important;
        height: 100% !important;
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

      /* Minimal spacing in sidebar sections */
      aside h4 {
        margin-top: 0.5rem !important; /* Increased from 0.3rem */
        margin-bottom: 0.25rem !important; /* Increased from 0.15rem */
        font-size: 0.6rem !important;
      }

      aside .space-y-2 > * + *,
      aside .space-y-3 > * + * {
        margin-top: 0.2rem !important;
        font-size: 0.55rem !important;
      }

      /* Vertical margins between ul > div elements in sidebar */
      aside ul > div {
        margin-bottom: 0.3rem !important;
      }

      aside ul > div:last-child {
        margin-bottom: 0 !important; /* Remove margin from last div */
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
        color: black !important; /* Ensure text is visible */
        font-size: 0.8rem !important; /* Readable font size */
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
        margin-bottom: 0.15rem !important;
        line-height: 1.3 !important;
        list-style: disc !important; /* Ensure bullet points show */
        margin-left: 1rem !important; /* Indent for bullets */
      }

      article ul > li:last-child {
        margin-bottom: 0 !important; /* Remove margin from last list item */
      }

      /* Cover letter content distribution */
      .cover-letter-content {
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }

      .cover-letter-content .space-y-4 > * + * {
        margin-top: 0.4rem !important;
      }

      /* Increased header sizes for better prominence - reduced margins */
      h1 {
        font-size: 1.4rem !important; /* Increased from 1.1rem */
        margin-bottom: 0.2rem !important; /* Reduced from 0.3rem */
      }

      h2 {
        font-size: 1.1rem !important; /* Added h2 styling */
        margin-top: 0.1rem !important; /* Reduced from 0.3rem */
        margin-bottom: 0.1rem !important; /* Reduced from 0.2rem */
      }

      h3 {
        font-size: 1rem !important; /* Increased from 0.8rem */
        margin-bottom: 0.1rem !important; /* Reduced from 0.2rem */
      }

      h4 {
        font-size: 0.85rem !important; /* Added h4 styling */
        margin-top: 0.05rem !important; /* Reduced from 0.2rem */
        margin-bottom: 0.05rem !important; /* Reduced from 0.15rem */
      }

      /* Ultra-compact text sizes - sidebar only */
      aside .text-md,
      footer .text-md {
        font-size: 0.6rem !important;
        line-height: 1.1 !important;
      }

      aside .text-sm,
      footer .text-sm {
        font-size: 0.55rem !important;
      }

      aside .text-xs,
      footer .text-xs {
        font-size: 0.5rem !important;
      }

      /* Footer minimal spacing */
      footer {
        margin-top: auto !important;
        padding-top: 0.15rem !important;
      }

      /* Minimal card styling for single page */
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
      * {
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }

      html {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `;
}

function getBaseUrl(request: NextRequest): string {
  const protocol =
    request.headers.get("x-forwarded-proto") ||
    request.headers.get("x-forwarded-protocol") ||
    (request.url.startsWith("https") ? "https" : "http") ||
    "https";
  const host = request.headers.get("host");
  return `${protocol}://${host}`;
}

// Helper function to parse request body and extract form data
async function parseFormData(request: NextRequest): Promise<CoverLetterFormData> {
  const defaultFormData: CoverLetterFormData = {
    specificReason: "",
    salaryExpectations: "",
    expectedJoiningDate: "",
    companyName: "",
    positionName: "Software Engineer", // Default value
  };

  try {
    const body = await request.json();
    return {
      specificReason: body.specificReason || "",
      salaryExpectations: body.salaryExpectations || "",
      expectedJoiningDate: body.expectedJoiningDate || "",
      companyName: body.companyName || "",
      positionName: body.positionName || "Software Engineer", // Default value
    };
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return defaultFormData;
  }
}

// Helper function to create error responses
function createErrorResponse(error: string, details: string, status: number = 500) {
  return NextResponse.json({ error, details }, { status });
}

// Helper function to create PDF response
function createPDFResponse(pdf: Uint8Array) {
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=cover-letter.pdf",
      "Content-Length": pdf.length.toString(),
    },
  });
}

// Helper function to safely close browser
async function closeBrowserSafely(browser: Awaited<ReturnType<typeof launchBrowser>> | undefined) {
  if (browser) {
    try {
      await browser.close();
      console.error("Browser closed successfully");
    } catch (closeError) {
      console.error("Failed to close browser:", closeError);
    }
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ locale: string }> }) {
  let browser: Awaited<ReturnType<typeof launchBrowser>> | undefined;

  try {
    const baseUrl = getBaseUrl(request);
    const { locale } = await context.params;
    const formData = await parseFormData(request);
    const coverLetterUrl = new URL(`/${locale}/cover-letter`, baseUrl);

    console.error(`Generating PDF for: ${coverLetterUrl.toString()}`);
    console.error(`Form data:`, formData);

    // Launch browser
    try {
      console.error("About to launch browser...");
      browser = await launchBrowser();
      console.error("Browser launched successfully");
    } catch (browserError) {
      const details = browserError instanceof Error ? browserError.message : String(browserError);
      return createErrorResponse("Browser launch failed", details);
    }

    // Generate PDF
    try {
      const pdf = await generateCoverLetterPDF(coverLetterUrl.toString(), formData, browser);
      return createPDFResponse(pdf);
    } catch (pageError) {
      const details = pageError instanceof Error ? pageError.message : String(pageError);
      return createErrorResponse("Page navigation failed", details);
    }
  } catch (error) {
    console.error("PDF generation error:", error);
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
    await closeBrowserSafely(browser);
  }
}
