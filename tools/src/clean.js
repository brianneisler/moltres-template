import createContext from './createContext'
import { cleanProject } from './plugins'

const clean = async (options, context = createContext(options)) =>
  cleanProject(context.project, context)

export default clean
