import { connectRouter, routerMiddleware } from 'connected-react-router'

import { Code, StatusCode } from '../../../constants'
import { withContext } from '../../../core'
import { expected } from '../../../utils/error'
import {
  assoc,
  assocPath,
  compose,
  evolve,
  filter,
  getPathOr,
  getProp,
  inc,
  map,
  pipe,
  reduceRight
} from '../../../utils/lang'
import {
  all,
  call,
  handleAction,
  put,
  reduceReducers,
  select,
  takeEvery
} from '../../../utils/redux'
import { matchPath, parseLocation } from '../../../utils/url'

import {
  preloadAction,
  preloadCompleteAction,
  replaceAction,
  responseAction
} from './actions'
import { LocationChangeAction, PreloadAction, ResponseAction } from './schemas'
import selectRouterPreload from './selectors/selectRouterPreload'
import { filterRoutes } from './util'

// NOTE BRN: We match multiple paths in case certain paths want to be able to
// match existing routes. Like overlays which can appear on any route
const preloadMatchedRoutes = function* (matchedRoutes, preload) {
  return yield all(
    map(({ match, route }) => {
      if (route.preload) {
        return call(
          route.preload,
          {},
          {
            ...preload,
            match
          }
        )
      }
    }, matchedRoutes)
  )
}

const matchRoutes = (routes, location) =>
  pipe(
    map((route) => ({
      match: matchPath(location.pathname, route),
      route
    })),
    filter(getProp('match'))
  )(routes)

const handleRouting = function* (context, routing, routes) {
  try {
    const matchedRoutes = matchRoutes(routes, routing.location)
    const result = yield* reduceRight(
      function* (response, { match, route }) {
        if (route.handle) {
          response = yield call(route.handle, context, response, {
            ...routing,
            match
          })
          if (!response) {
            throw new Error('route handler must return a response')
          }
        }
        return response
      },
      {},
      matchedRoutes
    )
    if (!result || !result.statusCode) {
      throw expected({
        code: Code.NOT_FOUND,
        message: 'This page does not exist',
        statusCode: StatusCode.NOT_FOUND
      })
    }
    return result
  } catch (error) {
    if (error.type !== 'EXPECTED') {
      throw error
    }
    return {
      error,
      statusCode: error.statusCode
    }
  }
}

const enhance = compose(withContext())

const mod = ({ config, history }) => {
  const { ssr } = config
  let routes
  let previousLocation = null
  return {
    middleware: routerMiddleware(history),
    reducer: reduceReducers(
      connectRouter(history),
      // NOTE BRN: We don't use handleActions here because it injects initial
      // state. This causes the connected router to break. https://github.com/supasate/connected-react-router/issues/312
      (state, { payload, type }) => {
        if (type === PreloadAction.type) {
          const { location } = payload
          const { pathname } = location
          return assocPath(
            ['preloads', pathname],
            evolve(
              {
                visits: inc
              },
              getPathOr({ visits: 0 }, ['preloads', pathname], state)
            ),
            state
          )
        } else if (type === ResponseAction.type) {
          return assoc('response', payload, state)
        }
        return state
      }
    ),
    *run() {
      yield takeEvery(
        PreloadAction.type,
        handleAction(function* (context, { payload }) {
          const matchedRoutes = matchRoutes(routes, payload.location)
          yield call(preloadMatchedRoutes, matchedRoutes, payload)
          yield put(preloadCompleteAction(payload))
        })
      )

      yield takeEvery(ResponseAction.type, function* ({ payload }) {
        if (payload.redirect && !ssr) {
          yield put(replaceAction(payload.redirect))
        }
      })

      // Take every navigation on router and preload the route
      yield takeEvery(
        LocationChangeAction.type,
        handleAction(
          enhance(function* (context, action) {
            let { location } = action.payload
            // NOTE BRN: We do this to add additional properties to the location
            // (like origin)
            location = parseLocation(location)

            // NOTE BRN: determine if this is the first load.
            const preload = yield select(selectRouterPreload(location.pathname))
            yield put(
              preloadAction(context, {
                first: !preload,
                location,
                previousLocation
              })
            )

            const response = yield call(
              handleRouting,
              context,
              {
                location,
                previousLocation
              },
              routes
            )

            yield put(responseAction(context, response))
            previousLocation = location
          })
        )
      )
    },
    start: (store) => {
      const modules = store.getModules()
      routes = filterRoutes(modules)
    }
  }
}

export default mod
