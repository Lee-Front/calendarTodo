const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "/calendarTodo/",
              include: ["src/images", "src/fonts"],
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/calendarTodo/",
    filename: "bundle.js",
  },
});
