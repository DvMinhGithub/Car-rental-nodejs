import config from 'eslint-config-standard';

export default [
  ...[].concat(config),
  {
    env: {
      node: true,
    },
    parserOptions: {
      ecmaVersion: 2018,
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },
];
