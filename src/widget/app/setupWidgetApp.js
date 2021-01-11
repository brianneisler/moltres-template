import * as Sentry from '@sentry/browser'
import { AppRegistry } from 'react-native'

import { App } from '../../app'
import * as appModules from '../../app/modules'
import { loadProjectConfigSync } from '../../config'
import { generateEngine } from '../../core'
import * as commonModules from '../../modules'
import { createHistory } from '../../utils/react'

import * as widgetModules from './modules'
import setupWidgetContext from './setupWidgetContext'

const setupWidgetApp = () => {
  Error.stackTraceLimit = Infinity
  const rootTag = document.getElementById('root')
  const history = createHistory()
  const config = loadProjectConfigSync({ target: 'web' })
  const modules = {
    ...commonModules,
    ...appModules,
    ...widgetModules
  }

  // TODO BRN: This is here because it needs to start as early as possible. Not
  // as clean as having it in a module though... :/
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = setupWidgetContext(config, {
    history
  })
  const initialState = window.__INITIAL_STATE__
  // Allow the SSR generated initial state to be garbage-collected
  delete window.__INITIAL_STATE__
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

export default setupWidgetApp
