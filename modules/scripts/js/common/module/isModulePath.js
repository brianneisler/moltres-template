import { pathExists } from 'fs-extra'
import { resolve } from 'path'

const MODULE_FILE_NAME = 'module.json'

const isModulePath = async (maybeModulePath) =>
  pathExists(resolve(maybeModulePath, MODULE_FILE_NAME))

export default isModulePath
