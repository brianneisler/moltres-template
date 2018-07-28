module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/+(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}
