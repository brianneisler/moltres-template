// import * as serviceWorker from './sdkWorker'
import * as Sentry from '@sentry/browser'
import { AppRegistry } from 'react-native'

import { App } from '../app'
import * as modules from '../app/modules'
import { loadProjectConfigSync } from '../config'
import { generateEngine } from '../core'
import { createHistory } from '../utils/react'

import setupWebContext from './setupWebContext'

const setupWebApp = () => {
  const rootTag = document.getElementById('root')
  const history = createHistory()
  const config = loadProjectConfigSync({ target: 'web' })

  // TODO BRN: This is here because it needs to start as early as possible. Not
  // as clean as having it in a module though... :/
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = setupWebContext(config, history)
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

  // // If you want your app to work offline and load faster, you can change
  // // unregister() to register() below. Note this comes with some pitfalls.
  // // Learn more about service workers: http://bit.ly/CRA-PWA
  // serviceWorker.unregister()
}

export default setupWebApp
