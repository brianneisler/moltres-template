import { prop } from 'ramda'
import { DEFAULT_PLUGINS, findModules, getStage, loadExecGraph, newContext, newLogger } from './util'
import loadPlugins from './loadPlugins'


const createContext = async (options) => {
  const cwd = prop('cwd', options) || process.cwd()
  const logger = prop('logger', options) || newLogger()
  const plugins = prop('plugins', options) || await loadPlugins(DEFAULT_PLUGINS)
  const graph = await loadExecGraph(cwd)
  const stage = getStage(options)

  return newContext({
    cwd,
    graph,
    logger,
    plugins,
    stage
  })
}

export default createContext
