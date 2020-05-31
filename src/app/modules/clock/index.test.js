describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      actions: expect.any(Object),
      selectCurrentClock: expect.any(Function)
    })
  })
})
