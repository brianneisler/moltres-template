describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      fork: expect.any(Function),
      join: expect.any(Function)
    })
  })
})
