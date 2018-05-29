import createContext from './createContext'
import { execWithPlugin, validateWithPlugin } from './util'

const deploy = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await validateWithPlugin('build', updatedContext)
  await execWithPlugin('build', updatedContext)
  await validateWithPlugin('deploy', updatedContext)
  return execWithPlugin('deploy', updatedContext)
}

export default deploy
