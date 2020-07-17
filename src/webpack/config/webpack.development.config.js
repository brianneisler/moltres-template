require('@babel/register')()
const path = require('path')

const { pick } = require('ramda')
const webpack = require('webpack')

const loadEnv = require('../../utils/config/loadEnv').default

const { babelLoader } = require('./loaders')

const config = (env) => {
  if (!env) {
    env = loadEnv(path.resolve(__dirname, '..', '..', '..'), {
      stage: process.env.STAGE
    })
  }
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
      new webpack.EnvironmentPlugin(
        pick(
          [
            'API_URL',
            'APP_DESCRIPTION',
            'APP_NAME',
            'APP_URL',
            'FACEBOOK_APP_ID',
            'FIREBASE_API_KEY',
            'FIREBASE_APP_ID',
            'FIREBASE_MEASUREMENT_ID',
            'FIREBASE_MESSAGING_SENDER_ID',
            'FIREBASE_PROJECT_ID',
            'NODE_ENV',
            'SENTRY_DSN',
            'TWITTER_USERNAME'
          ],
          env
        )
      )
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

module.exports = config
