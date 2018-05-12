import createContext from './createContext'
import { cleanProject } from './plugins'
import { execContext } from './util'

const clean = async (options, context = createContext(options)) =>
  execContext(cleanProject, context)

export default clean
