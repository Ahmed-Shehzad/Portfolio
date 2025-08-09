import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    reporters: process.env.CI
      ? ["default", ["junit", { outputFile: "coverage/sonar-report.xml" }]]
      : ["default"],
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "out/**",
        "public/**",
        ".next/**",
        "next.config.ts",
        "postcss.config.mjs",
        "tailwind.config.ts",
        "**/index.ts",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
