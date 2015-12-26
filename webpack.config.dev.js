var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',  // Lets HMR know to re-render
    './src/index'
  ],
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/,loader: 'style-loader!css-loader' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.(woff|woff2)$/, loader:'url?prefix=font/&limit=5000' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      include: path.join(__dirname, 'src')
    }]
  }
};
