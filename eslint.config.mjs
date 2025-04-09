import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

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
  // TypeScriptファイル用の設定
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/naming-convention": [
        "error",
        // Reactコンポーネントの命名規則（PascalCase）
        {
          selector: "variable",
          types: ["function"],
          format: ["PascalCase"],
          filter: {
            regex:
              "^[A-Z][a-zA-Z0-9]*(?:Layout|Page|Component|Provider|Context|Router|Container|Wrapper|List|Item|Form|Modal|Button|Icon|View)$",
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
        // 関数宣言の命名規則
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          filter: {
            regex:
              "^[A-Z][a-zA-Z0-9]*(?:Layout|Page|Component|Provider|Context|Router|Container|Wrapper|List|Item|Form|Modal|Button|Icon|View)$",
            match: true,
          },
        },
      ],
    },
  },
  // Reactファイル用の設定
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [pluginReact.configs.flat.recommended],
  },
  // Unicornプラグインの設定
  {
    files: ["**/*.ts"],
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
        },
      ],
    },
    ignores: ["vite-env.d.ts", "**/*.d.ts"], // 型定義ファイルは除外
  },
  {
    files: ["**/*.tsx"],
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "pascalCase",
          ignore: ["main.tsx", "router.tsx", "index.tsx"], // 特定のファイルを除外
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ignores: ["node_modules", "dist"],
  },
]);
