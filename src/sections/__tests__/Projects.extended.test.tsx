import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { ProjectsSection } from "../Projects";

// Mock the portfolio hook to return data
vi.mock("@/features/portfolio/hooks", () => ({
  usePortfolioProjects: () => ({
    data: [
      {
        title: "Test Project",
        company: "Test Company",
        year: "2024",
        image: "/test.jpg",
        imageWidth: 800,
        imageHeight: 600,
        link: "https://example.com",
        results: [{ title: "Result 1" }],
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe("Projects Extended Coverage", () => {
  it("renders project data when available", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("displays project results", () => {
    render(<ProjectsSection />);
    const results = screen.getAllByText("Result 1");
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it("shows project links", () => {
    render(<ProjectsSection />);
    const links = screen.getAllByRole("link");
    const projectLink = links.find((link) => link.getAttribute("href") === "https://example.com");
    expect(projectLink).toBeInTheDocument();
  });
});
