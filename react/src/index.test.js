describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toEqual({
      CloseableModal: expect.any(Function),
      Emoji: expect.any(Function),
      FormTextInput: expect.any(Function),
      HoverableOpacity: expect.any(Object),
      HoverableWithoutFeedback: expect.any(Object),
      Hyperlink: expect.any(Function),
      Link: expect.any(Function),
      Overlay: expect.any(Function),
      PanController: expect.any(Function),
      Redirect: expect.any(Function),
      Route: expect.any(Function),
      Switch: expect.any(Function),
      Colors: expect.any(Object),
      createHistory: expect.any(Function),
      setupConfig: expect.any(Function),
      storeShape: expect.any(Function),
      withActions: expect.any(Function),
      withModalControls: expect.any(Function),
      withPropTransitions: expect.any(Function),
      withQueries: expect.any(Function),
      withReduxForm: expect.any(Function)
    })
  })
})
