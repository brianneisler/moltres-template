import createContext from './createContext'
import { runProject } from './plugins'

const run = async (options, context = createContext(options)) =>
  runProject(context.project, context)

export default run
