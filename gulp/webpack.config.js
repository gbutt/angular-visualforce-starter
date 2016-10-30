var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {},
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      include: path.resolve('./src/'),
      loader: 'json-loader'
    }, {
      test: /.*\.js$/,
      include: path.resolve('./src/'),
      loaders: ['ng-annotate']
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      loader: "file",
      query: {
        name: 'fonts/[name].[ext]'
      }
    }, ],
    postLoaders: []
  },
  resolve: {
    root: path.resolve(global.appRoot, './src'),
    alias: {}
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new ExtractTextPlugin("styles.css")
  ]
};