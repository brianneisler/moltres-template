import createContext from './createContext'
import { execPlugin } from './util'

const build = async (options, context = createContext(options)) =>
  execPlugin('build', context)

export default build
