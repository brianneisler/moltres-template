import { createContext } from 'moltres'

const setupContext = (options = {}) =>
  createContext({
    ...process.env,
    NAMESPACE: options.namespace
  })

export default setupContext
