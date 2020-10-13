require('@babel/register')()
const path = require('path')

const nodeExternals = require('webpack-node-externals')

const babelLoader = require('./loaders/babelLoader.ssr').default

const config = () => ({
  entry: [path.join(__dirname, '..', '..', 'index.ssr')],
  externals: [
    nodeExternals({
      allowlist: [
        'emoji-mart',
        'emoji-mart/css/emoji-mart.css',
        'expo-linear-gradient',
        // 'react-native-markdown-display',
        'react-native-scrollable-mixin',
        'react-native-typography',
        /^react-native-web\/src/
      ]
    })
  ],
  mode: 'production',
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
        exclude: /emoji-mart/,
        loader: 'json-loader?emitFile=false',
        test: /\.json$/
      },
      {
        test: /\.css$/i,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'index.ssr.js',
    // publicPath: '/dist-ssr/',
    library: 'app',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '..', '..', '..', 'private', 'dist')
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    // })
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new HtmlPlugin()
  ],
  resolve: {
    alias: {
      net: 'node-libs-browser/mock/net',
      'react-native': 'react-native-web'
    },
    extensions: ['.ssr.js', '.web.js', '.js', '.json']
  },
  target: 'node'
})

module.exports = config
