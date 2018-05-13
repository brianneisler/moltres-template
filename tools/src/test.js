import createContext from './createContext'
import { execPlugin } from './util'

const test = async (options, context = createContext(options)) =>
  execPlugin('test', context)

export default test
