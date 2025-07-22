import ts from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
        ...ts.configs.recommended.rules,
        '@typescript-eslint/no-explicit-any': 'off',
        ...prettier.rules,
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
]
