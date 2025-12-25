import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false, // TODO: deafult true
  splitting: false,
  treeshake: true,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  external: ["@configkits/core"],
});

