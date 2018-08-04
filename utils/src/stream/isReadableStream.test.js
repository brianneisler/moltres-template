import { forEach } from 'ramda'
import isReadableStream from './isReadableStream'
import readableStream from './readableStream'

describe('isReadableStream', () => {
  test('correctly identifies ReadableStream', () => {
    const readable = readableStream()
    expect(isReadableStream(readable)).toBe(true)
  })

  test('correctly returns false for non ReadableStreams', () => {
    const invalidValues = ['ab123', '', 123, 0, -Infinity, {}, null, undefined]

    forEach((invalidValue) => {
      expect(isReadableStream(invalidValue)).toBe(false)
    }, invalidValues)
  })
})
