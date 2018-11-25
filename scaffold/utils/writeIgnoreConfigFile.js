const { ensureFile, writeFile } = require('fs-extra')
const { join } = require('ramda')

const writeIgnoreConfigFile = async (config, filePath) => {
  await ensureFile(filePath)
  return writeFile(filePath, `${join('\n', config)}\n`)
}

module.exports = writeIgnoreConfigFile
