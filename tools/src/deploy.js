import createContext from './createContext'
import { execPlugin } from './util'

const deploy = async (options, context) => {
  const updatedContext = await createContext(options, context)
  await execPlugin('build', updatedContext)
  return execPlugin('deploy', updatedContext)
}

export default deploy
