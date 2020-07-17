import express from 'express'

import { setupMiddleware } from './util'

const mod = () => {
  let app
  return {
    getApp: () => {
      return app
    },
    setup: (store) => {
      app = express()

      // NOTE BRN: This defines the order of setting up of the middleware. If a
      // module is not included here it's middleware will not be setup. We do this
      // because we need to control the order of how the middlewears from this
      // module are wrapped together.
      const moduleOrder = [
        'logger',
        'context',
        'cors',
        'urlencoded',
        'auth',
        'router',
        'error_logger',
        'error'
      ]

      setupMiddleware(store, app, moduleOrder)

      if (store.getConfig().core.debug) {
        app.set('json spaces', 2)
      }
    }
  }
}

export default mod
