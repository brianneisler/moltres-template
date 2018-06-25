describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      authAnonymously: expect.any(Function),
      cleanupTestApp: expect.any(Function),
      deleteAllUsers: expect.any(Function),
      deleteTestUser: expect.any(Function),
      getServiceAccount: expect.any(Function),
      initAdminApp: expect.any(Function),
      initTestApp: expect.any(Function)
    })
  })
})
