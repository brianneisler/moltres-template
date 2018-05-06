import { buildProject, createContext, getProject, setupProject } from './util'

const setup = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  await setupProject(project, context)
  return buildProject(project, context)
}

export default setup
