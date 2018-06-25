describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqaul({
      actions: expect.any(Object)
    })
  })
})
