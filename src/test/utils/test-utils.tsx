/**
 * Test Utilities
 *
 * Common testing utilities following bulletproof architecture.
 * These utilities help create consistent and maintainable tests.
 */

import { ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { vi } from "vitest";

// Custom render function that includes common providers
const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  // Add common providers here when needed (Theme, Router, etc.)
  // const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  //   return (
  //     <ThemeProvider>
  //       <ErrorBoundary>
  //         {children}
  //       </ErrorBoundary>
  //     </ThemeProvider>
  //   );
  // };

  return render(ui, {
    // wrapper: AllTheProviders,
    ...options,
  });
};

// Mock window methods that are commonly needed in tests
export const mockWindow = {
  /**
   * Mocks window.scrollTo for tests
   */
  scrollTo: () => {
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });
  },

  /**
   * Mocks window.IntersectionObserver for tests
   */
  intersectionObserver: () => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });

    Object.defineProperty(window, "IntersectionObserver", {
      value: mockIntersectionObserver,
      writable: true,
    });
  },

  /**
   * Mocks window.requestAnimationFrame for tests
   */
  requestAnimationFrame: () => {
    Object.defineProperty(window, "requestAnimationFrame", {
      value: vi.fn((cb: FrameRequestCallback) => setTimeout(cb, 0)),
      writable: true,
    });
  },
};

// Common test data factories
export const testData = {
  /**
   * Creates mock contact form data
   */
  contactForm: (overrides = {}) => ({
    name: "John Doe",
    email: "john@example.com",
    subject: "Test Subject",
    message: "This is a test message",
    ...overrides,
  }),

  /**
   * Creates mock portfolio project data
   */
  portfolioProject: (overrides = {}) => ({
    company: "Test Company",
    year: "2024",
    title: "Test Project",
    results: [{ title: "Test Result" }],
    link: "https://example.com",
    image: { src: "/test-image.jpg", height: 500, width: 800 },
    imageWidth: 800,
    imageHeight: 500,
    ...overrides,
  }),
};

// Re-export everything from testing-library with our custom render
export * from "@testing-library/react";
export { customRender as render };
