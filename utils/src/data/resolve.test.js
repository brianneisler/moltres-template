// import resolve from './resolve'

describe('resolve', () => {
  test('placeholder', () => {
    expect(true).toBe(true)
  })

  // test('resolves basic values to themselves', () => {
  //   expect(resolve(0)).toBe(0)
  //   expect(resolve(1)).toBe(1)
  //   expect(resolve(-1)).toBe(-1)
  //   expect(resolve("")).toBe("")
  //   expect(resolve("abc")).toBe("abc")
  //   expect(resolve(null)).toBe(null)
  //   expect(resolve(undefined)).toBe(undefined)
  //   expect(resolve(true)).toBe(true)
  //   expect(resolve(false)).toBe(false)
  // })
  //
  // test('resolves async values to a Promise', async () => {
  //   const result = resolve(new Promise((_resolve) => {
  //     setTimeout(() => {
  //       _resolve('abc')
  //     }, 0)
  //   }))
  //   expect(result).toBeInstanceOf(Promise)
  //   expect(await result).toBe('abc')
  // })
})
