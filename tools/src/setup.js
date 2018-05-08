import createContext from './createContext'
import { buildProject, setupProject } from './util'

const setup = async (options, context = createContext(options)) => {
  await setupProject(context.project, context)
  return buildProject(context.project, context)
}

export default setup
