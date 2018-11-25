const { ensureFile, writeFile } = require('fs-extra')

const writeJsConfigFile = async (configType, filePath) => {
  await ensureFile(filePath)
  return writeFile(filePath,
`const { scaffold } = require('scaffold')

module.exports = scaffold().config('${configType}')
`)
}

module.exports = writeJsConfigFile
