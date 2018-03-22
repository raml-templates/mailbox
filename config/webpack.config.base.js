/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

const isDev = process.env.NODE_ENV === 'development';
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = paths.servedPath === './';

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';
const cssClassName = isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]'
// Heads up!
// We use ExtractTextPlugin to extract LESS content in production environment,
// we will still use fallback to style-loader in development.
const extractLess = new ExtractTextPlugin({
  filename: cssFilename,
  disable: isDev
});
// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.NODE_ENV === 'production' && process.env.GENERATE_SOURCEMAP !== 'false';

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.less$/,
      include: [
        path.resolve(paths.appSrc, 'components'),
      ],
      use: extractLess.extract({
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: isDev,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              localIdentName: cssClassName,
              modules: true,
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: shouldUseSourceMap,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer(autoprefixerOptions),
              ],
            },
          },
          { loader: require.resolve('less-loader') }
        ],
      }),
    },
    {
      test: /\.less$/,
      exclude: [
        // path.resolve(paths.appSrc, 'components'),
        path.resolve(process.cwd(), 'app/components'),
      ],
      use: extractLess.extract({
        fallback: {
          loader: 'style-loader',
          options: {
            hmr: isDev,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: process.env.NODE_ENV === 'production',
              sourceMap: shouldUseSourceMap,
            },
          },
          { loader: require.resolve('less-loader') }
        ],
        ...extractTextPluginOptions,
      }),
    }]
  },

  output: {
    path: path.join(__dirname, '../app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.jsx'],
    modules: [
      path.join(__dirname, '../app'),
      'node_modules',
    ],

  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    extractLess,

    new webpack.NamedModulesPlugin(),
  ],
};
