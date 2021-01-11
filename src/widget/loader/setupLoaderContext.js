import createContext from '../../context/createContext'
import { buildLocation } from '../../utils/url'

const setupLoaderContext = (config, { history }) =>
  createContext({
    config,
    history,
    namespace: 'widget-loader',
    source:
      typeof window === 'object'
        ? window.location.origin
        : buildLocation(config.api.url).origin
  })

export default setupLoaderContext
