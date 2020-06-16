import * as modules from '../app/modules'
import { App, generateConfig } from '../app'
import { AppRegistry } from 'react-native-web'
import {
  cacheMethod,
  isArray,
  isFunction,
  isImmutable,
  isObject,
  omit,
  walkMap
} from '../utils/data'
import { createEngine, selectUncaughtException, setup, start } from '../core'
import { createHistory } from '../utils/react'
import { locationChangeAction } from '../app/modules/router/actions'
import { parseURL } from '../utils/url'
import { selectRouterResponse } from '../app/modules/router'
import MetaTagsServer from 'react-meta-tags/server'
import ReactDOMServer from 'react-dom/server'
import setupSSRContext from './setupSSRContext'

// This code is based on SSR for react-native-web
// https://github.com/necolas/react-native-web/blob/master/docs/guides/server-side-rendering.md

const filterState = (state) => {
  // NOTE BRN: Filter the state for any values that we don't want to
  // send to the client side. Also filter any values that are complex objects.
  return {
    query: walkMap((value) => {
      if (isImmutable(value)) {
        value = value.toJSON()
      }
      if (isObject(value) && !isArray(value) && !isFunction(value)) {
        return omit(['nextPage', 'watch', 'cursor', 'cursorNext'], value)
      }
      return value
    }, state.query)
  }
}

const waitForResponse = async (store) => {
  let response = selectRouterResponse(store.getState())
  if (response) {
    return response
  }
  return new Promise((resolve) => {
    store.subscribe(() => {
      response = selectRouterResponse(store.getState())
      if (response) {
        return resolve(response)
      }
    })
  })
}

const monitorForError = async (store) => {
  let exception = selectUncaughtException(store.getState())
  if (exception) {
    throw exception
  }
  return new Promise((resolve, reject) => {
    store.subscribe(() => {
      exception = selectUncaughtException(store.getState())
      if (exception) {
        return reject(exception)
      }
    })
  })
}

const setupSSRApp = () => {
  let renderer
  const setupRenderer = () => {
    AppRegistry.registerComponent('App', () => App)
    return {
      render: async (context, url) => {
        const config = generateConfig({
          ssr: true,
          stage: context.config.stage,
          test: context.config.test
        })
        const { cache } = context
        const metaTagsInstance = MetaTagsServer()
        const history = createHistory(url)
        const ssrContext = setupSSRContext(config, context, history)
        const store = start(setup(createEngine(modules, config, ssrContext)))
        const initialProps = {
          cache,
          history,
          metaTagsInstance,
          store
        }
        const { element, getStyleElement } = AppRegistry.getApplication('App', {
          initialProps
        })
        const location = parseURL(url)

        await store.dispatch(
          locationChangeAction(context, {
            location
          })
        )
        const html = ReactDOMServer.renderToString(element)
        const response = await Promise.race([
          waitForResponse(store),
          monitorForError(store)
        ])
        const state = filterState(store.getState())

        await store.stop(store)
        return {
          css: ReactDOMServer.renderToStaticMarkup(getStyleElement({})),
          html,
          meta: metaTagsInstance.renderToString(),
          response,
          state
        }
      }
    }
  }

  const cachedRenderSSR = cacheMethod(
    {
      // TODO BRN: If we start rendering pages on a per user basis we'll need to
      // use the context.currentUser as part of the key. Need to figure out a
      // way to allow for some pages to be cached
      key: (context, request) => ['page', request.url],
      onHit: ({ logger }, request) =>
        logger.info(`Cache hit for request for ${request.url}`),
      ttl: 60 * 60 * 1000
    },
    async (context, request) => {
      const { logger } = context
      logger.info(`Cache miss for request for ${request.url}`)
      if (!renderer) {
        logger.info(`No renderer found. Building React SSR renderer...`)
        renderer = setupRenderer()
      }

      // TODO BRN: This does not take into account things like pages that should be
      // rendered differently for different users.

      // NOTE BRN: We use request.url here instead of request.originalUrl
      // because in local development the original.url is the path of the
      // firebase app and function which is not the url our app wants

      // NOTE BRN: This is where to feed in things like the current path based upon
      // the http request, the current user, etc
      return await renderer.render(context, request.url)
    }
  )

  return async (request) => {
    const { context } = request
    const { logger } = context
    logger.info(`Rendering request for ${request.url}`)
    return await cachedRenderSSR(context, request)
  }
}

export default setupSSRApp
