import { append, dropWhile, length } from 'ramda'
import deferredPromise from './deferredPromise'
import delay from './delay'

const rate = (fn, max, duration) => {
  let queue = []
  let invocations = []

  const clearInvocations = (now) => {
    // drop all invocations that are over duration
    invocations = dropWhile(({ invokedAt }) => now - invokedAt > duration, invocations)
  }

  const doInvoke = async (invocation) => {
    invocation.invokedAt = Date.now() // eslint-disable-line no-param-reassign
    invocations = append(invocation, invocations)
    try {
      const result = await fn(...invocation.args)
      invocation.promise.resolve(result)
    } catch (error) {
      invocation.promise.reject(error)
    }
  }

  const delayQueueProcessing = (now) => {
    const [firstInvocation] = invocations
    const waitFor = duration - (now - firstInvocation.invokedAt)
    delay(processQueue, waitFor) // eslint-disable-line no-use-before-define
  }

  const invoke = async (...args) => {
    const now = Date.now()
    clearInvocations(now)

    const invocation = {
      args,
      promise: deferredPromise(),
      invoke: () => {
        doInvoke(invocation)
        return invocation.promise
      }
    }

    if (length(invocations) >= max) {
      queue = append(invocation, queue)
      delayQueueProcessing(now)
      return invocation.promise
    }
    return invocation.invoke()
  }

  function processQueue() {
    const now = Date.now()
    clearInvocations(now)
    const numInvokable = max - length(invocations)
    let numInvoked = 0

    queue = dropWhile((invocation) => {
      if (numInvoked < numInvokable) {
        invocation.invoke()
        numInvoked += 1
        return true
      }
      return false
    }, queue)

    if (length(queue) > 0) {
      delayQueueProcessing(now)
    }
  }
  return invoke
}

export default rate
