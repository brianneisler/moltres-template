import { getContext } from '../../../../core'
import { fork } from '../../../../utils/redux'

import { monitorRuntimeMessageChannel } from './util'

const mod = () => ({
  *run() {
    const context = yield* getContext()
    yield fork(monitorRuntimeMessageChannel, context)
  }
})

export default mod
