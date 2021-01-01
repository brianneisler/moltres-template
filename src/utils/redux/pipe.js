import { isAction } from '../lang'

import put from './put'
import takeEvery from './takeEvery'

const pipe = (channel) =>
  takeEvery(channel, function* (message) {
    if (isAction(message)) {
      yield put(message)
    }
  })

export default pipe
