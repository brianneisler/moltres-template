import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { isEmpty, isNil, memoize } from 'ramda'
import { PLUGIN_FILE_NAME } from '../constants'
import loadPluginFile from './loadPluginFile'
import newPlugin from './newPlugin'

const loadPlugin = memoize(async (pluginPath) => {
  const filePath = resolve(pluginPath, PLUGIN_FILE_NAME)
  if (!await pathExists(filePath)) {
    throw new Error(`Cannot find ${PLUGIN_FILE_NAME} at ${pluginPath}`)
  }
  const data = await loadPluginFile(filePath)
  let pluginExportPath = pluginPath
  if (!isNil(data.plugin) && !isEmpty(data.plugin)) {
    pluginExportPath = resolve(pluginExportPath, data.plugin)
  } else {
    pluginExportPath = resolve(resolve, 'index.js')
  }
  const pluginExport = require(pluginExportPath).default
  return newPlugin({
    ...data,
    path: pluginPath,
    plugin: pluginExport
  })
})

export default loadPlugin
