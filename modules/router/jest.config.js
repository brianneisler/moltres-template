module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [ 'src/**/*.js' ],
  moduleNameMapper: {
    'react-native': '<rootDir>/node_modules/react-native-web'
  },
  preset: 'react-native'
}
