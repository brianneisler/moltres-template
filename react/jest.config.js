module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [ 'src/**/*.js' ],
  moduleNameMapper: {
    'react-native': '<rootDir>/node_modules/react-native-web',
    'react-router-native': '<rootDir>/node_modules/react-router-dom'
  },
  preset: 'react-native',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
    'react-native-web/jest/serializer'
  ]
}
