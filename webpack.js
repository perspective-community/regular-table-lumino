const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/, // run the loaders below only on .css files
        // this are the loaders. they interpret files, in this case css. they run from right to left sequence.
        // css-loader: "interprets @import and url() like import/require() and will resolve them."
        // style-loader: "Adds CSS to the DOM by injecting a <style> tag". this is fine for development.
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
};