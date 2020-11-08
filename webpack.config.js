var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './dist/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist-web'),
    filename: 'cic.web.js',
    library: 'cic',
    libraryTarget: 'window'
  },
  mode: 'production',
  performance: {
    hints: false
  },
  stats: 'errors-only',
};
