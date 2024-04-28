const path = require('path');
module.exports = {
  root: true,
  extends: '@react-native',
  parset: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    },
  },
};
