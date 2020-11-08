var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './dist/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist-web'),
    filename: 'cic-client.web.js',
    library: 'cic',
    libraryTarget: 'window'
  },
  mode: 'development',
  performance: {
    hints: false
  },
  stats: 'errors-only',
  resolve: {
	  fallback: {
		  "path": false,
		  "fs": false,
	  },
	  extensions: [".js", ".json"],
  },
};
