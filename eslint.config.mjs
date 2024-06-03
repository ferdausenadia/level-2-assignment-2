// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  //globals

  {
    languageOptions: {
      globals: {
        ...global.node,
        process: 'readonly',
      },
    },
  },
  //rules
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      //"prefer-const": "error"
      'no-console': 'warn',
      'no-unused-expressions': 'error',
      'no-undef': 'error',
    },
  },
);
