import createContext from './createContext'
import { buildProject } from './util'

const build = async (options, context = createContext(options)) =>
  buildProject(context.project, context)

export default build
