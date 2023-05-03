const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: process.env.PUBLIC_URL || "/", // PUBLIC_URL 설정
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new webpack.DefinePlugin({
      // PUBLIC_URL 설정
      "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL || ""),
    }),
  ],
});
