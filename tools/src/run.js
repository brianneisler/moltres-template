import createContext from './createContext'
import { execPlugin } from './util'

const run = async (options, context) => {
  const updatedContext = await createContext(options, context)
  return execPlugin('run', updatedContext)
}

export default run
