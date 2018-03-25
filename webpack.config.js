var path = require('path')

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
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            'presets': [['es2015', {'modules': false}]]
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
  }
}
