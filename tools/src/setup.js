import createContext from './createContext'
import { execPlugin } from './util'

const setup = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await execPlugin('setup', updatedContext)
  return execPlugin('build', updatedContext)
}

export default setup
