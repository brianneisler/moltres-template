import path from 'path'

const srcDir = path.resolve(__dirname, '..', '..', '..')
const rootDir = path.resolve(__dirname, '..', '..', '..', '..')
const nodeModulesDir = path.resolve(rootDir, 'node_modules')

const babelLoader = {
  exclude: {
    exclude: [
      srcDir,
      // NOTE BRN: We include @hapi/joi for ie11 support
      path.resolve(nodeModulesDir, '@hapi/joi'),
      path.resolve(nodeModulesDir, 'emoji-mart'),
      path.resolve(nodeModulesDir, 'expo-linear-gradient'),
      // NOTE BRN: We include query-string for ie11 support
      path.resolve(nodeModulesDir, 'query-string'),
      path.resolve(nodeModulesDir, 'react-native-markdown-display'),
      path.resolve(nodeModulesDir, 'react-native-typography'),
      path.resolve(nodeModulesDir, 'react-native-web', 'src')
    ],
    test: nodeModulesDir
  },
  test: /\.m?js$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      overrides: [
        {
          include: path.resolve(nodeModulesDir, '@hapi/joi'),
          plugins: ['@babel/plugin-transform-arrow-functions'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'commonjs',
                targets: {
                  ie: '11',
                  safari: '10'
                }
              }
            ]
          ]
        },
        {
          include: path.resolve(nodeModulesDir, 'query-string'),
          plugins: ['@babel/plugin-transform-arrow-functions'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'commonjs',
                targets: {
                  ie: '11',
                  safari: '10'
                }
              }
            ]
          ]
        }
      ],
      plugins: [
        // TODO BRN: Not sure if commonjs is needed here
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
}

export default babelLoader
