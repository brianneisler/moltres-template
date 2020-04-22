describe('graph index', () => {
  test('has expected methods', () => {
    const mod = require('./')
    expect(mod).toEqual({
      execGraph: expect.any(Function),
      getOutNodes: expect.any(Function),
      isGraph: expect.any(Function),
      newGraph: expect.any(Function),
      traversePostorder: expect.any(Function)
    })
  })
})
