import { describe, it, expect, vi } from "vitest";
import { sanitizeImageSrc, escapeHtmlAttribute } from "../security";

vi.mock("./logging", () => ({
  secureLog: {
    warn: vi.fn(),
  },
}));

describe("security utilities", () => {
  describe("sanitizeImageSrc", () => {
    it("allows valid https URLs", () => {
      const result = sanitizeImageSrc("https://example.com/image.jpg");
      expect(result).toBe("https://example.com/image.jpg");
    });

    it("allows valid http URLs", () => {
      const result = sanitizeImageSrc("http://example.com/image.jpg");
      expect(result).toBe("http://example.com/image.jpg");
    });

    it("allows data URLs for images", () => {
      const dataUrl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      const result = sanitizeImageSrc(dataUrl);
      expect(result).toBe(dataUrl);
    });

    it("rejects javascript URLs", () => {
      // eslint-disable-next-line no-script-url
      const result = sanitizeImageSrc("javascript:alert('xss')");
      expect(result).toBeNull();
    });

    it("rejects file URLs", () => {
      const result = sanitizeImageSrc("file:///etc/passwd");
      expect(result).toBeNull();
    });

    it("handles invalid URLs", () => {
      const result = sanitizeImageSrc("not-a-url");
      // Relative URLs get resolved to localhost in test environment
      expect(result).toContain("not-a-url");
    });

    it("handles relative URLs", () => {
      const result = sanitizeImageSrc("/images/test.jpg");
      expect(result).toContain("/images/test.jpg");
    });

    it("rejects ftp URLs", () => {
      const result = sanitizeImageSrc("ftp://example.com/image.jpg");
      expect(result).toBeNull();
    });
  });

  describe("escapeHtmlAttribute", () => {
    it("escapes ampersands", () => {
      const result = escapeHtmlAttribute("Tom & Jerry");
      expect(result).toBe("Tom &amp; Jerry");
    });

    it("escapes less than signs", () => {
      const result = escapeHtmlAttribute("a < b");
      expect(result).toBe("a &lt; b");
    });

    it("escapes greater than signs", () => {
      const result = escapeHtmlAttribute("a > b");
      expect(result).toBe("a &gt; b");
    });

    it("escapes double quotes", () => {
      const result = escapeHtmlAttribute('Say "hello"');
      expect(result).toBe("Say &quot;hello&quot;");
    });

    it("escapes single quotes", () => {
      const result = escapeHtmlAttribute("Don't do this");
      expect(result).toBe("Don&#x27;t do this");
    });

    it("escapes multiple characters", () => {
      const result = escapeHtmlAttribute('<script>alert("xss")</script>');
      expect(result).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    });

    it("handles empty string", () => {
      const result = escapeHtmlAttribute("");
      expect(result).toBe("");
    });

    it("handles string without special characters", () => {
      const result = escapeHtmlAttribute("normal text");
      expect(result).toBe("normal text");
    });
  });
});
