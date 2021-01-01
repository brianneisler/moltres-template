import { getContext } from '../../../../core'
import { fork } from '../../../../utils/redux'

import { monitorWebNavigationCompletedChannel } from './util'

const mod = () => ({
  *run() {
    const context = yield* getContext()
    yield fork(monitorWebNavigationCompletedChannel, context)
  }
})

export default mod
