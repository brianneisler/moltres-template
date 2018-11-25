const { contains } = require('ramda')

module.exports = (types) => ({
  devDependencies: {
    ...(contains('babelrc', types) ? {
      'babel-eslint': '^10.0.1'
    }: {}),
    'eslint': '^5.9.0',
    'eslint-plugin-import': '^2.14.0',
    'eslint-plugin-sort-imports-es6-autofix': '^0.3.0'
  }
})
