import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "@/sections/Header";

// Helper to define a property
function define(obj: any, key: string, value: any) {
  Object.defineProperty(obj, key, { value, configurable: true, writable: true });
}

const makeSection = (id: string, offsetTop: number) => {
  const el = document.createElement("div");
  el.id = id;
  define(el, "offsetTop", offsetTop);
  document.body.appendChild(el);
  return el;
};

describe("Header navigation", () => {
  it("renders all nav links", () => {
    render(<Header />);
    ["Home", "Projects", "About", "Contact"].forEach((text) => {
      expect(screen.getByRole("link", { name: new RegExp(text, "i") })).toBeTruthy();
    });
  });
});
