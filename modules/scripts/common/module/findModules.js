import { all } from 'bluebird'
import { pathExists, readdir } from 'fs-extra'
import { resolve } from 'path'
import { assoc, indexBy, map, prop } from 'ramda'
import compact from '../data/compact'
import isModulePath from './isModulePath'
import loadModule from './loadModule'

const MODULES_DIR_NAME = 'modules'

const findModules = async (modulesDir) => {
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

export default findModules
