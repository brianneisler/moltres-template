require('@babel/register')()
const { pick } = require('ramda')
const path = require('path')
const webpack = require('webpack')
const loadEnv = require('../../utils/config/loadEnv').default

const config = (env) => {
  if (!env) {
    env = loadEnv(path.resolve(__dirname, '..', '..', '..'), { stage: process.env.STAGE })
  }
  return {
    devtool: 'eval-source-map',
    entry: [path.join(__dirname, '..', '..', 'index')],
    mode: 'development',
    module: {
      rules: [
        {
          exclude: {
            exclude: [
              path.resolve(__dirname, '..', '..'),
              path.resolve(__dirname, '..', '..', '..', 'node_modules', 'emoji-mart'),
              path.resolve(__dirname, '..', '..', '..', 'node_modules', 'react-native-typography'),
              path.resolve(__dirname, '..', '..', '..', 'node_modules', 'react-native-web', 'src'),
              path.resolve(__dirname, '..', '..', '..', 'node_modules', 'expo-linear-gradient')
            ],
            test: path.resolve(__dirname, '..', '..', '..', 'node_modules')
          },
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                ['react-native-web', { commonjs: true }],
                '@babel/plugin-proposal-class-properties'
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: 3,
                    // targets should be pulled from .browserlistrc
                    useBuiltIns: 'usage'
                  }
                ],
                '@babel/preset-react',
                '@babel/preset-flow',
                'babel-preset-expo'
              ]
            }
          }
        },
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
            'FACEBOOK_APP_ID',
            'FIREBASE_API_KEY',
            'FIREBASE_APP_ID',
            'FIREBASE_MEASUREMENT_ID',
            'FIREBASE_MESSAGING_SENDER_ID',
            'FIREBASE_PROJECT_ID',
            'NODE_ENV',
            'SENTRY_DSN',
            'SITE_NAME',
            'SITE_URL',
            'TWITTER_USERNAME',
            'WAT_API_URL'
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
