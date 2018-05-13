import createContext from './createContext'
import { execPlugin } from './util'

const start = async (options, context = createContext(options)) =>
  execPlugin('start', context)

export default start
