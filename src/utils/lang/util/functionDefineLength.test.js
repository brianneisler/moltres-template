import functionDefineLength from './functionDefineLength'

describe('functionDefineLength', () => {
  test('Changes the length of a given function', () => {
    const func = functionDefineLength(() => {}, 2)

    expect(func.length).toBe(2)
  })
})
