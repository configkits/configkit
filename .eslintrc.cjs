module.exports = {
  root: true,
  ignorePatterns: ["dist/", "coverage/", "node_modules/", "**/*.config.js", "**/*.config.cjs", "**/*.config.mjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    es2021: true,
    node: true,
    browser: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
