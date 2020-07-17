import Readable from '../stream/Readable'

import Buffer from './Buffer'
import isBuffer from './isBuffer'

const DEFAULT_INITIAL_SIZE = 8 * 1024
const DEFAULT_INCREMENT_AMOUNT = 8 * 1024
const DEFAULT_FREQUENCY = 1
const DEFAULT_CHUNK_SIZE = 1024

class ReadableBufferStream extends Readable {
  constructor(opts = {}) {
    super(opts)

    const initialSize = opts.initialSize || DEFAULT_INITIAL_SIZE

    this.rbs = {
      allowPush: false,
      buffer: new Buffer(initialSize),
      chunkSize: opts.chunkSize || DEFAULT_CHUNK_SIZE,
      frequency: opts.frequency || DEFAULT_FREQUENCY,
      incrementAmount: opts.incrementAmount || DEFAULT_INCREMENT_AMOUNT,
      initialSize,
      size: 0,
      stopped: false,
      timeout: null
    }
  }

  _sendData() {
    const { buffer, chunkSize, frequency, size, stopped } = this.rbs
    const amount = Math.min(chunkSize, size)

    let sendMore = false

    if (amount > 0) {
      const chunk = new Buffer(amount)
      buffer.copy(chunk, 0, 0, amount)

      sendMore = this.push(chunk) !== false
      this.rbs.allowPush = sendMore

      buffer.copy(buffer, 0, amount, size)
      this.rbs.size -= amount
    }

    if (size === 0 && stopped) {
      this.push(null)
    }

    if (sendMore) {
      this.rbs.timeout = setTimeout(() => {
        this._sendData()
      }, frequency)
    } else {
      this.rbs.timeout = null
    }
  }

  stop() {
    if (this.rbs.stopped) {
      throw new Error('stop() called on already stopped ReadableBufferStream')
    }
    this.rbs.stopped = true

    if (this.rbs.size === 0) {
      this.push(null)
    }
  }

  size() {
    return this.rbs.size
  }

  maxSize() {
    return this.rbs.buffer.length
  }

  _increaseBufferIfNecessary(incomingDataSize) {
    const { buffer, incrementAmount, size } = this.rbs
    if (buffer.length - size < incomingDataSize) {
      const factor = Math.ceil(
        (incomingDataSize - (buffer.length - size)) / incrementAmount
      )
      const newBuffer = new Buffer(buffer.length + incrementAmount * factor)

      buffer.copy(newBuffer, 0, 0, size)
      this.rbs.buffer = newBuffer
    }
  }

  _kickSendDataTask() {
    const { allowPush, frequency } = this.rbs
    if (!this.rbs.timeout && allowPush) {
      this.rbs.timeout = setTimeout(() => {
        this._sendData()
      }, frequency)
    }
  }

  put(data, encoding = 'utf8') {
    const { buffer, size, stopped } = this.rbs
    if (stopped) {
      throw new Error('Tried to write data to a stopped ReadableStreamBuffer')
    }

    if (isBuffer(data)) {
      this._increaseBufferIfNecessary(data.length)
      data.copy(buffer, size, 0)
      this.rbs.size += data.length
    } else {
      data = data + ''
      const dataSizeInBytes = Buffer.byteLength(data)
      this._increaseBufferIfNecessary(dataSizeInBytes)
      buffer.write(data, size, encoding)
      this.rbs.size += dataSizeInBytes
    }

    this._kickSendDataTask()
  }

  _read() {
    this.rbs.allowPush = true
    this._kickSendDataTask()
  }
}

export default ReadableBufferStream
