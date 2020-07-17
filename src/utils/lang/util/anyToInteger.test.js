import anyToInteger from './anyToInteger'

describe('anyToInteger', () => {
  test('converts number to integer', () => {
    expect(anyToInteger(3.2)).toBe(3)
  })

  test('converts MIN_VALUE to 0', () => {
    expect(anyToInteger(Number.MIN_VALUE)).toBe(0)
  })

  test('converts Infinity to 1.7976931348623157e+308', () => {
    expect(anyToInteger(Infinity)).toBe(1.7976931348623157e308)
  })

  test('converts string to integer', () => {
    expect(anyToInteger('3.2')).toBe(3)
  })
})
