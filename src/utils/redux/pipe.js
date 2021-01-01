import { isAction } from '../lang'

import call from './call'
import put from './put'
import take from './take'

function* doPipe(channel) {
  while (true) {
    const action = yield take(channel)
    if (isAction(action)) {
      yield put(action)
    }
  }
}

const pipe = (channel) => call(doPipe, channel)

export default pipe
