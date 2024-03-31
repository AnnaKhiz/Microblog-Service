module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['/static/*'], // linting only node part now
  rules: {
    semi: ['warn', 'always'],
    quotes: ['warn', 'single']
  },
};
