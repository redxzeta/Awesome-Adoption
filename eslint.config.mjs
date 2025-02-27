import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:jest-dom/recommended",
      "plugin:testing-library/react",
      "plugin:prettier/recommended"
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      "testing-library": fixupPluginRules(testingLibrary),
      "jest-dom": fixupPluginRules(jestDom),
      "@typescript-eslint": fixupPluginRules(typescriptEslint)
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        JSX: true
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        pragma: "React",
        version: "19"
      }
    },

    rules: {
      "react/react-in-jsx-scope": "off",

      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      ],

      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-console": "warn",
      "react/prop-types": 0,

      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          message: "Unexpected property on console object was called"
        }
      ]
    }
  },
  ...fixupConfigRules(compat.extends("plugin:testing-library/react")).map(config => ({
    ...config,
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"]
  }))
];
