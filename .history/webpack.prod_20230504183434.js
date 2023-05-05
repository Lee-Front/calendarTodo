const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/calendarTodo",
    filename: "bundle.js",
  },
});
