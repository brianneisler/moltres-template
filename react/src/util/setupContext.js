import { createContext } from 'moltres'
import env from 'react-native-config'

const setupContext = (options = {}) =>
  createContext({
    ...process.env,
    ...env,
    NAMESPACE: options.namespace
  })

export default setupContext
