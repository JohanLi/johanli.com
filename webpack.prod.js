const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: [
      'babel-polyfill',
      'whatwg-fetch',
      './server/index',
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
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
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
              {
                loader: "sass-loader",
              },
            ],
          }),
        },
        {
          test: /\.(png|gif|jpg)/,
          loader: 'url-loader',
          options: {
            name: 'img/[name]-[hash].[ext]',
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
      new ExtractTextPlugin('styles-[hash].css'),
    ],
    target: 'node',
    node: {
      __dirname: false, // server bundle uses __dirname to load index.html
    },
    externals: [nodeExternals()],
  },
  {
    entry: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/index',
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'client-[hash].js',
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
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            }, {
              loader: "sass-loader",
            }],
          })
        },
        {
          test: /\.(png|gif|jpg)/,
          loader: 'url-loader',
          options: {
            name: 'img/[name]-[hash].[ext]',
            limit: 10000,
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader",
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
      new ExtractTextPlugin('styles-[hash].css'),
      new HtmlWebpackPlugin({
        favicon: './public/img/favicon.ico',
        template: './public/index.html',
        filename: './index.html',
        inject: 'head',
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
    ],
  },
];
