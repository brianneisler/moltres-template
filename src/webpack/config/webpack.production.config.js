require('@babel/register')()
const { pick } = require('ramda')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')
const webpack = require('webpack')
const loadEnv = require('../../utils/config/loadEnv').default

const config = (env) => {
  if (!env) {
    env = loadEnv(path.resolve(__dirname, '..', '..', '..'), {
      stage: process.env.STAGE
    })
  }
  return {
    entry: [path.join(__dirname, '..', '..', 'index')],
    mode: 'production',
    module: {
      rules: [
        {
          exclude: {
            exclude: [
              path.resolve(__dirname, '..', '..'),
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'node_modules',
                'emoji-mart'
              ),
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'node_modules',
                'react-native-typography'
              ),
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'node_modules',
                'react-native-web',
                'src'
              ),
              path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                'node_modules',
                'expo-linear-gradient'
              )
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
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime'
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
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          modules: {
            chunks: 'all',
            name: 'modules',
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    },
    output: {
      filename: '[name].[contenthash].js',
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
      ),
      new ManifestPlugin({
        publicPath: '/dist/'
        // sort: (a, b) => {
        //   console.log('a:', a)
        //   console.log('b:', b)
        //   return 0
        // }
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

module.exports = config
