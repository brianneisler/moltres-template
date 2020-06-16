describe('react index', () => {
  test('has expected methods', () => {
    const mod = require('./')
    expect(mod).toEqual({
      bindActionCreator: expect.any(Function),
      branch: expect.any(Function),
      clearHistory: expect.any(Function),
      cloneReferencedElement: expect.any(Function),
      connect: expect.any(Function),
      createFactory: expect.any(Function),
      createHistory: expect.any(Function),
      defaultProps: expect.any(Function),
      flattenPages: expect.any(Function),
      forwardRef: expect.any(Function),
      getStyleHeight: expect.any(Function),
      idsOfValues: expect.any(Function),
      keyValuesById: expect.any(Function),
      lifecycle: expect.any(Function),
      renderComponent: expect.any(Function),
      setDisplayName: expect.any(Function),
      setPropTypes: expect.any(Function),
      storeShape: expect.any(Function),
      withActions: expect.any(Function),
      withAsyncProps: expect.any(Function),
      withContext: expect.any(Function),
      withForwardRef: expect.any(Function),
      withHandlers: expect.any(Function),
      withModalControls: expect.any(Function),
      withPropTransitions: expect.any(Function),
      withProps: expect.any(Function),
      withPropsOnChange: expect.any(Function),
      withReduxForm: expect.any(Function),
      withState: expect.any(Function),
      wrapActionCreators: expect.any(Function),
      wrapDisplayName: expect.any(Function)
    })
  })
})
