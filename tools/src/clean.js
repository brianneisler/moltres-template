import { cleanProject, createContext, getProject } from './util'

const clean = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return cleanProject(project, context)
}

export default clean
