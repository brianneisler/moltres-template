import createContext from './createContext'
import { deployProject, setupProject } from './plugins'
import { execContext } from './util'

const deploy = async (options, context = createContext(options)) => {
  await execContext(buildProject, context)
  return execContext(deployProject, context)
}

export default deploy
