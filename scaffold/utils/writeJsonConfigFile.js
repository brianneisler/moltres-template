const { ensureFile, writeFile } = require('fs-extra')

const writeJsonConfigFile = async (config, filePath) => {
  await ensureFile(filePath)
  return writeFile(filePath, JSON.stringify(config, null, 2))
}

module.exports = writeJsonConfigFile
