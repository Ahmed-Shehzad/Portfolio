// Type declarations for @testing-library/jest-dom with Vitest compatibility

// Skip Jest types for Vitest compatibility - these will conflict
// Jest reference is handled by @types/jest in node_modules

// Extend Vitest expect with jest-dom matchers only
declare module "vitest" {
  interface Assertion<T = unknown> {
    toBeInTheDocument(): T;
    toHaveClass(className: string): T;
    toHaveAttribute(attr: string, value?: string): T;
    toBeVisible(): T;
    toHaveTextContent(text: string): T;
    toBeDisabled(): T;
    toBeEnabled(): T;
    toHaveValue(value: string | number): T;
  }
}

// Export empty to make this a module
export {};
