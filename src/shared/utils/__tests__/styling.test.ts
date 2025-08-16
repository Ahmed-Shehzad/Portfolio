import { describe, it, expect } from "vitest";
import { cn } from "../styling";

describe("styling utilities", () => {
  describe("cn", () => {
    it("merges multiple class strings", () => {
      const result = cn("class1", "class2", "class3");
      expect(result).toBe("class1 class2 class3");
    });

    it("filters out falsy values", () => {
      const result = cn("class1", null, undefined, false, "", "class2");
      expect(result).toBe("class1 class2");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn("base", isActive && "active", isDisabled && "disabled");
      expect(result).toBe("base active");
    });

    it("resolves Tailwind conflicts", () => {
      const result = cn("p-4", "p-2");
      expect(result).toBe("p-2");
    });

    it("handles empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("handles single class", () => {
      const result = cn("single-class");
      expect(result).toBe("single-class");
    });

    it("handles complex Tailwind conflicts", () => {
      const result = cn("bg-red-500", "bg-blue-500", "text-white");
      expect(result).toBe("bg-blue-500 text-white");
    });
  });
});
