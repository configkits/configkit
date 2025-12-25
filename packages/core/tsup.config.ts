import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], 
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  outDir: "dist",
  external: [],
  tsconfig: "./tsconfig.build.json",
});

