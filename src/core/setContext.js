import { put } from '../utils/redux'
import { setContextAction } from './actions'

const setContext = function* (selector, value) {
  return yield put(
    setContextAction({
      selector,
      value
    })
  )
}

export default setContext
