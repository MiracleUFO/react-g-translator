module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        map: [['~', './src/']],
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-plusplus': 'off',
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'import/extensions': ['error', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
    }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  globals: {
    RequestInit: true,
  },
};
