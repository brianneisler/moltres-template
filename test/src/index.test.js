describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      authAnonymously: expect.any(Function),
      cleanupTestApp: expect.any(Function),
      deleteAllUsers: expect.any(Function),
      deleteTestUsers: expect.any(Function),
      generateNamespace: expect.any(Function),
      getServiceAccount: expect.any(Function),
      initAdminApp: expect.any(Function),
      initTestApp: expect.any(Function),
      loadEnv: expect.any(Function),
      setupContext: expect.any(Function)
    })
  })
})
