import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { MODULE_FILE_NAME } from '../constants'
import defineModule from './defineModule'
import loadModuleFile from './loadModuleFile'

const loadModule = async (modulePath) => {
  const filePath = resolve(modulePath, MODULE_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${MODULE_FILE_NAME} at ${modulePath}`)
  }
  const data = await loadModuleFile(filePath)
  return defineModule(data)
}

export default loadModule
