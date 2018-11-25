const { contains } = require('ramda')

module.exports = (types) => ({
  devDependencies: {
    ...(contains('babelrc', types) ? {
      'babel-core': '^7.0.0-bridge.0',
      'babel-jest': '^23.6.0'
    }: {}),
    'jest': '^23.6.0'
  }
})
