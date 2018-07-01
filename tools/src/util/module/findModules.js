import { all } from 'bluebird'
import { pathExists, readdir } from 'fs-extra'
import { compact, indexBy, map, prop } from 'moltres-utils'
import { resolve } from 'path'
import { MODULES_DIR_NAME } from '../constants'
import isModulePath from './isModulePath'
import loadModule from './loadModule'

const findModules = async (path) => {
  const modulesDirPath = resolve(path, MODULES_DIR_NAME)
  if (await pathExists(modulesDirPath)) {
    const moduleDirNames = await readdir(modulesDirPath)
    const loadedModules = await all(
      map(async (moduleDirName) => {
        const modulePath = resolve(modulesDirPath, moduleDirName)
        if (await isModulePath(modulePath)) {
          return loadModule(modulePath, { modulesDir: modulesDirPath })
        }
        return null
      }, moduleDirNames)
    )
    return indexBy(prop('name'), compact(loadedModules))
  }
  return {}
}

export default findModules
