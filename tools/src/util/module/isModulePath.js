import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { MODULE_FILE_NAME } from '../constants'

const isModulePath = async (maybeModulePath) =>
  pathExists(resolve(maybeModulePath, MODULE_FILE_NAME))

export default isModulePath
