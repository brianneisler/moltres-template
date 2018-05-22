const { all } = require('bluebird')
const { pathExists, readdir } = reqire('fs-extra')
const { resolve } from 'path'
const { assoc, indexBy, map, prop } = require('ramda')
const compact = require('../data/compact')
const isModulePath = require('./isModulePath')
const loadModule = require('./loadModule')

const findModules = async (path) => {
  const modulesDir = resolve(path, MODULES_DIR_NAME)
  if (await pathExists(modulesDir)) {
    const moduleDirNames = await readdir(modulesDir)
    const loadedModules = await all(map(async (moduleDirName) => {
      const modulePath = resolve(modulesDir, moduleDirName)
      if (await isModulePath(modulePath)) {
        return loadModule(modulePath, { modulesDir })
      }
      return null
    }, moduleDirNames))
    return indexBy(prop('name'), compact(loadedModules))
  }
  return {}
}

module.exports = findModules
