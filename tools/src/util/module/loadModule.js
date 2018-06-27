import { all } from 'bluebird'
import { pathExists } from 'fs-extra'
import { identity, map, memoizeWith } from 'moltres-utils'
import { resolve } from 'path'
import { MODULE_FILE_NAME } from '../constants'
import loadModuleFile from './loadModuleFile'
import newModule from './newModule'

const loadModule = memoizeWith(identity, async (modulePath, options = {}) => {
  // NOTE BRN: Assume that the modulesDir is one level above the module path
  const modulesDir = options.modulesDir || resolve(modulePath, '..')
  const filePath = resolve(modulePath, MODULE_FILE_NAME)
  if (!(await pathExists(filePath))) {
    throw new Error(`Cannot find ${MODULE_FILE_NAME} at ${modulePath}`)
  }
  const data = await loadModuleFile(filePath)
  const dependsOn = await all(
    map((dependsOnPath) => loadModule(resolve(modulePath, dependsOnPath)), data.dependsOn || [])
  )
  return newModule({
    ...data,
    dependsOn,
    path: modulePath,
    modulesDir
  })
})

export default loadModule
