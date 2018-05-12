import { findModules, getStage, loadProject, newContext, newProjectGraph } from './util'

const createContext = async (options) => {
  const { logger, plugins } = options
  const cwd = process.cwd()
  const project = await loadProject(cwd)
  const graph = newProjectGraph(project)
  const stage = getStage(options)

  return newContext({
    cwd,
    graph,
    logger,
    plugins,
    project,
    stage
  })
}

export default createContext
