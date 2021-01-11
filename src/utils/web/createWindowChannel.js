import { append, forEach, head, isEmpty, tail } from '../lang'
import { expandingBuffer } from '../redux'
import { Channel } from '../redux/constants'

import getWindow from './getWindow'
import sendWindowMessage from './sendWindowMessage'

const createWindowChannel = (buffer = expandingBuffer(1)) => {
  let closed = false
  let takers = []

  // If the channel is closed, then the the listener will drop the message.
  // If there are pending takers, then invoke the oldest taker with the message.
  // Otherwise put the message on the underlying buffer
  const listener = (message) => {
    if (message.origin === getWindow().location.origin) {
      return
    }
    if (closed) {
      return
    }
    if (!isEmpty(takers)) {
      const firstTaker = head(takers)
      takers = tail(takers)
      firstTaker(message)
      return
    }
    buffer.put(message)
  }
  getWindow().addEventListener('message', listener, false)
  // Channel.take(callback): used to register a taker. The take is resolved using the following rules
  // If the channel has buffered messages, then callback will be invoked with the next message from the underlying buffer (using buffer.take())
  // If the channel is closed and there are no buffered messages, then callback is invoked with END
  // Otherwise callback will be queued until a message is put into the channel

  const take = (callback) => {
    if (!buffer.isEmpty()) {
      callback(buffer.take())
      return
    }
    if (closed) {
      callback(Channel.END)
    }
    takers = append(callback, takers)
  }

  /**
   * If the channel is closed then the put has not effect
   * Otherwise, push the message into the runtime
   */
  const put = (message) => {
    if (closed) {
      return
    }
    sendWindowMessage(message)
  }

  // Channel.flush(callback): Used to extract all buffered messages from the channel. The flush is resolved using the following rules

  // If the channel is closed and there are no buffered messages, then callback is invoked with END
  // Otherwise callback is invoked with all buffered messages.

  const flush = (callback) => {
    if (buffer.isEmpty()) {
      if (closed) {
        return callback(Channel.END)
      }
      return callback([])
    }
    const remaining = []
    while (!buffer.isEmpty()) {
      remaining.push(buffer.take())
    }
    return remaining
  }

  // Channel.close(): closes the channel which means no more puts will be allowed. All pending takers will be invoked with END.

  const close = () => {
    closed = true
    getWindow().removeEventListener('message', listener)
    forEach((taker) => {
      taker(Channel.END)
    }, takers)
    takers = []
  }

  return {
    close,
    flush,
    put,
    take
  }
}

export default createWindowChannel
