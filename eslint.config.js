import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'warn',
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'eqeqeq': ['warn', 'always'],
      'no-console': 'warn',
      'no-var': 'error',
      'indent': ['warn', 2],
      'no-debugger': 'error',
      'no-undef': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-mixed-spaces-and-tabs': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      }
    }
  },
  pluginReact.configs.flat.recommended,
]);
