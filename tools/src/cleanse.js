import createContext from './createContext'
import { execPlugin } from './util'

const cleanse = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await execPlugin('clean', updatedContext)
  return execPlugin('cleanse', updatedContext)
}

export default cleanse
