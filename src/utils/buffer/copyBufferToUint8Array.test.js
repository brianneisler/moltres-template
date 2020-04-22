import Buffer from './Buffer'
import copyBufferToUint8Array from './copyBufferToUint8Array'

describe('copyBufferToUint8Array', () => {
  test('copy a buffer to a Uint8Array', async () => {
    const buffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8])
    const array = copyBufferToUint8Array(buffer)
    expect(array).toBeInstanceOf(Uint8Array)
    expect([...array]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect([...buffer]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
  })
})
