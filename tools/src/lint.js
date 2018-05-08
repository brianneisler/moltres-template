import createContext from './createContext'
import { lintProject } from './util'

const lint = async (options, context = createContext(options)) =>
  lintProject(context.project, context)

export default lint
