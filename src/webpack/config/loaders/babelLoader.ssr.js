import path from 'path'

const srcDir = path.resolve(__dirname, '..', '..', '..')
const rootDir = path.resolve(__dirname, '..', '..', '..', '..')
const nodeModulesDir = path.resolve(rootDir, 'node_modules')

const babelLoader = {
  exclude: {
    exclude: [
      srcDir,
      path.resolve(nodeModulesDir, 'emoji-mart'),
      path.resolve(nodeModulesDir, 'expo-linear-gradient'),
      // path.resolve(nodeModulesDir, 'react-native-markdown-display'),
      path.resolve(nodeModulesDir, 'react-native-typography'),
      path.resolve(nodeModulesDir, 'react-native-web', 'src')
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
}

export default babelLoader
