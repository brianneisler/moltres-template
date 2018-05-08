import createContext from './createContext'
import { lintProject } from './plugins'

const lint = async (options, context = createContext(options)) =>
  lintProject(context.project, context)

export default lint
