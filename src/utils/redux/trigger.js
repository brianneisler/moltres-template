import call from './call'
import cancel from './cancel'
import spawn from './spawn'
import take from './take'
import triggerChannel from './triggerChannel'

const setupTrigger = function* (callback) {
  const channel = triggerChannel()

  // TODO BRN: return the task that is returned by this spawn so that it can be
  // cancelled when terminating the program
  yield spawn(function* () {
    try {
      const { args } = yield take(channel)
      yield call(callback, ...args)
      yield cancel()
    } finally {
      channel.close()
    }
  })
  return (...args) => {
    channel.put({ args })
  }
}

const trigger = (callback) => {
  return call(setupTrigger, callback)
}

export default trigger
