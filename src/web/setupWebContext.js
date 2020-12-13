import { createContext } from 'moltres/context'
import { buildLocation } from 'moltres/url'

const setupWebContext = (config, history) =>
  createContext({
    config,
    history,
    // NOTE BRN: This namespace needs to be the same across all browser
    // tab instances. Otherwise each new browser tab instance has to log back in.
    namespace: 'web',
    source:
      typeof window === 'object'
        ? window.location.origin
        : buildLocation(config.api.url).origin
  })

export default setupWebContext
