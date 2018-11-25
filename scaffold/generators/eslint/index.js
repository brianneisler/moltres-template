const configs = require('./configs')

const generator = {
  configs,
  files: [
    {
      configType: 'eslintrc',
      fileName: '.eslintrc.js'
    },
    {
      configType: 'eslintignore',
      fileName: '.eslintignore'
    }
  ]
}

module.exports = generator
