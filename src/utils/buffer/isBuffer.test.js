import { forEach } from 'ramda'

import createBuffer from './createBuffer'
import isBuffer from './isBuffer'

describe('isBuffer', () => {
  test('correctly identifies Buffer', () => {
    const buffer = createBuffer([])
    expect(isBuffer(buffer)).toBe(true)
  })

  test('correctly returns false for non Buffers', () => {
    const invalidValues = ['ab123', '', 123, 0, -Infinity, {}, null, undefined]

    forEach((invalidValue) => {
      expect(isBuffer(invalidValue)).toBe(false)
    }, invalidValues)
  })
})
