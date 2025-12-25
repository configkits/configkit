import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false, // TODO: deafult true
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outDir: "dist",
  external: ["react", "react-dom", "@configkits/core"],
});

