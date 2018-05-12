import createContext from './createContext'
import { startProject } from './plugins'
import { execContext } from './util'

const start = async (options, context = createContext(options)) =>
  execContext(startProject, context)

export default start
