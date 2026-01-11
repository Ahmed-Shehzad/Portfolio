#!/usr/bin/env node

/**
 * URL Consistency Checker
 * Verifies all URLs in the project point to the correct production domain
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { extname, join } from "path";

const PRODUCTION_URL = "https://portfolio-azure-five-75.vercel.app";
const OLD_URLS = [
  "https://portfolio-5oeakh648-muhammad-ahmed-shehzads-projects.vercel.app",
  "https://your-vercel-domain.vercel.app",
  "https://your-domain.vercel.app",
];

const EXTENSIONS_TO_CHECK = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".xml",
  ".txt",
  ".md",
  ".yml",
  ".yaml",
];

function log(message = "") {
  process.stdout.write(`${message}\n`);
}

function getAllFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, .next, etc.
      if (!["node_modules", ".git", ".next", "dist", "build", "coverage"].includes(item)) {
        getAllFiles(fullPath, files);
      }
    } else if (EXTENSIONS_TO_CHECK.includes(extname(item))) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const issues = [];

    for (const oldUrl of OLD_URLS) {
      if (content.includes(oldUrl)) {
        const lines = content.split("\n");
        lines.forEach((line, index) => {
          if (line.includes(oldUrl)) {
            issues.push({
              file: filePath,
              line: index + 1,
              oldUrl,
              lineContent: line.trim(),
            });
          }
        });
      }
    }

    return issues;
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    return [];
  }
}

function main() {
  log("🔍 Checking URL consistency...");
  log(`✅ Production URL: ${PRODUCTION_URL}`);
  log(`❌ Old URLs to find: ${OLD_URLS.join(", ")}`);
  log("");

  const files = getAllFiles(process.cwd());
  const allIssues = [];

  for (const file of files) {
    const issues = checkFile(file);
    allIssues.push(...issues);
  }

  if (allIssues.length === 0) {
    log("✅ All URLs are consistent! No old URLs found.");
    log("🚀 Your site is ready for Google Safe Browsing review.");
  } else {
    log(`❌ Found ${allIssues.length} URL inconsistencies:`);
    log("");

    for (const issue of allIssues) {
      log(`📁 File: ${issue.file}`);
      log(`📍 Line ${issue.line}: ${issue.lineContent}`);
      log(`🔗 Found: ${issue.oldUrl}`);
      log(`🔧 Should be: ${PRODUCTION_URL}`);
      log("");
    }

    log("🚨 Please fix these URLs before deploying and submitting for Safe Browsing review!");
    process.exit(1);
  }
}

main();
