const webpack = require('webpack');
const path = require('path');

module.exports = {

  // Entry point for entire app
  entry: './src/app.jsx',

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      'src',
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /index.html$/,
        use: [
          {
            loader :'file-loader',
            options: {
              name: '[name].[ext]'
            },
          }
        ],
      },
      {
        test: /\.(css|png|jpg|gif|otf|eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader :'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
          }
        ],
      },
      {
        test: /\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      }
    ],
  },
};
