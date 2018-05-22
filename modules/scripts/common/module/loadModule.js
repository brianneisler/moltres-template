const { all } = require('bluebird')
const { pathExists } = require('fs-extra')
const { resolve } = require('path')
const { identity, map, memoizeWith } = require('ramda')
const loadModuleFile = require('./loadModuleFile')
const newModule = require('./newModule')

const MODULE_FILE_NAME = 'module.json'

const loadModule = memoizeWith(identity, async (modulePath, options = {}) => {
  // NOTE BRN: Assume that the modulesDir is one level above the module path
  const modulesDir = options.modulesDir || resolve(modulePath, '..')
  const filePath = resolve(modulePath, MODULE_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${MODULE_FILE_NAME} at ${modulePath}`)
  }
  const data = await loadModuleFile(filePath)
  const dependsOn = await all(map(
    (dependsOnPath) => loadModule(resolve(modulePath, dependsOnPath)),
    data.dependsOn || []
  ))
  return newModule({
    ...data,
    dependsOn,
    path: modulePath,
    modulesDir
  })
})

module.exports = loadModule
