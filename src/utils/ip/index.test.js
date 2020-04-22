describe('ip index', () => {
  test('has expected methods', () => {
    const mod = require('./')
    expect(mod).toEqual({
      isIp: expect.any(Function),
      lookupIp: expect.any(Function)
    })
  })
})
