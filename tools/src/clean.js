import createContext from './createContext'
import { execPlugin } from './util'

const clean = async (options, context = createContext(options)) =>
  execPlugin('clean', context)

export default clean
