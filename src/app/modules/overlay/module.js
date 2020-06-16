import * as actions from './actions'
import { assocPath, compose, getPath, getProp, omit } from '../../../utils/data'
import { buildLocation, parseLocation } from '../../../utils/url'
import {
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/lang'
import { actions as modalActions } from '../modal'
import { pushRouteAction, selectRouterLocation } from '../router'
import { withConfig, withContext } from '../../../core'

const enhance = compose(
  withConfig((config) => ({
    config
  })),
  withContext()
)

const mod = {
  reducer: handleActions(
    {
      [actions.setOverlay]: (state, action) =>
        assocPath(
          ['instances', action.payload.name],
          action.payload.instance,
          state
        )
    },
    {
      instances: {}
    }
  ),
  routes: [
    {
      path: '/',
      preload: enhance(function* (context, { location, previousLocation }) {
        let showOverlay = getPath(['query', 'showOverlay'], location)
        if (showOverlay) {
          showOverlay = JSON.parse(showOverlay)
          yield put(actions.showOverlay(showOverlay.name, showOverlay.options))
        }
        let previousShowOverlay = getPath(
          ['query', 'showOverlay'],
          previousLocation
        )
        if (previousShowOverlay) {
          previousShowOverlay = JSON.parse(previousShowOverlay)
          if (
            getProp('name', previousShowOverlay) !==
            getProp('name', showOverlay)
          ) {
            yield put(modalActions.hideModal(previousShowOverlay.name))
          }
        }
      })
    }
  ],
  run: function* run() {
    yield takeEvery(
      actions.showOverlay,
      handleAction(function* (context, action) {
        yield put(
          actions.setOverlay(action.payload.name, {
            name: action.payload.name,
            options: action.payload.options
          })
        )

        yield put(modalActions.showModal(action.payload.name))
      })
    )

    // NOTE BRN: When a modal is cancelled, check if it is the current overlay
    // in the url query. If so, remove the showOverlay from the parameters.
    yield takeEvery(modalActions.modalCancelled, function* (action) {
      let location = yield select(selectRouterLocation)
      location = parseLocation(location)
      let showOverlay = getPath(['query', 'showOverlay'], location)
      if (showOverlay) {
        showOverlay = JSON.parse(showOverlay)
        if (showOverlay.name === action.payload.name) {
          yield put(
            pushRouteAction(
              buildLocation({
                ...location,
                query: {
                  ...omit(['showOverlay'], location.query)
                }
              })
            )
          )
        }
      }
    })
  }
}

export default mod
