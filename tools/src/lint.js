import { createContext, getProject, lintProject } from './util'

const lint = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return lintProject(project, context)
}

export default lint
