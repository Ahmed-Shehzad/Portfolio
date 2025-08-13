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

const eslintConfig = [
  ...compat.config({
    extends: ["eslint:recommended", "next", "next/core-web-vitals", "next/typescript", "prettier"],
    ignorePatterns: ["public/worker.js"], // Exclude worker from strict linting
    rules: {
      // Bulletproof React ESLint rules (without TypeScript project-requiring rules)

      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "error", // Enforcing no any types
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",

      // React specific rules
      "react/jsx-key": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/self-closing-comp": "error",
      "react/jsx-pascal-case": "error",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Performance and best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",

      // Security rules
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",

      // Import/Export rules
      "import/no-default-export": "off", // Allow default exports for pages/components
      "import/prefer-default-export": "off",

      // Accessibility rules (basic ones that don't require complex setup)
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-role": "error",

      // Code style (handled by prettier, but some logical rules)
      "prefer-template": "error",

      // Error handling
      "no-throw-literal": "error",
    },
    // Override rules for specific file patterns
    overrides: [
      {
        files: ["src/app/**/*.tsx", "src/pages/**/*.tsx"],
        rules: {
          "import/no-default-export": "off", // Allow default exports for Next.js pages
        },
      },
      {
        files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off", // Allow any in tests
          "no-console": "off", // Allow console in tests
        },
      },
      {
        files: ["src/worker/**/*.ts", "public/worker.js"],
        rules: {
          "@typescript-eslint/prefer-nullish-coalescing": "off", // Allow || in worker files
          "no-console": "off", // Allow console in worker files
        },
      },
    ],
  }),
];

export default eslintConfig;
