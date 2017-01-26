var webpack = require('webpack');
const env = process.env.NODE_ENV || 'production';

module.exports = {
  entry: {
    'hyperform-ui': './src/index.js',
    vendor: ['jquery',
      'jquery-ui/ui/widgets/autocomplete',
      'jquery-ui/ui/widgets/button',
      'jquery-ui/ui/widgets/checkboxradio',
      'jquery-ui/ui/widgets/controlgroup',
      'jquery-ui/ui/widgets/datepicker',
      'jquery-ui/ui/widgets/spinner',
      'jquery-ui/ui/widgets/slider',
      'jquery-ui/ui/widgets/selectmenu',
    ],
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false, },
    minimize: env !== 'development',
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
  ],
  cache: env !== 'development',
  devtool: env === 'development' ? "#inline-source-map" : undefined,
};
