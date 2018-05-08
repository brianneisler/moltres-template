import createContext from './createContext'
import { startProject } from './util'

const start = async (options, context = createContext(options)) =>
  startProject(context.project, context)

export default start
