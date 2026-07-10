import { join } from "node:path";

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    // Unwrap @layer blocks so older iOS Safari (which drops layered rules)
    // renders correctly on every deploy path. See the plugin file for detail.
    // Turbopack re-evaluates this config from inside .next, so the plugin is
    // addressed absolutely from the project root (cwd during builds) rather
    // than relative to this file.
    [join(process.cwd(), "postcss-flatten-layers.cjs")]: {},
  },
};

export default config;
