const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const publicPath = 'http://localhost:8050/public/js';
const cssName = 'styles.css';
const jsName = 'bundle.js';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(`../css/${cssName}`),
  new webpack.LoaderOptionsPlugin({
    debug: process.env.NODE_ENV !== 'production'
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin(['public/'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
}

module.exports = {
  entry: [
    'babel-polyfill',
    './client.js'
  ],
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public/js/`,
    filename: jsName,
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      { test: /\.gif$/, use: { loader: 'url-loader', options: { limit: 10000, mimetype: 'image/gif', prefix: '../img/' } } },
      { test: /\.jpg$/, use: { loader: 'url-loader', options: { limit: 10000, mimetype: 'image/jpg', prefix: '../img/' } } },
      { test: /\.png$/, use: { loader: 'url-loader', options: { limit: 10000, mimetype: 'image/png', prefix: '../img/' } } },
      { test: /\.svg/, use: { loader: 'url-loader', options: { limit: 26000, mimetype: 'image/svg+xml', prefix: '../img/' } } },
      { test: /\.(woff|woff2|ttf|eot)/, use: { loader: 'url-loader', options: { limit: 1, prefix: '../fonts/' } } },
      { test: /\.jsx?$/,
        use:
          process.env.NODE_ENV !== 'production' ?
          [
            {
              loader: 'react-hot-loader'
            },
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', ['es2015', { modules: false }], 'stage-2']
              }
            }
          ] :
          'babel-loader',
        exclude: [/node_modules/, /public/]
      }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: ['./public/js', './public/css']
  }
};
