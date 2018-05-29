import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const setup = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('setup', updatedContext)
  await execWithPlugin('setup', updatedContext)
  await validateWithPlugin('build', updatedContext)
  return execWithPlugin('build', updatedContext)
}

export default setup
