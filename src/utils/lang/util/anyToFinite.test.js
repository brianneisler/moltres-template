import anyToFinite from './anyToFinite'

describe('anyToFinite', () => {
  test('converts finite number to itself', () => {
    expect(anyToFinite(3.2)).toBe(3.2)
  })

  test('converts MIN_VALUE to 5e-324', () => {
    expect(anyToFinite(Number.MIN_VALUE)).toBe(5e-324)
  })

  test('converts Infinity to 1.7976931348623157e+308', () => {
    expect(anyToFinite(Infinity)).toBe(1.7976931348623157e308)
  })

  test('converts string to finite number', () => {
    expect(anyToFinite('3.2')).toBe(3.2)
  })
})
