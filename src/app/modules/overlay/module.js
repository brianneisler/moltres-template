import { withConfig, withContext } from 'moltres/core'
import { assocPath, compose, getPath, getProperty } from 'moltres/lang'
import {
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from 'moltres/redux'

import { buildLocation, omitLocationQuery } from 'moltres/url'
import { actions as modalActions } from '../modal'
import { pushRouteAction, selectRouterLocation } from '../router'

import * as actions from './actions'

const enhance = compose(
  withConfig((config) => ({
    config
  })),
  withContext()
)

const mod = () => ({
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
            getProperty('name', previousShowOverlay) !==
            getProperty('name', showOverlay)
          ) {
            yield put(modalActions.hideModal(previousShowOverlay.name))
          }
        }
      })
    }
  ],
  *run() {
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
      location = buildLocation(location)
      let showOverlay = getPath(['query', 'showOverlay'], location)
      if (showOverlay) {
        showOverlay = JSON.parse(showOverlay)
        if (showOverlay.name === action.payload.name) {
          yield put(
            pushRouteAction(omitLocationQuery(['showOverlay'], location))
          )
        }
      }
    })
  }
})

export default mod
