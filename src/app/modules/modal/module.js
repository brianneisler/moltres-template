import { withConfig, withContext } from '../../../core'
import { assocPath, compose, getPath, getProp, omit } from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/redux'
import { buildLocation, parseLocation } from '../../../utils/url'
import { pushRouteAction, selectRouterLocation } from '../router'

import * as actions from './actions'
import { PushModalRouteAction } from './schemas'
import { selectModal } from './selectors'
import { pushModalRoute } from './util'

const enhance = compose(
  withConfig((config) => ({
    config
  })),
  withContext()
)

const mod = {
  reducer: handleActions(
    {
      [actions.hideModal]: (state, action) =>
        assocPath(['instances', action.payload.name, 'visible'], false, state),
      [actions.setModalCancelEnabled]: (state, action) =>
        assocPath(
          ['instances', action.payload.name, 'cancelEnabled'],
          action.payload.value,
          state
        ),
      [actions.setModal]: (state, action) =>
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
        let showModal = getPath(['query', 'showModal'], location)
        if (showModal) {
          showModal = JSON.parse(showModal)
          yield put(actions.showModal(showModal.name, showModal.options))
        }
        let previousShowModal = getPath(
          ['query', 'showModal'],
          previousLocation
        )
        if (previousShowModal) {
          previousShowModal = JSON.parse(previousShowModal)
          if (
            getProp('name', previousShowModal) !== getProp('name', showModal)
          ) {
            yield put(actions.hideModal(previousShowModal.name))
          }
        }
      })
    }
  ],
  run: function* run() {
    yield takeEvery(
      PushModalRouteAction.name,
      handleAction(function* (context, action) {
        return yield call(pushModalRoute, action.payload)
      })
    )

    yield takeEvery(
      actions.showModal,
      handleAction(function* (context, action) {
        const modal = yield select(selectModal(action.payload.name))
        yield put(
          actions.setModal(action.payload.name, {
            ...modal,
            visible: true
          })
        )
      })
    )

    yield takeEvery(
      actions.requestCancelModal,
      handleAction(function* (context, action) {
        const modal = yield select(selectModal(action.payload.name))
        if (!modal) {
          throw new Error(
            `requestCancelModal action received for unknown modal '${action.payload.name}'`
          )
        }
        if (modal.cancelEnabled) {
          yield put(actions.hideModal(action.payload.name))
        }
      })
    )

    // NOTE BRN: When a modal is cancelled, check if it is the current Modal
    // in the url query. If so, remove the showModal from the parameters.
    yield takeEvery(actions.modalCancelled, function* (action) {
      let location = yield select(selectRouterLocation)
      location = parseLocation(location)
      let showModal = getPath(['query', 'showModal'], location)
      if (showModal) {
        showModal = JSON.parse(showModal)
        if (showModal.name === action.payload.name) {
          yield put(
            pushRouteAction(
              buildLocation({
                ...location,
                query: {
                  ...omit(['showModal'], location.query)
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
