describe('index', () => {
  test('require runs without error', () => {
    expect(() => {
      require('./')
    }).not.toThrow()
  })

  test('has buffer methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      Buffer: expect.any(Function),
      copyBufferToUint8Array: expect.any(Function),
      createBuffer: expect.any(Function),
      isBuffer: expect.any(Function)
    })
  })

  test('has crypto methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      hashStream: expect.any(Function),
      hashString: expect.any(Function)
    })
  })

  test('has data methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      // data methods
      __: expect.any(Object),
      addIndex: expect.any(Function),
      always: expect.any(Function),
      any: expect.any(Function),
      anyAtIndex: expect.any(Function),
      append: expect.any(Function),
      applyIfHas: expect.any(Function),
      arrayIterator: expect.any(Function),
      arrayIteratorAtIndex: expect.any(Function),
      arrayLikeKeys: expect.any(Function),
      asciiSize: expect.any(Function),
      asciiToArray: expect.any(Function),
      assoc: expect.any(Function),
      assocIndex: expect.any(Function),
      assocPath: expect.any(Function),
      assocProp: expect.any(Function),
      baseGetTag: expect.any(Function),
      baseToString: expect.any(Function),
      bind: expect.any(Function),
      cacheChain: expect.any(Function),
      camelCase: expect.any(Function),
      capitalize: expect.any(Function),
      castPath: expect.any(Function),
      castSlice: expect.any(Function),
      charCount: expect.any(Function),
      compact: expect.any(Function),
      compose: expect.any(Function),
      concat: expect.any(Function),
      contains: expect.any(Function),
      createCaseFirst: expect.any(Function),
      createPadding: expect.any(Function),
      curry: expect.any(Function),
      curryN: expect.any(Function),
      defaultTo: expect.any(Function),
      deferredPromise: expect.any(Function),
      defn: expect.any(Function),
      defprotocol: expect.any(Function),
      delay: expect.any(Function),
      dispatchable: expect.any(Function),
      drop: expect.any(Function),
      each: expect.any(Function),
      eachAll: expect.any(Function),
      endsWith: expect.any(Function),
      equals: expect.any(Function),
      find: expect.any(Function),
      findAtIndex: expect.any(Function),
      flatten: expect.any(Function),
      forEach: expect.any(Function),
      forEachAll: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // freeGlobal: expect.any(Object),
      get: expect.any(Function),
      getPath: expect.any(Function),
      getProp: expect.any(Function),
      getTag: expect.any(Function),
      has: expect.any(Function),
      hasPath: expect.any(Function),
      hasProp: expect.any(Function),
      hasUnicode: expect.any(Function),
      head: expect.any(Function),
      identity: expect.any(Function),
      indexBy: expect.any(Function),
      indexOf: expect.any(Function),
      init: expect.any(Function),
      invariant: expect.any(Function),
      is: expect.any(Function),
      isArguments: expect.any(Function),
      isArray: expect.any(Function),
      isArrayLike: expect.any(Function),
      isEmpty: expect.any(Function),
      isFunction: expect.any(Function),
      isGenerator: expect.any(Function),
      isGeneratorFunction: expect.any(Function),
      isIndex: expect.any(Function),
      isInteger: expect.any(Function),
      isIterable: expect.any(Function),
      isIterator: expect.any(Function),
      isKey: expect.any(Function),
      isLength: expect.any(Function),
      isMap: expect.any(Function),
      isNaN: expect.any(Function),
      isNil: expect.any(Function),
      isNull: expect.any(Function),
      isNumber: expect.any(Function),
      isObject: expect.any(Function),
      isObjectLike: expect.any(Function),
      isPlainFunction: expect.any(Function),
      isPlainObject: expect.any(Function),
      isPromise: expect.any(Function),
      isPrototype: expect.any(Function),
      isString: expect.any(Function),
      isSymbol: expect.any(Function),
      isTransformer: expect.any(Function),
      isTypedArray: expect.any(Function),
      isUndefined: expect.any(Function),
      isUrl: expect.any(Function),
      iterate: expect.any(Function),
      iterateAll: expect.any(Function),
      iterator: expect.any(Function),
      join: expect.any(Function),
      keys: expect.any(Function),
      last: expect.any(Function),
      length: expect.any(Function),
      lens: expect.any(Function),
      lensIndex: expect.any(Function),
      lensPath: expect.any(Function),
      lensProp: expect.any(Function),
      listPromise: expect.any(Function),
      map: expect.any(Function),
      mapAll: expect.any(Function),
      mapIndexed: expect.any(Function),
      mapObjIndexed: expect.any(Function),
      memoize: expect.any(Function),
      memoizeWith: expect.any(Function),
      merge: expect.any(Function),
      nAry: expect.any(Function),
      nArySpread: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // nodeTypes: expect.any(Object),
      noop: expect.any(Function),
      nth: expect.any(Function),
      objectIterator: expect.any(Function),
      objectKeys: expect.any(Function),
      omit: expect.any(Function),
      once: expect.any(Function),
      over: expect.any(Function),
      padStart: expect.any(Function),
      path: expect.any(Function),
      pathEq: expect.any(Function),
      pick: expect.any(Function),
      pipe: expect.any(Function),
      prepend: expect.any(Function),
      prop: expect.any(Function),
      propEq: expect.any(Function),
      propOr: expect.any(Function),
      randomInt: expect.any(Function),
      rate: expect.any(Function),
      reduce: expect.any(Function),
      reduceIndexed: expect.any(Function),
      reduceObjIndexed: expect.any(Function),
      reduceReducers: expect.any(Function),
      reduceRight: expect.any(Function),
      reject: expect.any(Function),
      repeat: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // root: expect.any(Object),
      satisfies: expect.any(Function),
      set: expect.any(Function),
      slice: expect.any(Function),
      split: expect.any(Function),
      splitMapJoin: expect.any(Function),
      stringSize: expect.any(Function),
      stringToArray: expect.any(Function),
      stringToPath: expect.any(Function),
      tail: expect.any(Function),
      toLower: expect.any(Function),
      toString: expect.any(Function),
      toUpper: expect.any(Function),
      trim: expect.any(Function),
      unicodeSize: expect.any(Function),
      unicodeToArray: expect.any(Function),
      unicodeWords: expect.any(Function),
      upperFirst: expect.any(Function),
      values: expect.any(Function),
      weakMemoizeWith: expect.any(Function),
      without: expect.any(Function),
      words: expect.any(Function),
      xfBase: expect.any(Object),
      xmap: expect.any(Function),
      xwrap: expect.any(Function)
    })
  })

  test('has fetch methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      fetch: expect.any(Function)
    })
  })

  test('has firebase methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      isFirebaseApp: expect.any(Function),
      uploadFileByteArray: expect.any(Function)
    })
  })

  test('has graph methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      execGraph: expect.any(Function),
      getOutNodes: expect.any(Function),
      isGraph: expect.any(Function),
      newGraph: expect.any(Function),
      traversePostorder: expect.any(Function)
    })
  })

  test('has mime methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      contentTypeToCharset: expect.any(Function),
      contentTypeToExtension: expect.any(Function),
      lookupContentType: expect.any(Function),
      toContentType: expect.any(Function)
    })
  })

  test('has path methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      findPath: expect.any(Function)
    })
  })

  test('has saga methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      isOp: expect.any(Function),
      isResolvable: expect.any(Function),
      resolve: expect.any(Function),
      resolveAll: expect.any(Function),
      resolveToGenerator: expect.any(Function),
      resolveToGeneratorWith: expect.any(Function),
      resolveToPromise: expect.any(Function),
      resolveToResolver: expect.any(Function),
      resolveWith: expect.any(Function)
    })
  })

  test('has stream methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      bufferToStream: expect.any(Function),
      isReadableStream: expect.any(Function),
      Readable: expect.any(Function),
      ReadableBufferStream: expect.any(Function),
      readableStream: expect.any(Function),
      stringToStream: expect.any(Function)
    })
  })

  test('has throwable methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      newException: expect.any(Function)
    })
  })

  test('has walk methods', () => {
    const mod = require('./')
    expect(mod).toMatchObject({
      walk: expect.any(Function),
      walkDepthFirst: expect.any(Function)
    })
  })
})
