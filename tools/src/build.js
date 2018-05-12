import createContext from './createContext'
import { buildProject } from './plugins'
import { execContext } from './util'

const build = async (options, context = createContext(options)) =>
  execContext(buildProject, context)

export default build
