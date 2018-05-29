import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const lint = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('lint', updatedContext)
  return execWithPlugin('lint', updatedContext)
}

export default lint
