/**
 * Components Barrel Export
 *
 * Following bulletproof architecture pattern for component organization.
 * Components are now separated into client and server directories for better clarity.
 */

// Client Components (Interactive, use browser APIs)
export * from "./client";

// Server Components (Static, server-side rendering)
export * from "./server";

// Legacy exports for backward compatibility
// UI Components (Generic, reusable) - now in client/ui
export * from "./client/ui";

// Shared Components (Cross-feature) - now in server/shared
export * from "./server/shared";

// Error Boundaries (Error handling) - now in client/boundaries
export * from "./client/boundaries";
