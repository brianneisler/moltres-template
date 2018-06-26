module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [ 'src/**/*.js' ],
  testMatch: [ '**/__tests__/**/*.js?(x)', '**/+(*.)+(spec|test).js?(x)' ],
  testPathIgnorePatterns: [ '/node_modules/', '/dist/' ]
}
