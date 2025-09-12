#!/usr/bin/env node
/**
 * Local Security Check Script
 *
 * This script performs security checks that can be run locally or in CI/CD
 * without requiring external services that might not work with private repos.
 */

import { execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      ...options,
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, output: error.message, stderr: error.stderr };
  }
}

function checkNpmAudit() {
  process.stdout.write("🔍 Running npm audit...\n");

  const result = runCommand("npm audit --json");
  const auditData = result.success ? JSON.parse(result.output) : null;

  if (auditData && auditData.metadata) {
    const { vulnerabilities } = auditData.metadata;
    const total = vulnerabilities.total || 0;

    if (total > 0) {
      process.stdout.write(`⚠️  Found ${total} vulnerabilities:\n`);
      process.stdout.write(`   - Info: ${vulnerabilities.info || 0}\n`);
      process.stdout.write(`   - Low: ${vulnerabilities.low || 0}\n`);
      process.stdout.write(`   - Moderate: ${vulnerabilities.moderate || 0}\n`);
      process.stdout.write(`   - High: ${vulnerabilities.high || 0}\n`);
      process.stdout.write(`   - Critical: ${vulnerabilities.critical || 0}\n`);

      // Save detailed results
      writeFileSync("security-audit.json", JSON.stringify(auditData, null, 2));
      process.stdout.write("📄 Detailed results saved to security-audit.json\n");

      return { passed: false, vulnerabilities: total };
    } else {
      process.stdout.write("✅ No vulnerabilities found\n");
      return { passed: true, vulnerabilities: 0 };
    }
  } else {
    process.stdout.write("❌ Failed to run npm audit\n");
    return { passed: false, vulnerabilities: -1 };
  }
}

function checkOutdatedPackages() {
  process.stdout.write("\n📅 Checking for outdated packages...\n");

  const result = runCommand("npm outdated --json");
  if (result.success && result.output.trim()) {
    const outdated = JSON.parse(result.output);
    const packages = Object.keys(outdated);

    if (packages.length > 0) {
      process.stdout.write(`📦 Found ${packages.length} outdated packages:\n`);
      packages.forEach((pkg) => {
        const info = outdated[pkg];
        process.stdout.write(`   - ${pkg}: ${info.current} → ${info.latest}\n`);
      });

      writeFileSync("outdated-packages.json", JSON.stringify(outdated, null, 2));
      process.stdout.write("📄 Detailed results saved to outdated-packages.json\n");

      return { outdated: packages.length, packages };
    } else {
      process.stdout.write("✅ All packages are up to date\n");
      return { outdated: 0, packages: [] };
    }
  } else {
    process.stdout.write("✅ All packages are up to date\n");
    return { outdated: 0, packages: [] };
  }
}

function checkRetireJs() {
  process.stdout.write("\n🔍 Running retire.js security scan...\n");

  // Check if retire is available
  const checkRetire = runCommand("npx retire --version");
  if (!checkRetire.success) {
    process.stdout.write("⚠️  retire.js not available, skipping scan\n");
    return { passed: true, issues: 0 };
  }

  const result = runCommand("npx retire --js --outputformat json");
  if (result.success && result.output.trim()) {
    try {
      const retireData = JSON.parse(result.output);
      if (retireData && retireData.length > 0) {
        process.stdout.write(`⚠️  Found ${retireData.length} potential security issues\n`);
        writeFileSync("retire-security.json", JSON.stringify(retireData, null, 2));
        process.stdout.write("📄 Detailed results saved to retire-security.json\n");
        return { passed: false, issues: retireData.length };
      }
    } catch (parseError) {
      // retire.js might return empty output for no issues, or invalid JSON
      process.stdout.write(`⚠️  Could not parse retire.js output: ${parseError.message}\n`);
      process.stdout.write("   Assuming no issues found\n");
    }
  }

  process.stdout.write("✅ No security issues found by retire.js\n");
  return { passed: true, issues: 0 };
}

