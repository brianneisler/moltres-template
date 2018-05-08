import { all } from 'bluebird'
import { pathExists, readdir } from 'fs-extra'
import { compact } from 'moltres-utils'
import { resolve } from 'path'
import { assoc, indexBy, map, prop } from 'ramda'
import { MODULES_DIR_NAME } from '../constants'
import isModulePath from './isModulePath'
import loadModule from './loadModule'

const findModules = async (path) => {
  const modulesDir = resolve(path, MODULES_DIR_NAME)
  if (await pathExists(modulesDir)) {
    const moduleDirNames = await readdir(modulesDir)
    const loadedModules = await all(map(async (moduleDirName) => {
      const modulePath = resolve(modulesDir, moduleDirName)
      if (await isModulePath(modulePath)) {
        return loadModule(modulesDir, moduleDirName)
      }
      return null
    }, moduleDirNames))
    return indexBy(prop('name'), compact(loadedModules))
  }
  return {}
}

export default findModules
