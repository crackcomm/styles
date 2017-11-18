const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssSimpleVars = require('postcss-simple-vars')
const postcssInherit = require('postcss-inherit')
const postcssImport = require('postcss-import')

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: '/',
    library: 'styles-tachyons',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts(x?)$/,
      loader: 'tslint-loader',
    }, {
      test: /\.css$/,
      exclude: /particles\.css/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?modules!postcss-loader',
      }),
    }, {
      test: /particles\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?modules&localIdentName=[local]!postcss-loader',
      }),
    }, {
      test: /\.ts(x?)$/,
      loader: 'awesome-typescript-loader',
    }],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          postcssImport(),
          postcssInherit,
          postcssSimpleVars({
            variables: () => require('./dist/theme/variables'),
          }),
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll: true,
            },
            safe: true,
          })
        ],
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
