require('@babel/register')()
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const loadProjectConfig = require('../../config/loadProjectConfig').default

const { babelLoader } = require('./loaders')

const webpackConfig = async () => {
  const config = await loadProjectConfig({
    dropSensitive: true,
    target: 'webpack'
  })
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      app: path.resolve(__dirname, '..', '..', 'widget', 'app.js'),
      loader: path.resolve(__dirname, '..', '..', 'widget', 'loader.js')
    },
    mode: 'development',
    module: {
      rules: [
        babelLoader,
        {
          loader: 'file-loader?emitFile=false',
          test: /\.(ttf|eot|otf|gif|jpe?g|png|svg)$/
        },
        {
          loader: 'url-loader?emitFile=false',
          test: /\.(woff|woff2)$/
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '..', '..', '..', 'apps', 'widget', 'dist')
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        MOLTRES_CONFIG: JSON.stringify(config),
        STAGE: config.stage,
        TARGET: 'web'
      }),
      new HtmlWebpackPlugin({
        chunks: ['app'],
        filename: 'index.html',
        hash: true,
        meta: {
          charset: 'utf-8',
          'theme-color': '#000000',
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        template: path.resolve(
          __dirname,
          '..',
          '..',
          'widget',
          'app',
          'templates',
          'index.html'
        ),
        title: 'moltres widget'
      })
    ],
    resolve: {
      alias: {
        fs: 'empty/object',
        net: 'node-libs-browser/mock/net',
        'react-native': 'react-native-web',
        stream: 'readable-stream'
      },
      extensions: ['.widget.js', '.web.js', '.js', '.json']
    },
    target: 'web'
  }
}

module.exports = webpackConfig
