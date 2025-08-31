import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  try {
    // Get the base URL from the request
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    // Launch browser with optimized settings for serverless
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
    });

    const page = await browser.newPage();

    // Set viewport for A4 paper size
    await page.setViewport({
      width: 1000,
      height: 1414, // A4 aspect ratio
      deviceScaleFactor: 2,
    });

    // Navigate to the resume page
    const resumeUrl = `${baseUrl}/resume`;
    await page.goto(resumeUrl, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    // Wait for images and content to load
    await page
      .waitForSelector('[data-testid="profile-image"], img', { timeout: 10000 })
      .catch(() => {
        // Continue if image doesn't load
      });

    // Additional wait for any dynamic content
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

    // Generate PDF with A4 settings optimized for single page
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      scale: 0.8, // Reduce scale to fit more content
    });

    await browser.close();

    // Return PDF with appropriate headers
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
