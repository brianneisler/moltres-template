import { createContext, getProject, startProject } from './util'

const start = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return startProject(project, context)
}

export default start
