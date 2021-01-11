import createContext from '../../context/createContext'
import { buildLocation } from '../../utils/url'

const setupWidgetContext = (config, { history }) =>
  createContext({
    config,
    history,
    namespace: 'widget',
    source:
      typeof window === 'object'
        ? window.location.origin
        : buildLocation(config.api.url).origin
  })

export default setupWidgetContext
