import * as actions from './actions'
import { ALERT } from '../../../constants/Modal'
import { assoc, mapAll } from '../../../utils/data'
import {
  call,
  handleAction,
  handleActions,
  put,
  takeEvery,
  trigger
} from '../../../utils/lang'
import { actions as modalActions } from '../modal'

const mod = {
  reducer: handleActions(
    {
      [actions.setCurrentAlert]: (state, action) =>
        assoc('currentAlert', action.payload, state)
    },
    {
      currentAlert: {
        buttons: []
      }
    }
  ),
  run: function* run() {
    yield takeEvery(
      actions.showAlertWithOptions,
      handleAction(function* (context, action) {
        // wrap the onPress handlers to make them compatible with sagas
        const buttons = yield mapAll(function* (button) {
          return {
            ...button,
            onPress: yield trigger(function* (...args) {
              const result = yield put(modalActions.requestCancelModal(ALERT))
              if (result && button.onPress) {
                return yield call(button.onPress, ...args)
              }
            })
          }
        }, action.payload.buttons)

        yield put(
          actions.setCurrentAlert({
            buttons,
            message: action.payload.message,
            options: action.payload.options,
            title: action.payload.title
          })
        )

        yield put(modalActions.showModal(ALERT))
      })
    )
  }
}

export default mod
