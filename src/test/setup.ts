import "@testing-library/jest-dom/vitest";
import React from "react";
import { beforeAll, vi } from "vitest";

// Make React available globally
global.React = React;

// Mock SVG imports with better data URL handling
vi.mock("*.svg", () => {
  const MockSvg = React.forwardRef<SVGSVGElement>((props, ref) => {
    // Filter out problematic props that might cause JSDOM issues
    const { ...safeProps } = props as Record<string, unknown>;
    return React.createElement("svg", {
      ...safeProps,
      ref,
      "data-testid": "mock-svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
    });
  });
  MockSvg.displayName = "MockSVG";
  return { default: MockSvg };
});

// Mock specific SVG files that are causing issues
vi.mock("@/assets/icons/check-circle.svg", () => {
  const MockCheckCircle = React.forwardRef<SVGSVGElement>((props, ref) => {
    return React.createElement("svg", {
      ...props,
      ref,
      "data-testid": "check-circle-icon",
      width: "24",
      height: "24",
    });
  });
  MockCheckCircle.displayName = "CheckCircleIcon";
  return { default: MockCheckCircle };
});

vi.mock("@/assets/icons/sparkle.svg", () => {
  const MockSparkle = React.forwardRef<SVGSVGElement>((props, ref) => {
    return React.createElement("svg", {
      ...props,
      ref,
      "data-testid": "sparkle-icon",
      width: "24",
      height: "24",
    });
  });
  MockSparkle.displayName = "SparkleIcon";
  return { default: MockSparkle };
});

// Mock arrow-up-right icon specifically
vi.mock("@/assets/icons/arrow-up-right.svg", () => {
  const MockArrowUpRight = React.forwardRef<SVGSVGElement>((props, ref) => {
    return React.createElement("svg", {
      ...props,
      ref,
      "data-testid": "arrow-up-right-icon",
      width: "24",
      height: "24",
    });
  });
  MockArrowUpRight.displayName = "ArrowUpRightIcon";
  return { default: MockArrowUpRight };
});

// Mock image imports
vi.mock("*.png", () => ({ default: "/mock-image.png" }));
vi.mock("*.jpg", () => ({ default: "/mock-image.jpg" }));
vi.mock("*.jpeg", () => ({ default: "/mock-image.jpeg" }));
vi.mock("*.webp", () => ({ default: "/mock-image.webp" }));
vi.mock("*.avif", () => ({ default: "/mock-image.avif" }));

// Mock specific image imports
vi.mock("@/assets/images/book-cover.png", () => ({ default: "/mock-book-cover.png" }));
vi.mock("@/assets/images/memoji-smile.png", () => ({ default: "/mock-memoji-smile.png" }));

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js dynamic imports
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: (
    importFn: () => Promise<unknown>,
    options?: { loading?: () => React.ReactElement; ssr?: boolean }
  ) => {
    const Component = vi.fn().mockImplementation(() => {
      if (options?.loading) {
        return options.loading();
      }
      return React.createElement(
        "div",
        { "data-testid": "mocked-dynamic-component" },
        "Mocked Dynamic Component"
      );
    }) as React.ComponentType & {
      displayName?: string;
    };
    Component.displayName = "MockedDynamicComponent";
    return Component;
  },
}));

// Mock Web Worker
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  terminate: vi.fn(),
  onmessage: null,
  onerror: null,
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock components that use SVG data URLs
vi.mock("@/components/ui/TechIcon", () => ({
  TechIcon: ({ component: Component, alt }: { component?: React.ComponentType; alt: string }) => {
    if (Component) {
      return React.createElement(
        "svg",
        {
          "data-testid": "tech-icon",
          "aria-label": alt,
        },
        React.createElement(
          "defs",
          {},
          React.createElement("linearGradient", { id: "tech-icon-gradient" })
        ),
        React.createElement(Component)
      );
    }
    return React.createElement("div", { "data-testid": "tech-icon", "aria-label": alt });
  },
}));

vi.mock("@/components/features/ToolboxItems", () => ({
  ToolboxItems: ({
    className,
    itemsWrapperClassName,
    items,
  }: {
    className?: string;
    itemsWrapperClassName?: string;
    items?: Array<{ title: string }>;
  }) =>
    React.createElement(
      "div",
      {
        className: `flex ${className || ""}`,
        "data-testid": "toolbox-items",
      },
      React.createElement(
        "div",
        {
          className: `flex flex-none gap-6 py-0.5 pr-6 ${itemsWrapperClassName || "wrapper-class"}`,
        },
        Array.from({ length: 3 }, (_, sectionIndex) =>
          items?.map((item, _i) =>
            React.createElement(
              "div",
              {
                key: `${item.title}-${sectionIndex}`,
                "data-testid": "tech-icon",
                "aria-label": item.title,
              },
              item.title
            )
          )
        )
      )
    ),
}));

vi.mock("@/components/features/DynamicMap", () => ({
  DynamicMap: () =>
    React.createElement(
      "div",
      {
        className: "h-full w-full",
        "data-testid": "dynamic-map",
      },
      "Map"
    ),
}));

vi.mock("@/components/features/about/CoreValues", () => ({
  CoreValues: () =>
    React.createElement(
      "div",
      { "data-testid": "core-values" },
      React.createElement("h3", {}, "Core Values"),
      React.createElement("div", {}, "Quality First"),
      React.createElement("div", {}, "Innovation")
    ),
}));

vi.mock("@/components/features/about/ProfessionalGrowth", () => ({
  ProfessionalGrowth: () =>
    React.createElement("div", { "data-testid": "professional-growth" }, "Professional Growth"),
}));

// Mock TOOLBOX_ITEMS to avoid SVG data URL issues
vi.mock("@/shared/constants", async () => {
  const actual = await vi.importActual("@/shared/constants");
  return {
    ...actual,
    TOOLBOX_ITEMS: [
      {
        title: "React",
        iconType: () => React.createElement("div", { "data-testid": "react-icon" }),
      },
      {
        title: "TypeScript",
        iconType: () => React.createElement("div", { "data-testid": "typescript-icon" }),
      },
    ],
  };
});

beforeAll(() => {
  // Mock crypto.randomUUID with deterministic counter for tests
  let counter = 0;
  Object.defineProperty(global.crypto, "randomUUID", {
    value: () => `test-uuid-${(++counter).toString(36).padStart(9, "0")}`,
  });
});
