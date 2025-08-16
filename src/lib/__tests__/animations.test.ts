import { describe, it, expect } from "vitest";
import { scrollAnimationVariants, type AnimationVariantName } from "../animations";

describe("animations", () => {
  describe("scrollAnimationVariants", () => {
    it("has all expected animation variants", () => {
      const expectedVariants = [
        "fadeIn",
        "fadeInUp",
        "fadeInDown",
        "fadeInLeft",
        "fadeInRight",
        "scaleIn",
        "slideUp",
      ];

      expectedVariants.forEach((variant) => {
        expect(scrollAnimationVariants).toHaveProperty(variant);
      });
    });

    it("has correct structure for each variant", () => {
      Object.values(scrollAnimationVariants).forEach((variant) => {
        expect(variant).toHaveProperty("initial");
        expect(variant).toHaveProperty("animate");
        expect(variant).toHaveProperty("transition");
        expect(typeof variant.initial).toBe("object");
        expect(typeof variant.animate).toBe("object");
        expect(typeof variant.transition).toBe("object");
      });
    });

    it("fadeIn variant has correct properties", () => {
      const fadeIn = scrollAnimationVariants.fadeIn;
      expect(fadeIn.initial).toEqual({ opacity: 0 });
      expect(fadeIn.animate).toEqual({ opacity: 1 });
      expect(fadeIn.transition.duration).toBe(0.6);
      expect(fadeIn.transition.ease).toBe("easeOut");
    });

    it("fadeInUp variant has correct properties", () => {
      const fadeInUp = scrollAnimationVariants.fadeInUp;
      expect(fadeInUp.initial).toEqual({ opacity: 0, y: 20 });
      expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0 });
    });

    it("scaleIn variant has correct properties", () => {
      const scaleIn = scrollAnimationVariants.scaleIn;
      expect(scaleIn.initial).toEqual({ opacity: 0, scale: 0.8 });
      expect(scaleIn.animate).toEqual({ opacity: 1, scale: 1 });
    });

    it("all variants have consistent transition duration", () => {
      const durations = Object.values(scrollAnimationVariants).map((v) => v.transition.duration);
      const uniqueDurations = [...new Set(durations)];
      expect(uniqueDurations.length).toBeLessThanOrEqual(2); // Allow for some variation
    });

    it("type exports work correctly", () => {
      const testVariant: AnimationVariantName = "fadeIn";
      expect(typeof testVariant).toBe("string");
      expect(scrollAnimationVariants[testVariant]).toBeDefined();
    });
  });
});
