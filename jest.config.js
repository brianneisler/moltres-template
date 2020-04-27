module.exports = {
  collectCoverageFrom: ['**/*.{js}'],
  maxConcurrency: 4,
  moduleFileExtensions: ['ssr.js', 'web.js', 'js', 'json'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^react-native$': 'react-native-web'
  },
  preset: 'react-native-web',
  resolver: 'jest-pnp-resolver',
  setupFiles: ['react-app-polyfill/jsdom'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/__tests__/**/*.js', '<rootDir>/**/?(*.)(spec|test).js'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$']
}
