import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { MODULE_FILE_NAME } from '../constants'
import loadModuleFile from './loadModuleFile'
import newModule from './newModule'

const loadModule = async (modulesDir, moduleDirName) => {
  const modulePath = resolve(modulesDir, moduleDirName)
  const filePath = resolve(modulePath, MODULE_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${MODULE_FILE_NAME} at ${modulePath}`)
  }
  const data = await loadModuleFile(filePath)
  return newModule({
    ...data,
    path: modulePath,
    modulesDir
  })
}

export default loadModule
