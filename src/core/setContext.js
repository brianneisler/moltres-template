import { call, put } from '../utils/redux'

import { setContextAction } from './actions'
import getContext from './getContext'

const setContext = function* (selector, value) {
  const context = yield call(getContext)
  return yield put(
    setContextAction(context, {
      selector,
      value
    })
  )
}

export default setContext
