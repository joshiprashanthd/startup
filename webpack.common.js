const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [
                  require("tailwindcss")("./src/tailwind.config.js"),
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["!_redirects"],
    }),
    new HtmlWebpackPlugin({
      title: "YourCollab",
      template: path.join(__dirname, "public", "index.html"),
      inject: "body",
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin(),
  ],
};
