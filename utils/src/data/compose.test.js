import compose from './compose'

describe('compose', () => {
  test('composes non async functions and returns value', async () => {
    const method = compose(
      (val) => val + 1,
      (val) => val + 2
    )
    expect(method(1)).toBe(4)
  })

  test('composes async functions and returns value', async () => {
    const method = compose(
      async (val) => new Promise(
        (resolve, reject) => setTimeout(() => resolve(val + 1), 0)
      ),
      (val) => val + 2
    )
    expect(await method(1)).toBe(4)
  })
})
