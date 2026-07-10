/**
 * PostCSS plugin: unwrap CSS cascade layers.
 *
 * Tailwind v4 wraps everything in `@layer` blocks, which some older iOS
 * Safari versions mishandle — they drop every layered rule while unlayered
 * rules keep applying, collapsing the layout. Tailwind's output is already
 * ordered properties -> theme -> base -> utilities, so hoisting rules out of
 * their layers preserves precedence via source order and works on any engine.
 *
 * Running this inside the PostCSS pipeline (after Tailwind) means every
 * build path — local, GitHub Actions `vercel build`, and Vercel's native git
 * deployments — emits flattened CSS. scripts/flatten-css-layers.mjs stays as
 * an idempotent post-build safety net.
 */
module.exports = () => ({
  postcssPlugin: "flatten-cascade-layers",
  OnceExit(root) {
    // Re-walk until stable: replacing an at-rule with its children can
    // surface nested `@layer` blocks the current pass does not visit.
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
  },
});

module.exports.postcss = true;
