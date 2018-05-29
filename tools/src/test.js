import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const test = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('test', updatedContext)
  return execWithPlugin('test', updatedContext)
}

export default test
