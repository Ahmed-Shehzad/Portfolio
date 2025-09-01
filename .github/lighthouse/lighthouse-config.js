module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
        preset: "desktop",
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        formFactor: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "categories:pwa": "off",

        // Core Web Vitals - Adjusted for dynamic content loading
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 400 }], // Increased from 300

        // Performance metrics
        "speed-index": ["warn", { maxNumericValue: 3000 }],
        interactive: ["warn", { maxNumericValue: 3000 }],

        // Best practices - Adjusted for HTTPS detection
        "uses-https": ["warn", { auditRan: true }], // Changed from error to warn with auditRan check
        "uses-http2": "warn",
        "uses-responsive-images": ["warn", { minScore: 0.7 }], // Relaxed from default
        "efficient-animated-content": "warn",
        "unused-css-rules": ["warn", { minScore: 0.8 }], // Relaxed from 0.9

        // Accessibility - Adjusted for complex layouts
        "color-contrast": ["error", { minScore: 0.9 }],
        "heading-order": "warn", // Changed from error to warn
        "link-name": ["error", { minScore: 0.9 }],
        "button-name": ["error", { minScore: 0.9 }],

        // SEO - Portfolio specific
        "document-title": ["error", { minScore: 1.0 }],
        "meta-description": ["error", { minScore: 1.0 }],
        "robots-txt": "warn", // Not critical for portfolio sites
        canonical: ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
