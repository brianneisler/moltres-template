import createContext from './createContext'
import { execPlugin } from './util'

const setup = async (options, context = createContext(options)) => {
  await execPlugin('setup', context)
  return execPlugin('build', context)
}

export default setup
