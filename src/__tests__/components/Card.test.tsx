import { render, screen } from "@testing-library/react";
import { Card } from "@/components";

describe("Card Component", () => {
  it("should render children correctly", () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should apply additional className when provided", () => {
    const { container } = render(
      <Card className="test-class">
        <div>Test content</div>
      </Card>
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("test-class");
  });

  it("should have default card styling", () => {
    const { container } = render(
      <Card>
        <div>Test content</div>
      </Card>
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.tagName.toLowerCase()).toBe("div");
  });
});
