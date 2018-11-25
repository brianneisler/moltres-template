const { contains } = require('ramda')

const config = (types) => ({
  devDependencies: {
    ...(contains('babel', types) ? {
      'babel-core': '^7.0.0-bridge.0',
      'babel-jest': '^23.6.0'
    }: {}),
    'jest': '^23.6.0'
  }
})

module.exports = config
