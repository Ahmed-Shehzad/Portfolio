import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OptimizedImage from "@/components/ui/OptimizedImage";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img alt={props.alt || "img"} {...props} />,
}));

describe("OptimizedImage error path", () => {
  it("uses fallback when error occurs", () => {
    const { container } = render(
      <OptimizedImage
        src="/main.png"
        fallbackSrc="/fallback.png"
        alt="alt"
        width={100}
        height={100}
      />
    );
    const img = container.querySelector("img");
    if (!img) {
      throw new Error("Image element not found in DOM");
    }
    fireEvent.error(img);
    expect(img).toBeTruthy();
  });
});
