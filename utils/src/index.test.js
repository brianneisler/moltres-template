describe('index', () => {
  test('require runs without error', async () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      addIndex: expect.any(Function),
      always: expect.any(Function),
      append: expect.any(Function),
      applyIfHas: expect.any(Function),
      arrayLikeKeys: expect.any(Function),
      asciiSize: expect.any(Function),
      asciiToArray: expect.any(Function),
      assoc: expect.any(Function),
      assocPath: expect.any(Function),
      bind: expect.any(Function),
      Buffer: expect.any(Function),
      bufferToStream: expect.any(Function),
      compose: expect.any(Function),
      config: expect.any(Function),
      createBuffer: expect.any(Function),
      defn: expect.any(Function),
      defprotocol: expect.any(Function),
      dispatchable: expect.any(Function),
      each: expect.any(Function),
      eachSeries: expect.any(Function),
      fetch: expect.any(Function),
      forEach: expect.any(Function),
      forEachSeries: expect.any(Function),
      hashStream: expect.any(Function),
      hashString: expect.any(Function),
      head: expect.any(Function),
      indexBy: expect.any(Function),
      indexOf: expect.any(Function),
      init: expect.any(Function),
      is: expect.any(Function),
      isArguments: expect.any(Function),
      isBuffer: expect.any(Function),
      isFirebaseApp: expect.any(Function),
      isIterable: expect.any(Function),
      isIterator: expect.any(Function),
      isPlainFunction: expect.any(Function),
      isReadableStream: expect.any(Function),
      isTransformer: expect.any(Function),
      isUrl: expect.any(Function),
      iterator: expect.any(Function),
      length: expect.any(Function),
      listPromise: expect.any(Function),
      map: expect.any(Function),
      nth: expect.any(Function),
      objectKeys: expect.any(Function),
      Readable: expect.any(Function),
      ReadableBufferStream: expect.any(Function),
      readableStream: expect.any(Function),
      reduce: expect.any(Function),
      reduceRight: expect.any(Function),
      satisfies: expect.any(Function),
      stringToStream: expect.any(Function),
      toLower: expect.any(Function),
      toString: expect.any(Function),
      toUpper: expect.any(Function),
      without: expect.any(Function),
      words: expect.any(Function),
      xfBase: expect.any(Object),
      xmap: expect.any(Function),
      xwrap: expect.any(Function)
    })
  })
})
