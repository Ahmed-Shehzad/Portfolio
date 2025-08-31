// Test file to verify image imports work correctly
// This can be run locally to ensure all image imports resolve properly

import { describe, it, expect } from "vitest";

// Import all the problematic images to test type resolution
describe("Image Import Type Resolution", () => {
  it("should import images with @/ alias path correctly", async () => {
    // These are the specific imports that were failing in CI
    const { default: meImage } = await import("@/assets/images/me.jpg");
    const { default: grainImage } = await import("@/assets/images/grain.jpg");
    const { default: memojiSmile } = await import("@/assets/images/memoji-smile.png");
    const { default: bookCover } = await import("@/assets/images/book-cover.png");
    const { default: extraleicht } = await import("@/assets/images/extraleicht.png");
    const { default: sustayn } = await import("@/assets/images/sustayn.png");
    const { default: verbund } = await import("@/assets/images/verbund-pflegehilfe.png");
    const { default: scores365 } = await import("@/assets/images/365-scores.png");

    // All imports should return StaticImageData objects
    expect(meImage).toBeDefined();
    expect(grainImage).toBeDefined();
    expect(memojiSmile).toBeDefined();
    expect(bookCover).toBeDefined();
    expect(extraleicht).toBeDefined();
    expect(sustayn).toBeDefined();
    expect(verbund).toBeDefined();
    expect(scores365).toBeDefined();

    // In test environment, these return string paths instead of StaticImageData objects
    expect(typeof meImage).toBe("string");
    expect(typeof grainImage).toBe("string");
    expect(typeof memojiSmile).toBe("string");

    // Verify they point to the expected paths
    expect(meImage).toContain("me.jpg");
    expect(grainImage).toContain("grain.jpg");
    expect(memojiSmile).toContain("memoji-smile.png");
  });

  it("should import memoji avatar images correctly", async () => {
    const avatars = await Promise.all([
      import("@/assets/images/memoji-avatar-1.png"),
      import("@/assets/images/memoji-avatar-2.png"),
      import("@/assets/images/memoji-avatar-3.png"),
      import("@/assets/images/memoji-avatar-4.png"),
      import("@/assets/images/memoji-avatar-5.png"),
    ]);

    avatars.forEach((avatar, index) => {
      expect(avatar.default).toBeDefined();
      expect(typeof avatar.default).toBe("string");
      expect(avatar.default).toContain(`memoji-avatar-${index + 1}.png`);
    });
  });
});
