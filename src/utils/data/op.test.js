import op from './op'

describe('op', () => {
  test('creates an op object', () => {
    const fn = () => {}
    const operation = op(fn)
    expect(operation.fn).toBe(fn)
  })
})
