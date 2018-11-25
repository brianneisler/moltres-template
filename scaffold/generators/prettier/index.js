module.exports = {
  configs: require('./configs'),
  files: [
    {
      configType: 'prettier_config',
      fileName: 'prettier.config.js'
    },
    {
      configType: 'prettierignore',
      fileName: '.prettierignore'
    }
  ]
}
