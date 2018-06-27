describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      compose: expect.any(Function),
      head: expect.any(Function),
      init: expect.any(Function),
      length: expect.any(Function),
      map: expect.any(Function),
      reduce: expect.any(Function),
      reduceRight: expect.any(Function),
      toString: expect.any(Function)
    })
  })
})
