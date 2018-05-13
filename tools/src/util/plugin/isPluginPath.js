import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { PLUGIN_FILE_NAME } from '../constants'

const isPluginPath = async (maybePluginPath) =>
  pathExists(resolve(maybePluginPath, PLUGIN_FILE_NAME))

export default isPluginPath
