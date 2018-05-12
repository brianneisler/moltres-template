import createContext from './createContext'
import { runProject } from './plugins'
import { execContext } from './util'

const run = async (options, context = createContext(options)) =>
  execContext(runProject, context)

export default run
