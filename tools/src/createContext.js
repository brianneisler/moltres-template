import { findPath, is, prop } from 'moltres-utils'
import { resolve } from 'path'
import { DEFAULT_PLUGINS, findModules, getStage, loadExecGraph, newContext, newLogger } from './util'
import loadEnv from './loadEnv'
import loadPlugins from './loadPlugins'

const createContext = async (options) => {
  const cwd = resolve(findPath(
    prop('cwd', options),
    prop('path', options),
    process.cwd()
  ))
  const logger = prop('logger', options) || newLogger()
  const plugins = prop('plugins', options) || await loadPlugins(DEFAULT_PLUGINS)
  const graph = await loadExecGraph(cwd)
  const stage = getStage(options)

  let env = prop('env', options) || '.'
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
