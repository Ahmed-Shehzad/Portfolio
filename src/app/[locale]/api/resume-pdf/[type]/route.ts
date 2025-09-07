import { NextRequest, NextResponse } from "next/server";
import { getResumeConfig, isValidResumeType } from "@/features/resume";
import { logger } from "@/shared/utils";

/**
 * Sanitize filename by removing potentially dangerous characters
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9-_.]/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/-{2,}/g, "-") // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-/, "") // Remove leading hyphen
    .replace(/-$/, ""); // Remove trailing hyphen
}

/**
 * Determine protocol securely
 */
function getSecureProtocol(request: NextRequest): string {
  // In production (Vercel), trust x-forwarded-proto header
  if (process.env["VERCEL"] || process.env.NODE_ENV === "production") {
    const forwardedProto = request.headers.get("x-forwarded-proto");
    return forwardedProto === "https" ? "https" : "http"; // Use http as fallback, but prefer https
  }

  // In development, check if running on localhost with HTTPS
  const host = request.headers.get("host");
  if (host?.includes("localhost") || host?.includes("127.0.0.1")) {
    return "http"; // Local development typically uses http
  }

  // Default to https for all other cases
  return "https";
}

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
  if (process.env["VERCEL"]) {
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

    // Navigate to the resume page with increased timeout and less strict wait condition
    await page.goto(resumeUrl, {
      waitUntil: "domcontentloaded", // Less strict than networkidle0
      timeout: 60000, // Increased timeout to 60 seconds
    });

    apiLogger.debug("Page loaded successfully, waiting for content to settle");

    // Wait a bit more for any dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 3000));

    apiLogger.debug("Generating PDF...");

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

    // Get the base URL with secure protocol determination
    const protocol = getSecureProtocol(request);
    const host = request.headers.get("host");

    // Validate host header to prevent host header injection
    if (!host || !/^[a-zA-Z\d.-]+(?::\d+)?$/.test(host)) {
      apiLogger.warn(`Invalid or missing host header: ${host}`);
      return NextResponse.json({ error: "Invalid host header" }, { status: 400 });
    }

    const baseUrl = `${protocol}://${host}`;

    // Construct resume URL
    const resumeUrl = `${baseUrl}/${locale}/resume/${type}`;

    apiLogger.debug(`Resume URL: ${resumeUrl}`);

    // Launch browser
    browser = await launchBrowser();

    // Generate PDF
    const pdf = await generateSpecializedResumePDF(resumeUrl, browser);

    apiLogger.info(`Successfully generated ${type} resume PDF`);

    // Create sanitized filename
    const sanitizedType = sanitizeFilename(type);
    const sanitizedLocale = sanitizeFilename(locale);
    const filename = `muhammad-ahmed-shehzad-${sanitizedType}-resume-${sanitizedLocale}.pdf`;

    // Return PDF response
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
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
