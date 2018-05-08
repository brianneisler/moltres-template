import createContext from './createContext'
import { buildProject } from './plugins'

const build = async (options, context = createContext(options)) =>
  buildProject(context.project, context)

export default build
