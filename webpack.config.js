const path = require('path'),
webpack = require('webpack');

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle'),
    environment: {
      arrowFunction: false
    },
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
   
  ]
  },
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
     ]
}
