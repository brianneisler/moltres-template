describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      createModule: expect.any(Function),
      default: {
        createModule: expect.any(Function),
        generateConfig: expect.any(Function)
      },
      generateConfig: expect.any(Function)
    })
  })
})
