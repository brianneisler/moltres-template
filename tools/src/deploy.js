import createContext from './createContext'
import { deployProject, setupProject } from './plugins'

const deploy = async (options, context = createContext(options)) => {
  await buildProject(context.project, context)
  return deployProject(context.project, context)
}

export default deploy
