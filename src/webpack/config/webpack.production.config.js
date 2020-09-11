require('@babel/register')()

const path = require('path')

const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

const loadProjectConfig = require('../../config/loadProjectConfig').default

const { babelLoader } = require('./loaders')

const moltresConfig = async () => {
  const config = await loadProjectConfig({
    dropSensitive: true,
    target: 'webpack'
  })
  return {
    entry: [path.join(__dirname, '..', '..', 'index')],
    mode: 'production',
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
      new webpack.EnvironmentPlugin({
        MOLTRES_CONFIG: JSON.stringify(config),
        STAGE: config.stage,
        TARGET: 'web'
      }),
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

module.exports = moltresConfig
