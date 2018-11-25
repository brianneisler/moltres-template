const { extname } = require('path')

const isJsFile = (path) => extname(path) === '.js'

module.exports = isJsFile
