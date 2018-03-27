const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    bundle: './src/bundle.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            'presets': ['env']
          }
        }]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'raw-loader'
        }]
      }
    ]
  }/**,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all'}
      }
    }
  }
  **/
}
