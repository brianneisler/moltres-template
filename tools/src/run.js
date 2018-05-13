import createContext from './createContext'
import { execPlugin } from './util'

const run = async (options, context = createContext(options)) =>
  execPlugin('run', context)

export default run
