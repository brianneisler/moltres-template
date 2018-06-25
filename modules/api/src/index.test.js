describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      actions: expect.any(Object),
      all: expect.any(Function),
      default: expect.any(Function),
      delete: expect.any(Function),
      get: expect.any(Function),
      post: expect.any(Function),
      put: expect.any(Function),
      route: expect.any(Function),
    })
  })
})
