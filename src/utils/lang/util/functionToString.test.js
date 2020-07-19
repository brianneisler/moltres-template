import functionToString from './functionToString'

describe('functionToString', () => {
  test('converts basic function to string ', () => {
    expect(functionToString(function () {})).toBe('function () {}')
  })
})
