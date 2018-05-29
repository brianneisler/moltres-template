const { pathExists } = require('fs-extra')
const { resolve } = require('path')

const MODULE_FILE_NAME = 'module.json'

const isModulePath = async (maybeModulePath) =>
  pathExists(resolve(maybeModulePath, MODULE_FILE_NAME))

module.exports = isModulePath
