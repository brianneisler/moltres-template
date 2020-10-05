require('@babel/register')()
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const { merge } = require('moltres')
const webpack = require('webpack')

const loadProjectConfig = require('./src/config/loadProjectConfig').default

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await loadProjectConfig({
    dropSensitive: true,
    target: 'webpack'
  })
  const webpackConfig = await createExpoWebpackConfigAsync(env, argv)
  webpackConfig.resolve.alias = merge(webpackConfig.resolve.alias, {
    fs: 'empty/object',
    net: 'node-libs-browser/mock/net',
    'react-native': 'react-native-web',
    stream: 'readable-stream'
  })

  webpackConfig.plugins.unshift(
    new webpack.EnvironmentPlugin({
      MOLTRES_CONFIG: JSON.stringify(config),
      STAGE: config.stage,
      TARGET: 'web'
    })
  )

  // // Maybe you want to turn off compression in dev mode.
  // if (config.mode === 'development') {
  //   config.devServer.compress = false
  // }

  // // Or prevent minimizing the bundle when you build.
  // if (config.mode === 'production') {
  //   config.optimization.minimize = false
  // }

  // Finally return the new config for the CLI to use.
  return webpackConfig
}
