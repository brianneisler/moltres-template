import { createContext, getProject, runProject } from './util'

const run = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return runProject(project, context)
}

export default run
