import { dirname } from "path";
import js from "@eslint/js";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "coverage/**",
      "public/worker.js",
      "*.tsbuildinfo",
      "node_modules/**",
      "*.d.ts",
      "**/*.cjs", // Ignore CommonJS files
    ],
  },
  ...compat.extends("eslint:recommended", "next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Performance and best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "error",

      // Security rules
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },
];

export default config;
