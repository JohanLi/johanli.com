const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
    './client/index',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'react',
            'stage-0',
          ],
        },
      },
      {
        test: /\.scss$/,
        loader: 'style-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader',
      },
      {
        test: /\.(png|gif|jpg)/,
        loader: 'url-loader',
        options: {
          name: 'public/[name].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/img/favicon.ico',
      template: './public/index.html',
      inject: 'head',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-source-map',
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
};
