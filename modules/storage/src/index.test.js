describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      createModule: expect.any(Function),
      initializeStorage: expect.any(Function),
      Storage: expect.any(Function)
    })
  })
})
