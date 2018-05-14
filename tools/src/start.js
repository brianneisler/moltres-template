import createContext from './createContext'
import { execPlugin } from './util'

const start = async (options, context) => {
  const updatedContext = await createContext(options, context)
  return execPlugin('start', updatedContext)
}

export default start
