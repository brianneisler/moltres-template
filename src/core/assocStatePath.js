import { put } from '../utils/redux'

import { assocStateAction } from './actions'

const assocStatePath = function* (path, state) {
  yield put(
    assocStateAction({
      path,
      state
    })
  )
}

export default assocStatePath
