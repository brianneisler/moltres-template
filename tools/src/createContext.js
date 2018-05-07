import { findModules, getStage, loadProject } from './util'

const createContext = async (options) => {
  const { plugins } = options
  const cwd = process.cwd()
  const project = await loadProject(cwd)
  const stage = getStage(options)

  return {
    cwd,
    plugins,
    project,
    stage
  }
}

export default createContext
