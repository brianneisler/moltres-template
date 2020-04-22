const nodeExternals = require('webpack-node-externals')
const path = require('path')

const config = () => ({
  entry: [path.join(__dirname, '..', '..', 'index.ssr')],
  externals: [
    nodeExternals({
      whitelist: [
        'emoji-mart',
        'emoji-mart/css/emoji-mart.css',
        'expo-linear-gradient',
        'react-native-scrollable-mixin',
        'react-native-typography',
        /^react-native-web\/src/
      ]
    })
  ],
  mode: 'production',
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
                  targets: {
                    node: 'current'
                  },
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
