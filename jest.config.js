const defaults = {
  collectCoverageFrom: ['**/*.{js}'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^react-native$': 'react-native-web'
  },
  preset: 'react-native-web',
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/.jest.init.js'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js',
    '<rootDir>/**/?(*.)(spec|test).js'
  ],
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$']
}

module.exports = {
  projects: [
    {
      ...defaults,
      displayName: 'base',
      globals: {
        TEST_TARGET: 'function'
      },
      moduleFileExtensions: ['js', 'json'],
      testEnvironment: 'node'
    },
    // TODO BRN: Need to figure this out. Right now when we set this up it
    // overrides the loadConfig methods to the web based ones which use memfs.
    // However, nothing is loaded into memfs so there's no way of loading the
    // configs and booting up the context properly. Plus, the test system
    // requires access to the admin contexts for some setup which web will never
    // need. Almost seems that we need access to two separate environments. The
    // "web" one when running the tests and the "test" one when setting up tests.
    // {
    //   ...defaults,
    //   displayName: 'web',
    //   globals: {
    //     TEST_TARGET: 'web'
    //   },
    //   moduleFileExtensions: ['web.js', 'js', 'json'],
    //   testEnvironment: 'jsdom',
    //   testURL: 'http://localhost'
    // },
    {
      ...defaults,
      displayName: 'ssr',
      globals: {
        TEST_TARGET: 'ssr'
      },
      moduleFileExtensions: ['ssr.js', 'web.js', 'js', 'json'],
      testEnvironment: 'node'
    }
  ]
}
