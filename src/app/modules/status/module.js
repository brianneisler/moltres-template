import { INFO } from '../../../constants/StatusLevel'
import {
  assoc,
  assocPath,
  dissocPath,
  first,
  getPath,
  shallowEquals,
  sort,
  values,
  wait
} from '../../../utils/lang'
import {
  call,
  handleAction,
  handleActions,
  put,
  select,
  takeEvery
} from '../../../utils/redux'

import * as actions from './actions'
import selectStatusInstances from './selectStatusInstances'

const refreshCurrentStatus = function* () {
  const instances = yield select(selectStatusInstances)
  const current = first(
    sort((statusA, statusB) => {
      if (statusA.priority === statusB.priority) {
        return statusB.createdAt - statusA.createdAt
      }
      return statusB.priority - statusA.priority
    }, values(instances))
  )
  yield put(actions.setCurrentStatus(current))
}

const mod = {
  reducer: handleActions(
    {
      [actions.setCurrentStatus]: (state, action) =>
        assoc('current', action.payload.status, state),
      [actions.setStatus]: (state, action) => {
        const { name, status } = action.payload
        if (status) {
          const instance = getPath(['instances', name], state.instances)
          if (!shallowEquals(instance, status)) {
            return assocPath(['instances', name], status, state)
          }
          return state
        }
        return dissocPath(['instances', name], state)
      }
    },
    {
      current: null,
      instances: {}
    }
  ),
  run: function* run() {
    yield takeEvery(
      actions.showStatusWithOptions,
      handleAction(function* (context, action) {
        const { name, options } = action.payload
        yield put(
          actions.setStatus(name, {
            ...options,
            createdAt: Date.now(),
            level: options.level || INFO,
            name,
            priority: options.priority || 0
          })
        )
        yield call(refreshCurrentStatus)
        if (options.timeout) {
          yield wait(options.timeout)
          yield put(actions.clearStatus(name))
        }
      })
    )

    yield takeEvery(
      actions.clearStatus,
      handleAction(function* (context, action) {
        const { name } = action.payload
        yield put(actions.setStatus(name, null))
        yield call(refreshCurrentStatus)
      })
    )
  }
}

export default mod
