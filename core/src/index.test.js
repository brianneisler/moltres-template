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
      cps: expect.any(Function),
      createAction: expect.any(Function),
      createActions: expect.any(Function),
      createChannel: expect.any(Function),
      createConfig: expect.any(Function),
      createContext: expect.any(Function),
      createEngine: expect.any(Function),
      createFactory: expect.any(Function),
      delay: expect.any(Function),
      END: expect.any(Object),
      eventChannel: expect.any(Function),
      finally: expect.any(Function),
      flush: expect.any(Function),
      fork: expect.any(Function),
      getConfig: expect.any(Function),
      getContext: expect.any(Function),
      handleAction: expect.any(Function),
      handleActions: expect.any(Function),
      isAction: expect.any(Function),
      // isEnd: expect.any(Function),
      join: expect.any(Function),
      setup: expect.any(Function),
      setupConfig: expect.any(Function),
      withResolve: expect.any(Function)
    })
  })
})
