import { secureLog } from "./logging";

/**
 * Sanitize image source to prevent XSS attacks
 * @param src - The image source URL to sanitize
 * @returns Sanitized URL string or null if invalid/unsafe
 */
export function sanitizeImageSrc(src: string): string | null {
  try {
    // Check if it's a valid URL or data URL
    if (src.startsWith("data:image/")) {
      // Allow data URLs for images only
      return src;
    }

    // For other URLs, ensure they're valid and safe
    const url = new URL(
      src,
      typeof window !== "undefined" ? window.location.origin : "http://localhost"
    );

    // Only allow http, https protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      secureLog.warn("Invalid protocol in image source:", url.protocol);
      return null;
    }

    return url.href;
  } catch {
    secureLog.warn("Invalid image source provided:", src);
    return null;
  }
}

/**
 * Escape HTML attributes to prevent injection attacks
 * @param str - String to escape
 * @returns Escaped string safe for HTML attributes
 */
export function escapeHtmlAttribute(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
