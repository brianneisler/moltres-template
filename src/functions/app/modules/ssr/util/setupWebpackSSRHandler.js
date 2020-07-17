import loadEarlyScripts from './loadEarlyScripts'
import loadSSRRenderer from './loadSSRRenderer'
import loadScripts from './loadScripts'
import templateHtml from './templateHtml'
import templateUnexpectedErrorHtml from './templateUnexpectedErrorHtml'

const setupWebpackSSRHandler = (store) => async (apiRequest, apiResponse) => {
  const { context } = apiRequest
  try {
    const renderSSR = loadSSRRenderer()
    const { css, html, meta, response, state } = await renderSSR(apiRequest)

    if (response.redirect) {
      return apiResponse.redirect(response.statusCode, response.redirect)
    }

    const scripts = await loadScripts(context, store)
    const earlyScripts = await loadEarlyScripts(context, store)

    // NOTE BRN: Expected errors (such as 403 and 404) that are returned on the
    // response are rendered by the App so we just render the usual html here...
    const output = templateHtml(context, {
      earlyScripts,
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

export default setupWebpackSSRHandler
