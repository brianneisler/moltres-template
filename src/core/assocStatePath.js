import { assocStateAction } from './actions'
import { put } from '../utils/redux'

const assocStatePath = function* (path, state) {
  yield put(
    assocStateAction({
      path,
      state
    })
  )
}

export default assocStatePath
