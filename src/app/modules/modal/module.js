import * as actions from './actions'
import { assocPath } from '../../../utils/data'
import {
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/lang'
import selectModal from './selectModal'

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
  run: function* run() {
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
  }
}

export default mod
