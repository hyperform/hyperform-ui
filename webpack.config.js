var webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';

module.exports = {
  entry: {
    'hyperform-ui': './src/index.js',
  },
  output: {
    path: './dist/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false, },
    minimize: env !== 'development',
  })],
  cache: env !== 'development',
  devtool: env === 'development' ? "#inline-source-map" : undefined,
};
