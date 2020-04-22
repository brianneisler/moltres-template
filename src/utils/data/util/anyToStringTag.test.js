import anyToStringTag from './anyToStringTag'

describe('anyToStringTag', () => {
  test('converts undefined to the Undefined string tag', () => {
    expect(anyToStringTag(undefined)).toBe('Undefined')
  })

  test('converts null to the Null string tag', () => {
    expect(anyToStringTag(null)).toBe('Null')
  })

  test('converts strings to the String string tag', () => {
    expect(anyToStringTag('')).toBe('String')
    expect(anyToStringTag('abc')).toBe('String')
    expect(anyToStringTag(new String(''))).toBe('String')
    expect(anyToStringTag(new String('abc'))).toBe('String')
  })

  test('converts booleans to the Boolean string tag', () => {
    expect(anyToStringTag(true)).toBe('Boolean')
    expect(anyToStringTag(false)).toBe('Boolean')
    expect(anyToStringTag(new Boolean(true))).toBe('Boolean')
    expect(anyToStringTag(new Boolean(false))).toBe('Boolean')
  })

  test('converts numbers to the Number string tag', () => {
    expect(anyToStringTag(0)).toBe('Number')
    expect(anyToStringTag(-0)).toBe('Number')
    expect(anyToStringTag(1)).toBe('Number')
    expect(anyToStringTag(-1)).toBe('Number')
    expect(anyToStringTag(1.23)).toBe('Number')
    expect(anyToStringTag(-1.23)).toBe('Number')
    expect(anyToStringTag(NaN)).toBe('Number')
    expect(anyToStringTag(Infinity)).toBe('Number')
    expect(anyToStringTag(-Infinity)).toBe('Number')

    expect(anyToStringTag(new Number(0))).toBe('Number')
    expect(anyToStringTag(new Number(-0))).toBe('Number')
    expect(anyToStringTag(new Number(1))).toBe('Number')
    expect(anyToStringTag(new Number(-1))).toBe('Number')
    expect(anyToStringTag(new Number(1.23))).toBe('Number')
    expect(anyToStringTag(new Number(-1.23))).toBe('Number')
    expect(anyToStringTag(new Number(NaN))).toBe('Number')
    expect(anyToStringTag(new Number(Infinity))).toBe('Number')
    expect(anyToStringTag(new Number(-Infinity))).toBe('Number')
  })

  test('converts functions to the Function string tag', () => {
    expect(anyToStringTag(() => {})).toBe('Function')
    expect(anyToStringTag(function () {})).toBe('Function')
  })

  test('converts classes to the Object string tag', () => {
    class Test {}
    expect(anyToStringTag(new Test())).toBe('Object')
  })
})
