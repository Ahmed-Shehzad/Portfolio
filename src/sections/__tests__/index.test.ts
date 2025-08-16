import { describe, it, expect } from "vitest";
import * as SectionExports from "../index";

describe("Sections index", () => {
  it("exports all section components", () => {
    expect(SectionExports.AboutSection).toBeDefined();
    expect(SectionExports.ContactSection).toBeDefined();
    expect(SectionExports.FooterSection).toBeDefined();
    expect(SectionExports.HeaderSection).toBeDefined();
    expect(SectionExports.HeroSection).toBeDefined();
    expect(SectionExports.ProjectsSection).toBeDefined();
    expect(SectionExports.TapeSection).toBeDefined();
    expect(SectionExports.TestimonialsSection).toBeDefined();
  });

  it("exports are functions/components", () => {
    // React.memo returns objects, not functions
    expect(typeof SectionExports.AboutSection).toBe("object");
    expect(typeof SectionExports.ContactSection).toBe("function");
    expect(typeof SectionExports.FooterSection).toBe("function");
    expect(typeof SectionExports.HeaderSection).toBe("function");
    expect(typeof SectionExports.HeroSection).toBe("object");
    expect(typeof SectionExports.ProjectsSection).toBe("function");
    expect(typeof SectionExports.TapeSection).toBe("function");
    expect(typeof SectionExports.TestimonialsSection).toBe("object");
  });
});
