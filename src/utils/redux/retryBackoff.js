import call from './call'
import delay from './delay'

const retryBackoff = function* (maxTries, initialDelay, func, ...args) {
  for (let i = 0; i < maxTries; i++) {
    try {
      return yield call(func, ...args)
    } catch (error) {
      if (i < maxTries - 1) {
        yield delay(initialDelay * Math.pow(2, i))
      } else {
        throw error
      }
    }
  }
}

export default retryBackoff
