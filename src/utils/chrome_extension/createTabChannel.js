import { append, forEach, head, isEmpty, tail } from '../lang'
import { expandingBuffer } from '../redux'
import { Channel } from '../redux/constants'

import sendTabMessage from './sendTabMessage'

const createTabChannel = (
  { frameId, tabId },
  inboundBuffer = expandingBuffer(1),
  outboundBuffer = expandingBuffer(1)
) => {
  let paused = false
  let closed = false
  let takers = []

  // If the channel is closed, then the the listener will drop the message.
  // If there are pending takers, then invoke the oldest taker with the message.
  // Otherwise put the message on the underlying buffer
  const listener = (message) => {
    if (closed) {
      return
    }
    if (!isEmpty(takers) && !paused) {
      const firstTaker = head(takers)
      takers = tail(takers)
      firstTaker(message)
      return
    }
    inboundBuffer.put(message)
  }
  chrome.runtime.onMessage.addListener(listener)

  const drain = () => {
    while (!outboundBuffer.isEmpty()) {
      sendTabMessage({ frameId, tabId }, outboundBuffer.take())
    }
    while (!inboundBuffer.isEmpty() && !isEmpty(takers)) {
      const taker = head(takers)
      takers = tail(takers)
      taker(inboundBuffer.take())
    }
  }

  // Channel.take(callback): used to register a taker. The take is resolved using the following rules
  // If the channel has buffered messages, then callback will be invoked with the next message from the underlying buffer (using buffer.take())
  // If the channel is closed and there are no buffered messages, then callback is invoked with END
  // Otherwisecallback will be queued until a message is put into the channel

  const take = (callback) => {
    if (!inboundBuffer.isEmpty()) {
      callback(inboundBuffer.take())
      return
    }
    if (closed) {
      callback(Channel.END)
    }
    takers = append(callback, takers)
  }

  // Channel.put(message): Used to put message on the buffer. The put will be handled using the following rules

  // If the channel is closed, then the put will have no effect.
  // If there are pending takers, then invoke the oldest taker with the message.
  // Otherwise put the message on the underlying buffer

  const put = (message) => {
    if (closed) {
      return
    }
    if (paused) {
      outboundBuffer.put(message)
      return
    }
    sendTabMessage({ frameId, tabId }, message)
  }

  // Channel.flush(callback): Used to extract all buffered messages from the channel. The flush is resolved using the following rules

  // If the channel is closed and there are no buffered messages, then callback is invoked with END
  // Otherwise callback is invoked with all buffered messages.

  const flush = (callback) => {
    if (inboundBuffer.isEmpty()) {
      if (closed) {
        return callback(Channel.END)
      }
      return callback([])
    }
    const remaining = []
    while (!inboundBuffer.isEmpty()) {
      remaining.push(inboundBuffer.take())
    }
    return remaining
  }

  // Channel.close(): closes the channel which means no more puts will be allowed. All pending takers will be invoked with END.

  const close = () => {
    closed = true
    chrome.runtime.onMessage.removeListener(listener)
    forEach((taker) => {
      taker(Channel.END)
    }, takers)
    takers = []
  }

  const pause = () => {
    paused = true
  }

  const resume = () => {
    paused = false
    drain()
  }

  return {
    close,
    drain,
    flush,
    pause,
    put,
    resume,
    take
  }
}

export default createTabChannel
