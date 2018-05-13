import { props } from 'bluebird'
import { mapObjIndexed } from 'ramda'
import { loadPlugin } from './util'

const loadPlugins = async (plugins) => props(mapObjIndexed(
  (pluginPath) => loadPlugin(pluginPath),
  plugins
))

export default loadPlugins
