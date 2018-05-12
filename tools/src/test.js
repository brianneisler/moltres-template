import createContext from './createContext'
import { testProject } from './plugins'
import { execContext } from './util'

const test = async (options, context = createContext(options)) =>
  execContext(testProject, context)

export default test
