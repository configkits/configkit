import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  splitting: false,
  treeshake: true,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  external: ["@configkits/core"],
  tsconfig: "./tsconfig.build.json",
});

