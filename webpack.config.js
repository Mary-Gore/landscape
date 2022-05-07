const path = require('path'),
HTMLWebpackPlugin = require('html-webpack-plugin'),
webpack = require('webpack'),
{CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build')
  },
   build: {
    index: path.resolve(__dirname, '../build/index.html'),
    assetsRoot: path.resolve(__dirname, '../build'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false, 
    devtool: '#source-map',
    productionGzip: false,
},
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        },
        exclude: /node_modules/
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
