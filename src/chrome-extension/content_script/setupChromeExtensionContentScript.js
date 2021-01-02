import * as Sentry from '@sentry/browser'

import { loadProjectConfigSync } from '../../config'
import { createContext, generateEngine } from '../../core'

import * as modules from './modules'

const setupChromeExtensionContentScript = ({ frameId, tabId }) => {
  Error.stackTraceLimit = Infinity
  const config = loadProjectConfigSync({ target: 'web' })

  // TODO BRN: This is here because it needs to start as early as possible. Not
  // as clean as having it in a module though... :/
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = createContext({
    config: {
      ...config,
      frameId,
      tabId
    },
    namespace: `content-script:${tabId}:${frameId}`,
    source: `chrome://extensions?tabId=${tabId}&frameId=${frameId}`
  })
  const initialState = {}
  generateEngine(modules, context, initialState)
}

export default setupChromeExtensionContentScript
