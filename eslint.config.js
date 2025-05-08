import globals from 'globals'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  js.configs.recommended, // Reglas básicas de JavaScript
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': pluginReactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-empty-function': 'error',
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'none', ignoreRestSiblings: false }
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Buenas prácticas generales
      'react/jsx-no-constructed-context-values': 'warn',
      'react/no-unstable-nested-components': 'warn', // Útil con server components / concurrent
      'react/self-closing-comp': 'warn',
      'react/no-array-index-key': 'warn',

      // Nuevas prácticas con hooks modernos
      'react/hook-use-state': 'warn', // Advierte si usas mal setState (útil en React 18+)
      'react/prefer-stateless-function': [
        'warn',
        { ignorePureComponents: true }
      ],
      'react/no-namespace': 'error',

      // Uso correcto de hooks (reglas del core de React)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Integración con Prettier
      'prettier/prettier': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  prettier // Agrega las reglas de Prettier
]

// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   { ignores: ["dist"] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       ecmaVersion: "latest",
//       globals: globals.browser,
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   }
// );
