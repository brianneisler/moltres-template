import anyToNumber from './anyToNumber'

describe('anyToNumber', () => {
  test('converts number to itself', () => {
    expect(anyToNumber(3.2)).toBe(3.2)
  })

  test('converts MIN_VALUE to 5e-324', () => {
    expect(anyToNumber(Number.MIN_VALUE)).toBe(5e-324)
  })

  test('converts Infinity to Infinity', () => {
    expect(anyToNumber(Infinity)).toBe(Infinity)
  })

  test('converts string to number', () => {
    expect(anyToNumber('3.2')).toBe(3.2)
  })
})
