import createContext from './createContext'
import { setupProject, deployProject } from './util'

const deploy = async (options, context = createContext(options)) => {
  await buildProject(context.project, context)
  return deployProject(context.project, context)
}

export default deploy
