// import * as serviceWorker from './sdkWorker'
import * as Sentry from '@sentry/browser'
import * as modules from '../app/modules'
import { App, generateConfig } from '../app'
import { AppRegistry } from 'react-native'
import { createHistory } from '../utils/react'
import { generateEngine } from '../core'
import setupWebContext from './setupWebContext'

const setupWebApp = () => {
  const rootTag = document.getElementById('root')
  const history = createHistory()
  const config = generateConfig()

  // TODO BRN: This is here because it needs to start as early as possible. Not
  // as clean as having it in a module though... :/
  if (config.sentry) {
    Sentry.init(config.sentry)
  }

  const context = setupWebContext(config, history)
  const initialState = window.__INITIAL_STATE__
  // Allow the SSR generated initial state to be garbage-collected
  delete window.__INITIAL_STATE__
  const store = generateEngine(modules, config, context, initialState)

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
