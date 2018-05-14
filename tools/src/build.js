import createContext from './createContext'
import { execPlugin } from './util'

const build = async (options, context) => {
  const updatedContext = await createContext(options, context)
  return execPlugin('build', updatedContext)
}

export default build
