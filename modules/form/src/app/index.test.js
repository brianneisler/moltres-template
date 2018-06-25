describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      default: expect.any(Object),
      getFormAsyncErrors: expect.any(Function),
      getFormError: expect.any(Function),
      getFormInitialValues: expect.any(Function),
      getFormMeta: expect.any(Function),
      getFormNames: expect.any(Function),
      getFormSubmitErrors: expect.any(Function),
      getFormSyncErrors: expect.any(Function),
      getFormSyncWarnings: expect.any(Function),
      getFormValues: expect.any(Function),
      hasSubmitFailed: expect.any(Function),
      hasSubmitSucceeded: expect.any(Function),
      isDirty: expect.any(Function),
      isInvalid: expect.any(Function),
      isPristine: expect.any(Function),
      isSubmitting: expect.any(Function),
      isValid: expect.any(Function)
    })
  })
})
