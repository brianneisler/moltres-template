describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      createModule: expect.any(Function),
      initializeApp: expect.any(Function)
    })
  })
})
