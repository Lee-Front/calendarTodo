const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
console.log("process.env : ", process.env);
module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  output: {
    publicPath: process.env.PUBLIC_URL || "/",
  },
});
