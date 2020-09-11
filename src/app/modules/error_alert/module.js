import { UncaughtExceptionAction } from '../../../core'
import { put, takeEvery } from '../../../utils/redux'
import { showAlertWithOptions } from '../alert/actions'

const mod = () => ({
  *run() {
    yield takeEvery(UncaughtExceptionAction.name, function* () {
      yield put(
        showAlertWithOptions({
          buttons: [
            {
              *onPress() {
                // TODO BRN: make this an action
                location.reload()
              },
              text: 'Relaod'
            }
          ],
          message:
            'An unexpected error occurred. Please reload the application.',
          options: {
            cancelable: false
          },
          title: 'Whoops! Something went wrong.'
        })
      )
    })
  }
})

export default mod
