const path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
webpack = require('webpack');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
    environment: {
      arrowFunction: false
    }
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            }
            },
        exclude: /node_modules/
      },
      {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
      }
  ]
  },
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
     new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
