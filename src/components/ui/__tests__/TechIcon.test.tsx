import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { TechIcon } from "@/components/ui/TechIcon";

const Dummy = (props: any) => <svg data-testid="dummy" {...props} />;

describe("TechIcon", () => {
  it("renders svg gradient and icon", () => {
    const { getByTestId, container } = render(<TechIcon component={Dummy} alt="icon" />);
    expect(getByTestId("dummy")).toBeTruthy();
    expect(container.querySelector("linearGradient#tech-icon-gradient")).toBeTruthy();
  });
});
