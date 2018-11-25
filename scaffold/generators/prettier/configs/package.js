const { contains } = require('ramda')

module.exports = (types) => ({
  devDependencies: {
    ...(contains('eslintrc', types) ? {
      'eslint-config-prettier': '^3.3.0',
      'eslint-plugin-prettier': '^3.0.0'
    }: {}),
    'prettier': '^1.15.2'
  }
})
