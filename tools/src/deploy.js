import { createContext, deployProject, getProject } from './util'

const deploy = async (options) => {
  const context = createContext(options)
  const project = await getProject()
  return deployProject(project, context)
}

export default deploy
