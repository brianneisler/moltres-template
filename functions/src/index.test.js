describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      setupContext: expect.any(Function)
    })
  })
})
