import { StatusLevel } from 'moltres/constants'
import { getContext } from 'moltres/core'
import { assoc } from 'moltres/lang'
import {
  fork,
  handleAction,
  handleActions,
  put,
  takeEvery
} from 'moltres/redux'
import { getNetworkInformation } from 'moltres/web'

import { actions as statusActions } from '../status'

import { setNetworkInformation } from './actions'
import { monitorNetworkInformationChannel } from './util'

const STATUS_NETWORK = 'STATUS:NETWORK'

const mod = () => ({
  reducer: handleActions(
    {
      [setNetworkInformation]: (state, action) =>
        assoc('information', action.payload.information, state)
    },
    {
      information: {
        isConnected: true,
        rtt: 0,
        type: 'unknown'
      }
    }
  ),
  *run() {
    yield takeEvery(
      setNetworkInformation,
      handleAction(function* (context, action) {
        const { information } = action.payload
        if (information && !information.isConnected) {
          yield put(
            statusActions.showStatusWithOptions(STATUS_NETWORK, {
              level: StatusLevel.WARN,
              message: 'No internet connection'
            })
          )
        } else {
          yield put(statusActions.clearStatus(STATUS_NETWORK))
        }
      })
    )

    const context = yield* getContext()
    const information = yield getNetworkInformation(context).fetch()
    yield put(setNetworkInformation({ information }))
    yield fork(monitorNetworkInformationChannel, context)
  }
})

export default mod
