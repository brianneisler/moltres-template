import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const run = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('run', updatedContext)
  return execWithPlugin('run', updatedContext)
}

export default run
