import * as Sentry from '@sentry/browser'
import { AppRegistry } from 'react-native'

import { App } from '../../app'
import * as modules from '../../app/modules'
import { loadProjectConfigSync } from '../../config'
import { generateEngine } from '../../core'
import { createHistory } from '../../utils/react'
import setupChromeExtensionContext from '../setupChromeExtensionContext'

const setupChromeExtensionApp = () => {
  Error.stackTraceLimit = Infinity
  const rootTag = document.getElementById('root')
  const history = createHistory()
  const config = loadProjectConfigSync({ target: 'web' })

  // TODO BRN: This is here because it needs to start as early as possible. Not
  // as clean as having it in a module though... :/
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = setupChromeExtensionContext(config, {
    history,
    namespace: 'chrome-extension-app'
  })
  const initialState = {}
  const store = generateEngine(modules, context, initialState)

  AppRegistry.registerComponent('App', () => App)
  AppRegistry.runApplication('App', {
    initialProps: {
      history,
      store
    },
    rootTag
  })
}

export default setupChromeExtensionApp
