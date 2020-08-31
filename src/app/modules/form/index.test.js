describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      actions: expect.any(Object),
      default: expect.any(Object),
      selectFormValues: expect.any(Function),
      selectIsFormDirty: expect.any(Function)
    })
  })
})
