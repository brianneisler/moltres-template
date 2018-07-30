describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      actionChannel: expect.any(Function),
      all: expect.any(Function),
      apply: expect.any(Function),
      asyncChannel: expect.any(Function),
      buffers: expect.any(Object),
      call: expect.any(Function),
      cancel: expect.any(Function),
      cancelled: expect.any(Function),
      channel: expect.any(Function),
      combineActions: expect.any(Function),
      compose: expect.any(Function),
      finally: expect.any(Function),
      flush: expect.any(Function),
      fork: expect.any(Function),
      getConfig: expect.any(Function),
      getContext: expect.any(Function),
      handleAction: expect.any(Function),
      handleActions: expect.any(Function),
      isAction: expect.any(Function),
      // isEnd: expect.any(Function),
      isOp: expect.any(Function),
      isResolvable: expect.any(Function),
      join: expect.any(Function),
      resolve: expect.any(Function),
      resolveAll: expect.any(Function),
      resolveToPromise: expect.any(Function),
      withResolve: expect.any(Function)
    })
  })
})
