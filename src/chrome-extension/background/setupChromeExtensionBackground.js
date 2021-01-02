import * as Sentry from '@sentry/browser'

import { loadProjectConfigSync } from '../../config'
import { generateEngine } from '../../core'
import setupChromeExtensionContext from '../setupChromeExtensionContext'

import * as modules from './modules'

const setupChromeExtensionBackground = () => {
  Error.stackTraceLimit = Infinity
  const config = loadProjectConfigSync({ target: 'web' })

  // TODO BRN: Can Sentry even start in a background extension like this?
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = setupChromeExtensionContext(config, {
    namespace: 'chrome-extension-background'
  })
  const initialState = {}
  generateEngine(modules, context, initialState)
}

export default setupChromeExtensionBackground
