const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {

  entry: [
    // "react-hot-loader/patch", // activate HMR for React
    // "webpack-dev-server/client?http://localhost:8080",
    // "webpack/hot/only-dev-server",
    "./app/index.js",
  ],

  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },

  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: "./app"
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
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
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "index.html",
      inject: "body"
    }),
    // new webpack.HotModuleReplacementPlugin()
  ]
}

