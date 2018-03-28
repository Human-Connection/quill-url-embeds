const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: {
    index: './src/index.js',
    bundle: './src/bundle.js'
  },
  output: {
    path: path.join(__dirname, 'demo'),
    filename: '[name].js',
    library: 'quillUrlEmbeds',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo')
  }
})
