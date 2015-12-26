var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
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
    {
      test: /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      include: path.join(__dirname, 'src')
    },
    { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
    { test: /\.(ttf|eot)$/, loader: 'file' },
    ]
  }
};
