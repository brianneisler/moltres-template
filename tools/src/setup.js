import createContext from './createContext'
import { buildProject, setupProject } from './plugins'
import { execContext } from './util'

const setup = async (options, context = createContext(options)) => {
  await execContext(setupProject, context)
  return execContext(buildProject, context)
}

export default setup
