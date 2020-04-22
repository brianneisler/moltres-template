import { isArray, isObject } from '../../../../../utils/data'
import templateHtml from './templateHtml'

const normalizeAssets = (assets) => {
  if (isObject(assets)) {
    return Object.values(assets)
  }
  return isArray(assets) ? assets : [assets]
}

const webpackDevelopmentHandler = (request, response) => {
  const { assetsByChunkName } = response.locals.webpackStats.toJson()
  const { fs } = response.locals
  const { outputPath } = response.locals.webpackStats.toJson()

  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(
    templateHtml(request.context, {
      scripts: normalizeAssets(assetsByChunkName.main)
        .filter((wpath) => wpath.endsWith('.js'))
        .map((wpath) => '/' + wpath),
      styles: normalizeAssets(assetsByChunkName.main)
        .filter((wpath) => wpath.endsWith('.css'))
        .map((wpath) => fs.readFileSync(outputPath + '/' + wpath))
    })
  )
}

let middleware
let webpack
let webpackDevelopmentConfig
const setupWebpackRouter = (router) => {
  // NOTE BRN: These are required this way to avoid them being packaged into the
  // production deployment
  if (!middleware) {
    middleware = require('webpack-dev-middleware')
  }
  if (!webpack) {
    webpack = require('webpack')
  }
  if (!webpackDevelopmentConfig) {
    webpackDevelopmentConfig = require('../../../../../webpack/config/webpack.development.config')
  }
  const compiler = webpack(webpackDevelopmentConfig(process.env))
  const webpackMiddleware = middleware(compiler, { lazy: true, serverSideRender: true })

  // root (/) should always serve our server rendered page
  router.get('/', webpackMiddleware, webpackDevelopmentHandler)
  router.get('/*', webpackMiddleware, webpackDevelopmentHandler)
  return router
}

export default setupWebpackRouter
