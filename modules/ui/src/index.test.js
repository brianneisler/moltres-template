describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      actions: expect.any(Object),
      selectUIInitialized: expect.any(Function)
    })
  })
})
