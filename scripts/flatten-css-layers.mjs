/**
 * Unwrap CSS cascade layers from the built stylesheets.
 *
 * Tailwind v4 wraps everything in `@layer` blocks. Browsers that mishandle
 * cascade layers (older iOS Safari) then drop every utility while unlayered
 * rules keep applying, collapsing the whole layout. Tailwind's output is
 * already ordered properties -> theme -> base -> utilities, so hoisting the
 * rules out of their layers preserves precedence via source order and makes
 * the stylesheet work on any engine.
 *
 * Runs after `next build` (see the build script in package.json).
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";

const cssDir = join(process.cwd(), ".next", "static", "css");

const unwrap = (root) => {
  // Re-walk until stable: replacing an at-rule with its children can insert
  // nested `@layer` blocks the current walk pass does not visit.
  for (;;) {
    let found = false;
    root.walkAtRules("layer", (atRule) => {
      found = true;
      if (atRule.nodes && atRule.nodes.length > 0) {
        atRule.replaceWith(atRule.nodes);
      } else {
        atRule.remove(); // bare `@layer a, b;` statements
      }
    });
    if (!found) break;
  }
};

let files = [];
try {
  files = readdirSync(cssDir).filter((f) => f.endsWith(".css"));
} catch {
  console.log("flatten-css-layers: no CSS output directory, skipping");
  process.exit(0);
}

for (const file of files) {
  const path = join(cssDir, file);
  const css = readFileSync(path, "utf8");
  const result = postcss.parse(css, { from: path });
  unwrap(result);
  const flattened = result.toString();
  writeFileSync(path, flattened);
  const layersLeft = (flattened.match(/@layer/g) || []).length;
  console.log(
    `flatten-css-layers: ${file} ${css.length} -> ${flattened.length} bytes, @layer left: ${layersLeft}`
  );
}
