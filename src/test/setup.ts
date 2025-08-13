// Vitest setup: ensure React is available globally when JSX isn't auto-injected (Next.js preserves JSX for SWC)
import React from "react";

interface GlobalWithReact {
  React: typeof React;
}

(globalThis as unknown as GlobalWithReact).React = React;
