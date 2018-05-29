import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const cleanse = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('clean', updatedContext)
  await execWithPlugin('clean', updatedContext)
  await validateWithPlugin('cleanse', updatedContext)
  return execWithPlugin('cleanse', updatedContext)
}

export default cleanse
