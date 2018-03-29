const path = require('path')

module.exports = {
  target: 'web',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  },
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
  }/** ,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all'}
      }
    }
  }
  **/
}
