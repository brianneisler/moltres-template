describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      UIDeinitializedAction: expect.any(Object),
      UIInitializedAction: expect.any(Object),
      default: {
        reducer: expect.any(Function),
        run: expect.any(Function)
      },
      selectUIInitialized: expect.any(Function),
      uiDeinitializedAction: expect.any(Function),
      uiInitializedAction: expect.any(Function)
    })
  })
})
