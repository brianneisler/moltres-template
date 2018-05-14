import createContext from './createContext'
import { execPlugin } from './util'

const clean = async (options, context) => {
  const updatedContext = await createContext(options, context)
  return execPlugin('clean', updatedContext)
}

export default clean
