const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'lib/index.js'),
    common: path.resolve(__dirname, 'lib/helpers/common'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: true,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
