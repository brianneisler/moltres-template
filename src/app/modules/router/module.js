import * as actions from './actions'
import { Code, StatusCode } from '../../../constants'
import { LocationChangeAction, PreloadAction, ResponseAction } from './schemas'
import {
  all,
  call,
  handleAction,
  handleActions,
  put,
  reduceReducers,
  select,
  takeEvery
} from '../../../utils/lang'
import {
  assocPath,
  assocProp,
  compose,
  evolve,
  filter,
  getPathOr,
  getProp,
  inc,
  map,
  pipe,
  reduceRight
} from '../../../utils/data'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { expected } from '../../../utils/error'
import { filterRoutes } from './util'
import { matchPath, parseLocation } from '../../../utils/url'
import { withContext } from '../../../core'
import selectRouterPreload from './selectors/selectRouterPreload'

// NOTE BRN: We match multiple paths in case certain paths want to be able to
// match existing routes. Like overlays which can appear on any route
const preloadMatchedRotues = function* (matchedRoutes, preload) {
  yield all(
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
    const result = yield* reduceRight(matchedRoutes, {}, function* (response, { match, route }) {
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
    })
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

const mod = ({ ssr }, { history }) => {
  let routes
  let previousLocation = null
  return {
    middleware: routerMiddleware(history),
    reducer: reduceReducers(
      connectRouter(history),
      handleActions({
        [PreloadAction.type]: (state, { payload }) => {
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
        },
        [ResponseAction.type]: (state, { payload }) => assocProp('response', payload, state)
      })
    ),
    run: function* run() {
      yield takeEvery(
        PreloadAction.type,
        handleAction(function* (context, { payload }) {
          const matchedRoutes = matchRoutes(routes, payload.location)
          yield call(preloadMatchedRotues, matchedRoutes, payload)
          yield put(actions.preloadComplete(payload))
        })
      )

      yield takeEvery(ResponseAction.type, function* ({ payload }) {
        if (payload.redirect && !ssr) {
          yield put(actions.replace(payload.redirect))
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

            // NOTE BRN: We don't preload on SSR because this is done before the
            // UI is rendered. This way when we render as a string we render all
            // of the preloaded data.
            if (!ssr) {
              // NOTE BRN: determine if this is the first load.
              const preload = yield select(selectRouterPreload(location.pathname))
              yield put(
                actions.preload(context, {
                  first: !preload,
                  location,
                  previousLocation
                })
              )
            }

            const response = yield call(
              handleRouting,
              context,
              {
                location,
                previousLocation
              },
              routes
            )
            yield put(actions.response(context, response))
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