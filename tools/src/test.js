import createContext from './createContext'
import { testProject } from './plugins'

const test = async (options, context = createContext(options)) =>
  testProject(context.project, context)

export default test
