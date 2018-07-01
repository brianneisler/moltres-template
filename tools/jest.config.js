module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  testMatch: ['**/+(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}
