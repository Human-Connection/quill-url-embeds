const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(['dist'])
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
})
