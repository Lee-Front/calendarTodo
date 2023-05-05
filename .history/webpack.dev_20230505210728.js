const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/calendarTodo",
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});
