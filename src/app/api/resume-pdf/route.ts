import { NextRequest, NextResponse } from "next/server";

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
export async function GET(request: NextRequest) {
  try {
    // Get the base URL from the request
    const protocol =
      request.headers.get("x-forwarded-proto") ||
      request.headers.get("x-forwarded-protocol") ||
      (request.url.startsWith("https") ? "https" : "http") ||
      "https";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    console.error(`Generating PDF for: ${baseUrl}/resume`);

    let browser;
    try {
      console.error("About to launch browser...");
      browser = await launchBrowser();
      console.error("Browser launched successfully");
    } catch (browserError) {
      console.error("Browser launch failed:", browserError);
      return NextResponse.json(
        {
          error: "Browser launch failed",
          details: browserError instanceof Error ? browserError.message : String(browserError),
        },
        { status: 500 }
      );
    }
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

    try {
      console.error(`Navigating to: ${baseUrl}/resume`);

      // Navigate with timeout and wait for network idle
      await page.goto(`${baseUrl}/resume`, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 60000, // Increased timeout for slow serverless starts
      });

      console.error("Page loaded, waiting for content...");

      // Wait for the main content to load
      await page.waitForSelector("main", { timeout: 30000 });

      // Wait for images and content to load
      await page
        .waitForSelector('[data-testid="profile-image"], img', { timeout: 10000 })
        .catch(() => {
          // Continue if image doesn't load
        });

      // Wait a bit more for any lazy-loaded content
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.error("Content loaded, generating PDF...");

      // Add print styles to compress content to single page
      await page.addStyleTag({
        content: `
  /* Print styles for resume page */
  @media print {
    /* Reset page margins and ensure full page usage with minimal margins */
    @page {
      size: A4;
      margin: 0.25in;
    }

    /* Remove background and ensure proper body setup with full height usage */
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }

    /* Remove the outer container styling for print and use full width and height */
    .min-h-screen {
      min-height: 100vh !important;
      height: 100vh !important;
      padding: 0 !important;
      background: white !important;
      overflow: visible !important;
      width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 0 !important;
    }

    /* Hide download button in PDF */
    .min-h-screen > div:first-child {
      display: none !important;
    }

    /* Remove centering margins for full width usage */
    .min-h-screen > * {
      margin: 0 !important;
      width: 100% !important;
      flex: 1 !important;
    }

    /* Optimize the main resume container for full page usage */
    .resume-container {
      height: 100vh !important;
      max-height: 100vh !important;
      page-break-inside: avoid !important;
      transform: none !important;
      width: 100% !important;
      max-width: 100% !important;
      box-shadow: none !important;
      margin: 0 !important;
      border-radius: 0 !important;
      overflow: hidden !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Ensure proper grid layout uses full width and height with increased aside width */
    .resume-grid {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      display: grid !important;
      grid-template-columns: 300px 1fr !important;
      gap: 0 !important;
      width: 100% !important;
      height: 100% !important;
      flex: 1 !important;
    }

    /* Prevent page breaks inside important sections */
    .employment-section article,
    .skills-section,
    .education-section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Reduce spacing for print */
    .print-compact {
      margin-bottom: 1rem !important;
    }

    .print-compact-small {
      margin-bottom: 5rem !important;
    }

    /* Compact spacing for print with improved vertical margins */
    .skills-section > li {
      margin-top: 0.2rem !important;
      margin-bottom: 0.2rem !important;
    }

    .employment-section > div > article {
      margin-bottom: 0.5rem !important;
      flex-grow: 0 !important;
      flex-shrink: 0 !important;
    }

    /* Sidebar print optimizations - reduce padding for more content space and use full height */
    aside {
      padding: 1rem !important;
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }

    /* Add vertical margins for text elements in aside */
    aside h4 {
      margin-top: 1rem !important;
      font-size: 0.875rem !important; /* text-md equivalent */
    }

    aside h5 {
      margin-top: 0.75rem !important;
      font-size: 1rem !important; /* text-md equivalent */
    }

    aside p,
    aside div,
    aside ul {
      font-size: 0.875rem !important; /* text-md equivalent */
    }

    aside .space-y-2 > * + *,
    aside .space-y-3 > * + * {
      font-size: 0.75rem !important; /* text-md equivalent */
    }

    aside .text-md {
      line-height: 1rem !important; /* preserve original line-height */
      margin-top: 0.5rem !important;
    }

    /* Main content print optimizations - reduce padding for more content space and use full height */
    main {
      padding: 1rem !important;
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }

    /* Ensure the main content sections expand to fill available space */
    main > section:last-child {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
    }







    /* Employment section should take remaining space and distribute content */
    .employment-section {
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
    }

    /* Better spacing distribution for employment entries */
    .employment-section > div {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.5rem !important;
    }

    /* Further reduce header margins for space efficiency */
    h1 {
      font-size: 1.875rem !important; /* text-3xl equivalent */
    }






    h3 {
      font-size: 1.125rem !important; /* text-lg equivalent */
    }

    h4 {
      font-size: 1rem !important; /* text-base equivalent */
    }

    h5 {
      font-size: 0.875rem !important; /* text-md equivalent */
    }



    /* Preserve original Tailwind font sizes */
    .text-md {
      font-size: 1rem !important; /* 16px */
      line-height: 1.5rem !important; /* 24px */
    }

    /* Ensure consistent font sizes in skill items */
    .skills-section li {
      font-size: 0.875rem !important; /* text-md equivalent */
    }

    .skills-section li span {
      font-size: 0.875rem !important; /* text-md equivalent */
    }

    .skills-section li .text-md {
      font-size: 0.875rem !important; /* Override to match skill name */
    }

    /* Ensure consistent font sizes in language items */
    ul li {
      font-size: 0.875rem !important; /* text-md equivalent */
    }










    ul li span {
      font-size: 0.875rem !important; /* text-md equivalent */
    }

    /* Increase the profile image size for better visibility in print */
    .size-30 {
      width: 8rem !important;
      height: 8rem !important;
    }

    /* Ensure single page with full height usage - maximize available space */
    html {
      height: 100% !important;
      overflow: visible !important;
      margin: 0 !important;
      padding: 0 !important;












    }
  }
      `,
      });

      // Generate PDF
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "10mm",
          right: "10mm",
          bottom: "10mm",
          left: "10mm",
        },
        displayHeaderFooter: false,
        preferCSSPageSize: false,
        scale: 0.8, // Reduce scale to fit more content
      });

      await browser.close();

      console.error(`PDF generated successfully, size: ${pdf.length} bytes`);

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="resume.pdf"`,
          "Content-Length": pdf.length.toString(),
        },
      });
    } catch (pageError) {
      console.error("Page navigation/rendering error:", pageError);
      await browser.close();

      return NextResponse.json(
        {
          error: "Failed to load resume page",
          details: pageError instanceof Error ? pageError.message : String(pageError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("PDF generation failed:", error);

    return NextResponse.json(
      {
        error: "PDF generation failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
