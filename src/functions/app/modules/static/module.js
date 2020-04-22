import { resolve } from '../../../../utils/path'
import { serveStatic } from '../../../../utils/express'

const mod = {
  setupStaticRouter: (router) => {
    // other static resources should just be served as they are
    // NOTE BRN: This only provides files that are not part of the public folder
    // that is uploaded to the firebase CDN (at the moment ALL files are uploaded
    // to the CDN so this really handles nothing...)
    router.use(
      serveStatic(resolve(__dirname, '..', '..', '..', '..', '..', 'public'))
      // serveStatic(path.resolve(__dirname, '..', '..', '..', '..', '..', 'public'), {
      //   cacheControl: true,
      //   immutable: true,
      //   maxAge: '1y'
      // })
    )
    return router
  }
}

export default mod