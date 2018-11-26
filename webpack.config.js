const { resolve } = require('path');

module.exports = {
  entry: './src/content.js',
  output: {
    filename: 'content.js',
    path: resolve(__dirname, 'dist'),
  },
};
