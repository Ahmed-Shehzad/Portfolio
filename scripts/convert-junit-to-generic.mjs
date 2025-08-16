#!/usr/bin/env node
/**
 * Convert Vitest JUnit XML into SonarQube Generic Test Execution format.
 * Usage: node scripts/convert-junit-to-generic.mjs <input-junit.xml> <output-generic.xml>
 */
import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath] = process.argv;

function fail(msg) {
  const sanitized = String(msg)
    .replace(/[\r\n\t]/g, " ")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return !(code <= 31 || (code >= 127 && code <= 159));
    })
    .join("");
  console.error(`convert-junit-to-generic: ${sanitized}`);
  process.exit(1);
}

if (!inputPath || !outputPath) {
  fail(
    "Missing arguments. Usage: node scripts/convert-junit-to-generic.mjs <input-junit.xml> <output-generic.xml>"
  );
}

if (!fs.existsSync(inputPath)) {
  fail(`Input file not found: ${inputPath}`);
}

const raw = fs.readFileSync(inputPath, "utf8");

if (!raw.includes("<testsuite") || !raw.includes("<testcase")) {
  fail("Input does not look like a JUnit XML report.");
}

const suiteRegex = /<testsuite\s+name="([^"]+)"[\s\S]*?<\/testsuite>/g;
const testCaseRegex =
  /<testcase[^>]*name="([^"]+)"[^>]*time="([0-9.]+)"[^>]*>[\s\S]*?<\/testcase>/g;

function decodeEntities(str) {
  return str
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

const files = new Map();

let suiteMatch;
while ((suiteMatch = suiteRegex.exec(raw)) !== null) {
  const filePath = suiteMatch[1];
  const suiteBlock = suiteMatch[0];
  let tcMatch;
  while ((tcMatch = testCaseRegex.exec(suiteBlock)) !== null) {
    const testName = decodeEntities(tcMatch[1]);
    const timeSeconds = parseFloat(tcMatch[2]) || 0;
    const durationMs = Math.round(timeSeconds * 1000);
    const arr = files.get(filePath) || [];
    arr.push({ name: testName, durationMs });
    files.set(filePath, arr);
  }
  testCaseRegex.lastIndex = 0;
}

if (files.size === 0) {
  fail("No test cases parsed from JUnit report.");
}

let out = '<?xml version="1.0" encoding="UTF-8"?>\n<testExecutions version="1">\n';
for (const [filePath, cases] of files.entries()) {
  const rel = filePath.startsWith(process.cwd())
    ? path.relative(process.cwd(), filePath)
    : filePath;
  out += `  <file path="${rel}">\n`;
  for (const tc of cases) {
    out += `    <testCase name="${tc.name.replace(/"/g, "&quot;")}" duration="${tc.durationMs}"/>\n`;
  }
  out += "  </file>\n";
}
out += "</testExecutions>\n";

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, out, "utf8");
console.error(`Generic test execution report written: ${outputPath} (${files.size} files)`);
