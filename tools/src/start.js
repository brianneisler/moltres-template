import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const start = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('start', updatedContext)
  return execWithPlugin('start', updatedContext)
}

export default start
