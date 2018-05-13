import createContext from './createContext'
import { execPlugin } from './util'

const lint = async (options, context = createContext(options)) =>
  execPlugin('lint', context)

export default lint
