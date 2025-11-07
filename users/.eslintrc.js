module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2], // enforce 2 spaces indentation
    semi: ['error', 'always'], // enforce semicolons at the end of statements
    quotes: ['error', 'single'], // enforce single quotes for strings
    'no-var': 'error', // enforce the use of const or let instead of var
    'arrow-parens': ['error', 'always'], // enforce parentheses around arrow function parameters
    'no-unused-vars': 'error', // detect unused variables
    'consistent-return': 'error', // ensure consistent return statements
    complexity: ['error', 10], // set a maximum complexity for functions
    'no-console': 'warn', // warn against using console statements
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
