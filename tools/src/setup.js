import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const setup = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('setup', updatedContext)
  return execWithPlugin('setup', updatedContext)
}

export default setup
