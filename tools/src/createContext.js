import { loadEnv } from 'moltres-utils'
import { is, prop } from 'ramda'
import { DEFAULT_PLUGINS, findModules, getStage, loadExecGraph, newContext, newLogger } from './util'
import loadPlugins from './loadPlugins'

const createContext = async (options, context) => {
  const cwd = prop('cwd', options) || prop('cwd', context) || process.cwd()
  const logger = prop('logger', options) || prop('logger', context) || newLogger()
  const plugins = prop('plugins', options) || prop('plugins', context) || await loadPlugins(DEFAULT_PLUGINS)
  const graph = await loadExecGraph(cwd)
  const stage = getStage(options)
  let env = prop('env', options) || prop('env', context) || '.'
  if (is(String, env)) {
    env = loadEnv(env, { cwd, stage })
  }

  return newContext({
    cwd,
    env,
    graph,
    logger,
    plugins,
    stage
  })
}

export default createContext
