import { withConfig, withContext } from '../../../core'
import { assocPath, compose, getPath, getProperty } from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/redux'
import { buildLocation, omitLocationQuery } from '../../../utils/url'
import { pushRouteAction, selectRouterLocation } from '../router'
import { trackAction } from '../tracking'

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

const mod = () => ({
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
            getProperty('name', previousShowModal) !==
            getProperty('name', showModal)
          ) {
            yield put(actions.hideModal(previousShowModal.name))
          }
        }
      })
    }
  ],
  *run() {
    yield takeEvery(
      PushModalRouteAction.name,
      handleAction(function* (context, action) {
        return yield call(pushModalRoute, action.payload)
      })
    )

    yield takeEvery(
      actions.showModal,
      handleAction(
        enhance(function* (context, action) {
          const modal = yield select(selectModal(action.payload.name))
          if (!getProperty('visible', modal)) {
            yield put(
              actions.setModal(action.payload.name, {
                ...modal,
                visible: true
              })
            )

            // TODO BRN: For now we're manually firing off this tracking event.
            // Instead, it would be better if we had a way of registering which
            // internal actions we wanted to track. Then we could apply a simple
            // transformation layer for enriching events and adjusting naming
            // conventions before firing them off to the event sinks.
            yield put(
              trackAction(context, {
                eventName: 'Show Modal',
                properties: {
                  modalName: action.payload.name
                }
              })
            )
          }
        })
      )
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
      location = buildLocation(location)
      let showModal = getPath(['query', 'showModal'], location)
      if (showModal) {
        showModal = JSON.parse(showModal)
        if (showModal.name === action.payload.name) {
          yield put(pushRouteAction(omitLocationQuery(['showModal'], location)))
        }
      }
    })
  }
})

export default mod
