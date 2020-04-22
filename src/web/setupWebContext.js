import { parseURL } from '../utils/url'
import createContext from '../context/createContext'

const setupWebContext = (config, history) =>
  createContext({
    config,
    history,
    // NOTE BRN: This namespace needs to be the same across all browser
    // tab instances. Otherwise each new browser tab instance has to log back in.
    namespace: 'web',
    source: typeof window === 'object' ? window.location.origin : parseURL(config.api.url).origin
  })

export default setupWebContext
