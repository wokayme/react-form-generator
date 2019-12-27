const path = require('path');

module.exports = {
  extends: ['airbnb', 'prettier','plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  parser:  '@typescript-eslint/parser',
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'prettier/prettier': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-underscore-dangle': [2, { 'allow': ['__'] }],
    'default-case': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'consistent-return': 0,
    'no-restricted-properties': 0,
    'react/no-find-dom-node': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': [1, { ignore: ['children'] }],
    'import/extensions': 0,
    'no-undef': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
  },
  settings: {
    'import/resolver': {
        node: {
            paths: [path.resolve(__dirname, 'src')],
            'extensions': ['.js','.jsx','.ts','.tsx']
        },
    },
  },
  'env': {
    'browser': true,
  }
};
