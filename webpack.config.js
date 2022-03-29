const path = require("path");
const HtmlWebPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
      {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [new HtmlWebPlugin({ template: "./src/index.html" })],
};
