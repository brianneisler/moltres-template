import createContext from '../context/createContext'

const setupSdkContext = (config) =>
  createContext({
    config,
    namespace: 'sdk',
    source: `${config.api.url}/sdk`
  })

export default setupSdkContext
