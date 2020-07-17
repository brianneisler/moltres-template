import * as actions from './actions'
import { ACTION_SHEET } from '../../../constants/Modal'
import { assoc, findIndex, getProp, map, noop } from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  put,
  takeEvery,
  trigger
} from '../../../utils/redux'
import { actions as modalActions } from '../modal'

const mod = {
  reducer: handleActions(
    {
      [actions.setCurrentActionSheet]: (state, action) =>
        assoc('currentActionSheet', action.payload, state)
    },
    {
      currentActionSheet: {
        onPress: noop,
        options: []
      }
    }
  ),
  run: function* run() {
    yield takeEvery(
      actions.showActionSheetWithOptions,
      handleAction(function* (context, action) {
        // TODO BRN: Rework the UI for this later
        const { buttons } = action.payload
        const cancelButtonIndex = findIndex(
          (button) => button.type === 'cancel',
          buttons
        )
        const destructiveButtonIndex = findIndex(
          (button) => button.type === 'destructive',
          buttons
        )
        const options = map(getProp('text'), buttons)
        yield put(
          actions.setCurrentActionSheet({
            cancelButtonIndex,
            destructiveButtonIndex,
            message: action.payload.message,
            onPress: yield trigger(function* (index) {
              const button = buttons[index]
              yield put(modalActions.hideModal(ACTION_SHEET))
              if (button.onPress) {
                yield call(button.onPress, button, index)
              }
            }),
            options,
            title: action.payload.title
          })
        )
        yield put(modalActions.showModal(ACTION_SHEET))
      })
    )
  }
}

export default mod
