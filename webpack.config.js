const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const development = process.env.NODE_ENV !== 'production';

function entries() {
  let result = [];
  if (development) {
    result.push('webpack-dev-server/client?http://localhost:8080');
    result.push("webpack/hot/only-dev-server");
  }
  result.push("./app/index.js");
  return result;
}

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: development
});

module.exports = {

  entry: entries(),

  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },

  devtool: development ? "inline-source-map" : false,
  devServer: {
    hot: true,
    contentBase: "./app"
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        fallback: "style-loader"
      })
    },{
     test: /\.(png|svg|jpg|gif)$/,
     use: [
       "file-loader"
     ]
    },{
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        "file-loader"
      ]
    },{
      test: /\.jsx?$/, 
      use: ["babel-loader"], 
      exclude: /node_modules/
    }]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "index.html",
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    extractSass,

    // Copy our static images
    new CopyWebpackPlugin([{
     from: './app/assets/art',
     to: 'assets/art'
    },{
     from: './app/assets/favicon.ico'
    }])
  ]
}

