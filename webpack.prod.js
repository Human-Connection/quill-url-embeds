const path = require('path')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = [
  // Client side package
  merge(common, {
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new UglifyJSPlugin({
        sourceMap: true
      })
    ],
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: 'quillUrlEmbeds',
      libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      },
      quill: {
        commonjs: 'quill',
        commonjs2: 'quill',
        amd: 'quill',
        root: 'Quill'
      },
      'quill-delta': {
        commonjs: 'quill-delta',
        commonjs2: 'quill-delta',
        amd: 'quill-delta',
        root: 'Delta'
      }
    }
  }),
  // Server side package
  merge(common, {
    devtool: 'source-map',
    target: 'node',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      })
    ],
    entry: {
      'embed-to-anchor': './src/utils/embed-to-anchor.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd'
    }
  })
]
