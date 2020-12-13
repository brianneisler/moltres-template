import { createContext } from 'moltres/context'

const setupSdkContext = (config) =>
  createContext({
    config,
    namespace: 'sdk',
    source: `${config.api.url}/sdk`
  })

export default setupSdkContext
