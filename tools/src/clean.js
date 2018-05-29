import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const clean = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('clean', updatedContext)
  return execWithPlugin('clean', updatedContext)
}

export default clean
