import { asyncHandler } from '../../../../utils/express'
import { setupWebpackRouter, webpackSSRHandler } from './util'

const mod = {
  setupSSRRouter: (router, store) => {
    if (store.getConfig().core.debug) {
      return setupWebpackRouter(router)
    }
    // root (/) should always serve our server rendered page
    router.get('/', asyncHandler(webpackSSRHandler))
    router.get('/*', asyncHandler(webpackSSRHandler))
    return router
  }
}

export default mod
