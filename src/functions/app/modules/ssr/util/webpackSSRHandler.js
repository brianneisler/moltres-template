import { values, weakMemoize } from '../../../../../utils/data'
import templateHtml from './templateHtml'
import templateUnexpectedErrorHtml from './templateUnexpectedErrorHtml'

const loadSSRRenderer = weakMemoize(() => require('../../../../private/dist/index.ssr').default)
const loadManifest = weakMemoize(() => require('../../../../public/dist/manifest.json'))

const convertManifestToScripts = (manifest) => values(manifest)

const loadScripts = weakMemoize(() => convertManifestToScripts(loadManifest()))

const webpackSSRHandler = async (apiRequest, apiResponse) => {
  const { context } = apiRequest
  try {
    const renderSSR = loadSSRRenderer()
    const scripts = loadScripts()
    const { css, html, meta, response, state } = await renderSSR(apiRequest)

    if (response.redirect) {
      return apiResponse.redirect(response.statusCode, response.redirect)
    }

    // NOTE BRN: Expected errors (such as 403 and 404) that are returned on the
    // response are rendered by the App so we just render the usual html here...
    const output = templateHtml(context, {
      html,
      meta,
      response,
      scripts,
      state,
      styles: [css]
    })
    apiResponse.writeHead(response.statusCode, { 'Content-Type': 'text/html' })
    apiResponse.end(output)
  } catch (error) {
    context.logger.error(error)
    apiResponse.writeHead(500, { 'Content-Type': 'text/html' })
    apiResponse.end(
      templateUnexpectedErrorHtml(context, {
        error
      })
    )
  }
}

export default webpackSSRHandler
