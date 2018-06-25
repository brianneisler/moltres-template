describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      build: expect.any(Function),
      clean: expect.any(Function),
      cleanse: expect.any(Function),
      createContext: expect.any(Function),
      deploy: expect.any(Function),
      lint: expect.any(Function),
      loadEnv: expect.any(Function),
      loadPlugins: expect.any(Function),
      run: expect.any(Function),
      setup: expect.any(Function),
      start: expect.any(Function),
      test: expect.any(Function)
    })
  })
})
