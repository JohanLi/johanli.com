const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './server/index',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|gif|jpg)/,
        loader: 'url-loader',
        options: {
          name: 'assets/[name]-[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(svg)/,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
  target: 'node',
  externals: [nodeExternals()],
};
