import createContext from './createContext'
import { cleanProject, cleanseProject } from './plugins'
import { execContext } from './util'

const cleanse = async (options, context = createContext(options)) => {
  await execContext(cleanProject, context)
  return execContext(cleanseProject, context)
}

export default cleanse
