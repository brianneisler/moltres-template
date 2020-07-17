import { asyncHandler } from '../../../../utils/express'
import { map, values, weakMemoize } from '../../../../utils/lang'

import { setupWebpackRouter, setupWebpackSSRHandler } from './util'

const createInitialStateScript = (context, { state }) => ({
  content: `window.__INITIAL_STATE__ = ${
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // https://redux.js.org/recipes/server-rendering/#security-considerations
    JSON.stringify(state).replace(/</g, '\\u003c')
  }`
})

const loadManifest = weakMemoize((context) =>
  require(`${context.config.ssr.outputPath}/manifest.json`)
)

const convertManifestToScripts = (manifest) =>
  map((path) => ({ props: { src: path } }), values(manifest))

const mod = {
  loadScripts: weakMemoize((context) => [
    { create: createInitialStateScript },
    ...convertManifestToScripts(loadManifest(context))
  ]),
  setupSSRRouter: (router, store) => {
    const webpackSSRHandler = setupWebpackSSRHandler(store)
    // root (/) should always serve our server rendered page
    router.get('/', asyncHandler(webpackSSRHandler))
    router.get('/*', asyncHandler(webpackSSRHandler))
    return router
  }
}

export default mod
