import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/naming-convention": [
        "error",
        // Reactコンポーネントの命名規則（PascalCase）
        {
          selector: "variable",
          types: ["function"],
          format: ["PascalCase"],
          modifiers: ["exported"],
          filter: {
            regex: "^[A-Z]",
            match: true,
          },
        },
        // 通常の変数、パラメータ、メンバーの命名規則
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        // Reactフックの命名規則（useXxx）
        {
          selector: "variable",
          types: ["function"],
          format: ["camelCase"],
          prefix: ["use"],
          filter: {
            regex: "^use[A-Z]",
            match: true,
          },
        },
        // インターフェースの命名規則（PascalCase）
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        // 列挙型メンバーの命名規則
        {
          selector: "enumMember",
          format: ["UPPER_CASE", "PascalCase"],
        },
      ],
    },
  },
  {
    ignores: ["node_modules", "dist"],
  },
]);
