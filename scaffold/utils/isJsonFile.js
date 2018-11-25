const { extname } = require('path')

const isJsonFile = (path) => extname(path) === '.json'

module.exports = isJsonFile
