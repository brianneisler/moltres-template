import createContext from './createContext'
import { execPlugin } from './util'

const test = async (options, context) => {
  const updatedContext = await createContext(options, context)
  return execPlugin('test', updatedContext)
}

export default test
