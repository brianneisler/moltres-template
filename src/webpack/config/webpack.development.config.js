require('@babel/register')()
const path = require('path')

const webpack = require('webpack')

const loadProjectConfig = require('../../config/loadProjectConfig').default

const { babelLoader } = require('./loaders')

const webpackConfig = async () => {
  const config = await loadProjectConfig({
    dropSensitive: true,
    target: 'webpack'
  })
  return {
    devtool: 'eval-source-map',
    entry: [path.join(__dirname, '..', '..', 'index')],
    mode: 'development',
    module: {
      rules: [
        babelLoader,
        {
          loader: 'file-loader?emitFile=false',
          test: /\.(ttf|eot|otf|gif|jpe?g|png|svg)$/
          // query: { name: '[name].[hash:16].[ext]' }
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
      path: path.resolve(__dirname, '..', '..', '..', 'public', 'dist')
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        MOLTRES_CONFIG: JSON.stringify(config),
        STAGE: config.stage,
        TARGET: 'web'
      })
    ],
    resolve: {
      alias: {
        fs: 'empty/object',
        net: 'node-libs-browser/mock/net',
        'react-native': 'react-native-web',
        stream: 'readable-stream'
      },
      extensions: ['.web.js', '.js', '.json']
    },
    target: 'web'
  }
}

module.exports = webpackConfig
