import { assocStateAction } from './actions'
import { put } from '../utils/lang'

const assocStatePath = function* (path, state) {
  yield put(
    assocStateAction({
      path,
      state
    })
  )
}

export default assocStatePath
