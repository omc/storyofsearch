var commonConfig = require('./webpack-common.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
var webpack = require('webpack');

// var ExtractTextPlugin = require("extract-text-webpack-plugin");

// var extractSass = new ExtractTextPlugin({
//   filename: "[name].[contenthash].css",
//   disable: process.env.NODE_ENV === "development"
// });


var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?stage=0&optional=runtime'],
  },
  { test: /^(?!.*\.critical).*\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.critical\.css$/, loader: StyleExtHtmlWebpackPlugin.inline() }
]

module.exports = {
  entry: [
  // our entry file
  './app/main.js'
  ],
  output: {
    path: './build',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: commonConfig.loaders.concat(prodLoaders)

  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    commonConfig.indexPagePlugin,
    // commonConfig.sassy,
    new CopyWebpackPlugin([{
     from: './app/assets/art',
     to: 'art'
    },{
     from: './app/assets/favicon.ico'
    }])
  ]

}