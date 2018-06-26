describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      map: expect.any(Function),
      reduce: expect.any(Function),
      toString: expect.any(Function)
    })
  })
})