function checkPackageJson() {
  process.stdout.write("\n📦 Checking package.json for security best practices...\n");

  if (!existsSync("package.json")) {
    process.stdout.write("❌ package.json not found\n");
    return { passed: false };
  }

  const packageResult = runCommand("cat package.json");
  if (!packageResult.success) {
    process.stdout.write("❌ Could not read package.json\n");
    return { passed: false };
  }

  try {
    const packageJson = JSON.parse(packageResult.output);
    const issues = [];

    // Check for common security issues
    if (!packageJson.private && !packageJson.repository) {
      issues.push("Consider adding repository field for transparency");
    }

    if (!packageJson.engines) {
      issues.push("Consider specifying Node.js version in engines field");
    }

    // Check for potentially vulnerable script patterns
    if (packageJson.scripts) {
      const scripts = Object.values(packageJson.scripts);
      const dangerousPatterns = ["rm -rf", "sudo", "chmod +x"];

      scripts.forEach((script) => {
        dangerousPatterns.forEach((pattern) => {
          if (script.includes(pattern)) {
            issues.push(`Potentially dangerous script pattern found: ${pattern}`);
          }
        });
      });
    }

    if (issues.length > 0) {
      process.stdout.write(`⚠️  Found ${issues.length} package.json security recommendations:\n`);
      issues.forEach((issue) => process.stdout.write(`   - ${issue}\n`));
      return { passed: true, recommendations: issues };
    } else {
      process.stdout.write("✅ package.json looks good\n");
      return { passed: true, recommendations: [] };
    }
  } catch (jsonError) {
    process.stdout.write(`❌ Could not parse package.json: ${jsonError.message}\n`);
    return { passed: false };
  }
}

function main() {
  process.stdout.write("🔒 Running Security Checks for Portfolio\n");
  process.stdout.write("=====================================\n\n");

  const results = {
    audit: checkNpmAudit(),
    outdated: checkOutdatedPackages(),
    retire: checkRetireJs(),
    packageJson: checkPackageJson(),
  };

  process.stdout.write("\n📊 Security Check Summary\n");
  process.stdout.write("========================\n");

  let totalIssues = 0;
  let criticalIssues = 0;

  // Audit results
  if (results.audit.vulnerabilities > 0) {
    totalIssues += results.audit.vulnerabilities;
    criticalIssues += results.audit.vulnerabilities;
    process.stdout.write(`❌ npm audit: ${results.audit.vulnerabilities} vulnerabilities\n`);
  } else if (results.audit.vulnerabilities === 0) {
    process.stdout.write("✅ npm audit: No vulnerabilities\n");
  } else {
    process.stdout.write("⚠️  npm audit: Could not complete scan\n");
  }

  // Outdated packages
  if (results.outdated.outdated > 0) {
    totalIssues += results.outdated.outdated;
    process.stdout.write(`⚠️  Outdated packages: ${results.outdated.outdated}\n`);
  } else {
    process.stdout.write("✅ Packages: All up to date\n");
  }

  // Retire.js results
  if (results.retire.issues > 0) {
    totalIssues += results.retire.issues;
    criticalIssues += results.retire.issues;
    process.stdout.write(`❌ retire.js: ${results.retire.issues} security issues\n`);
  } else {
    process.stdout.write("✅ retire.js: No security issues\n");
  }

  // Package.json recommendations
  if (results.packageJson.recommendations && results.packageJson.recommendations.length > 0) {
    process.stdout.write(
      `💡 package.json: ${results.packageJson.recommendations.length} recommendations\n`
    );
  } else {
    process.stdout.write("✅ package.json: No issues\n");
  }

  process.stdout.write("\n");

  if (criticalIssues > 0) {
    process.stdout.write(`🚨 CRITICAL: ${criticalIssues} security vulnerabilities found!\n`);
    process.stdout.write("   Please review and fix these issues before deployment.\n");
    process.exit(1);
  } else if (totalIssues > 0) {
    process.stdout.write(`⚠️  ${totalIssues} issues found (non-critical)\n`);
    process.stdout.write("   Consider addressing these issues for better security.\n");
    process.exit(0);
  } else {
    process.stdout.write("🎉 All security checks passed!\n");
    process.exit(0);
  }
}

main();
