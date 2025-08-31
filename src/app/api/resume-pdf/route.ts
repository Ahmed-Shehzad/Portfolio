import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

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

    // Configure chromium for Vercel
    const isProduction = process.env.NODE_ENV === "production";

    // Launch browser with Vercel-optimized settings
    const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
      headless: true,
      args: isProduction
        ? chromium.args
        : [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor",
          ],
    };

    if (isProduction) {
      launchOptions.executablePath = await chromium.executablePath();
    }

    const browser = await puppeteer.launch(launchOptions);
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

      // Wait a bit more for any lazy-loaded content
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.error("Content loaded, generating PDF...");

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
        preferCSSPageSize: true,
      });

      await browser.close();

      console.error(`PDF generated successfully, size: ${pdf.length} bytes`);

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Muhammad_Ahmed_Shehzad_Resume.pdf"`,
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
