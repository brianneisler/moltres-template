import createContext from './createContext'
import { lintProject } from './plugins'
import { execContext } from './util'

const lint = async (options, context = createContext(options)) =>
  execContext(lintProject, context)

export default lint
