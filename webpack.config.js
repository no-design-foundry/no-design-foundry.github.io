const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.py$/,
        use: "raw-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Application name",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
  },
};
