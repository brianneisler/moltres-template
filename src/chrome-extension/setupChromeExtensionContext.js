import createContext from '../context/createContext'

const setupChromeExtensionContext = (config, context = {}) =>
  createContext({
    ...context,
    config,
    // NOTE BRN: This namespace needs to be the same across all browser
    // tab instances. Otherwise each new browser tab instance has to log back in.
    source: 'chrome://extensions'
  })

export default setupChromeExtensionContext
