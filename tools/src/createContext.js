import { findModules, getStage, loadProject, newContext } from './util'

const createContext = async (options) => {
  const { logger, plugins } = options
  const cwd = process.cwd()
  const project = await loadProject(cwd)
  const stage = getStage(options)

  return newContext({
    cwd,
    logger,
    plugins,
    project,
    stage
  })
}

export default createContext
