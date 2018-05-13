import createContext from './createContext'
import { execPlugin } from './util'

const cleanse = async (options, context = createContext(options)) => {
  await execPlugin('clean', context)
  return execPlugin('cleanse', context)
}

export default cleanse
