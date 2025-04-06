import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from "eslint-plugin-simple-import-sort"
import filenamesPlugin from "eslint-plugin-filenames"

export default tseslint.config(
  { ignores: ['dist'] },
  // コンポーネントファイルのルール（PascalCase）
  {
    files: ['**/*.tsx'],
    excludedFiles: ['**/index.tsx', '**/main.tsx'], // 特別なファイル名を除外
    plugins: {
      'filenames': filenamesPlugin,
    },
    rules: {
      "filenames/match-regex": ["error", "^[A-Z][a-zA-Z0-9]+$"], // PascalCase
    }
  },
  // 特別なファイル名のルール
  {
    files: ['**/index.tsx', '**/main.tsx', '**/index.ts'],
    plugins: {
      'filenames': filenamesPlugin,
    },
    rules: {
      "filenames/match-regex": ["error", "^(index|main)$"], // indexとmainのみ許可
    }
  },
  // その他のファイルのルール（camelCase）
  {
    files: ['**/*.ts'],
    excludedFiles: ['**/index.ts'], // index.tsを除外
    plugins: {
      'filenames': filenamesPlugin,
    },
    rules: {
      "filenames/match-regex": ["error", "^[a-z][a-zA-Z0-9.]+$"], // camelCase
    }
  },
  // 既存のベース設定
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "prettier",
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // simple-import-sortのルール
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // 命名規則
      "@typescript-eslint/naming-convention": [
        "error",
        // interfaceはPascalCase
        {
          "selector": "interface",
          "format": ["PascalCase"],
        },
        // 変数はcamelCase
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE"]
        },
        // functionはcamelCase
        {
          "selector": "function",
          "format": ["camelCase"]
        },
        // classはPascalCase
        {
          "selector": "class",
          "format": ["PascalCase"]
        }
      ],
    },
  },
)
