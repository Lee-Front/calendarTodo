const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  output: {
    publicPath: process.env.PUBLIC_URL || "/",
  },
});
