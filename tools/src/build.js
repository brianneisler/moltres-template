import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const build = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('build', updatedContext)
  return execWithPlugin('build', updatedContext)
}

export default build
