import createContext from './createContext'
import { execPlugin } from './util'

const deploy = async (options, context = createContext(options)) => {
  await execPlugin('build', context)
  return execPlugin('deploy', context)
}

export default deploy
