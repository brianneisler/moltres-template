import createContext from './createContext'
import { cleanProject } from './util'

const clean = async (options, context = createContext(options)) =>
  cleanProject(context.project, context)

export default clean
