describe('index', () => {
  test('require runs without error', () => {
    expect(() => {
      require('./')
    }).not.toThrow()
  })

  test('has buffer methods', () => {
    const mod = require('./buffer')
    expect(mod).toEqual({
      Buffer: expect.any(Function),
      copyBufferToUint8Array: expect.any(Function),
      createBuffer: expect.any(Function),
      isBuffer: expect.any(Function)
    })
  })

  test('has common methods', () => {
    const mod = require('./common')
    expect(mod).toEqual({
      __: expect.any(Object),
      all: expect.any(Function),
      allWith: expect.any(Function),
      apply: expect.any(Function),
      applyIfHas: expect.any(Function),
      bind: expect.any(Function),
      cacheChain: expect.any(Function),
      complement: expect.any(Function),
      compose: expect.any(Function),
      curry: expect.any(Function),
      curryN: expect.any(Function),
      defaultTo: expect.any(Function),
      deferredPromise: expect.any(Function),
      defn: expect.any(Function),
      defprotocol: expect.any(Function),
      delay: expect.any(Function),
      dispatchable: expect.any(Function),
      identical: expect.any(Function),
      identity: expect.any(Function),
      invariant: expect.any(Function),
      isOp: expect.any(Function),
      isResolved: expect.any(Function),
      iterate: expect.any(Function),
      iterateRight: expect.any(Function),
      iterator: expect.any(Function),
      iteratorResolver: expect.any(Function),
      listPromise: expect.any(Function),
      memoize: expect.any(Function),
      memoizeWith: expect.any(Function),
      mix: expect.any(Function),
      nAry: expect.any(Function),
      nArySpread: expect.any(Function),
      noop: expect.any(Function),
      nth: expect.any(Function),
      once: expect.any(Function),
      op: expect.any(Function),
      pipe: expect.any(Function),
      rate: expect.any(Function),
      resolvable: expect.any(Function),
      resolve: expect.any(Function),
      resolveToGenerator: expect.any(Function),
      resolveToGeneratorWith: expect.any(Function),
      resolveWith: expect.any(Function),
      satisfies: expect.any(Function),
      sleep: expect.any(Function),
      weakMemoizeWith: expect.any(Function),
    })
  })

  test('has constants', () => {
    const mod = require('./constants')
    expect(mod).toEqual({
      HAS_ARGS_ENUM_BUG: expect.any(Boolean),
      HAS_OBJECT_ENUM_BUG: expect.any(Boolean),
      MAX_SAFE_INTEGER: expect.any(Number),
      SYMBOL_ITERATOR: expect.anything(),
      SYMBOL_OP: expect.anything()
    })
  })

  test('has crypto methods', () => {
    const mod = require('./crypto')
    expect(mod).toEqual({
      hashStream: expect.any(Function),
      hashString: expect.any(Function)
    })
  })

  test('has data methods', () => {
    const mod = require('./data')
    expect(mod).toEqual({
      // data methods
      addIndex: expect.any(Function),
      always: expect.any(Function),
      any: expect.any(Function),
      anyAtIndex: expect.any(Function),
      append: expect.any(Function),
      assign: expect.any(Function),
      assoc: expect.any(Function),
      assocIndex: expect.any(Function),
      assocPath: expect.any(Function),
      assocProp: expect.any(Function),
      castPath: expect.any(Function),
      clone: expect.any(Function),
      compact: expect.any(Function),
      concat: expect.any(Function),
      contains: expect.any(Function),
      containsWith: expect.any(Function),
      drop: expect.any(Function),
      each: expect.any(Function),
      eachAll: expect.any(Function),
      endsWith: expect.any(Function),
      equals: expect.any(Function),
      every: expect.any(Function),
      everyAtIndex: expect.any(Function),
      filter: expect.any(Function),
      filterAtIndex: expect.any(Function),
      find: expect.any(Function),
      findAtIndex: expect.any(Function),
      findKdx: expect.any(Function),
      first: expect.any(Function),
      flatten: expect.any(Function),
      forEach: expect.any(Function),
      forEachAll: expect.any(Function),
      forEachIndexed: expect.any(Function),
      forEachObjIndexed: expect.any(Function),
      get: expect.any(Function),
      getParent: expect.any(Function),
      getParentPath: expect.any(Function),
      getPath: expect.any(Function),
      getProp: expect.any(Function),
      has: expect.any(Function),
      hasPath: expect.any(Function),
      hasProp: expect.any(Function),
      head: expect.any(Function),
      indexBy: expect.any(Function),
      indexOf: expect.any(Function),
      indexOfAtIndex: expect.any(Function),
      init: expect.any(Function),
      is: expect.any(Function),
      join: expect.any(Function),
      keys: expect.any(Function),
      last: expect.any(Function),
      length: expect.any(Function),
      lens: expect.any(Function),
      lensIndex: expect.any(Function),
      lensPath: expect.any(Function),
      lensProp: expect.any(Function),
      map: expect.any(Function),
      mapAll: expect.any(Function),
      mapIndexed: expect.any(Function),
      mapObjIndexed: expect.any(Function),
      merge: expect.any(Function),
      mergeDeep: expect.any(Function),
      omit: expect.any(Function),
      over: expect.any(Function),
      path: expect.any(Function),
      pathEq: expect.any(Function),
      pick: expect.any(Function),
      prepend: expect.any(Function),
      prop: expect.any(Function),
      propEq: expect.any(Function),
      propOr: expect.any(Function),
      reduce: expect.any(Function),
      reduceIndexed: expect.any(Function),
      reduceObjIndexed: expect.any(Function),
      reduceReducers: expect.any(Function),
      reduceRight: expect.any(Function),
      reject: expect.any(Function),
      remove: expect.any(Function),
      rest: expect.any(Function),
      set: expect.any(Function),
      shallowEquals: expect.any(Function),
      slice: expect.any(Function),
      sort: expect.any(Function),
      stringToPath: expect.any(Function),
      tail: expect.any(Function),
      union: expect.any(Function),
      uniq: expect.any(Function),
      values: expect.any(Function),
      walk: expect.any(Function),
      walkReduce: expect.any(Function),
      walkReduceDepthFirst: expect.any(Function),
      walkReducePath: expect.any(Function),
      whereEq: expect.any(Function),
      without: expect.any(Function)
    })
  })

  test('has error methods', () => {
    const mod = require('./error')
    expect(mod).toEqual({
      createException: expect.any(Function),
      error: expect.any(Function),
      generateStackTrace: expect.any(Function),
      throwable: expect.any(Function)
    })
  })

  test('has fetch methods', () => {
    const mod = require('./fetch')
    expect(mod).toEqual({
      fetch: expect.any(Function)
    })
  })

  test('has firebase methods', () => {
    const mod = require('./firebase')
    expect(mod).toMatchObject({
      isFirebaseApp: expect.any(Function),
      uploadFileByteArray: expect.any(Function)
    })
  })

  test('has graph methods', () => {
    const mod = require('./graph')
    expect(mod).toMatchObject({
      execGraph: expect.any(Function),
      getOutNodes: expect.any(Function),
      isGraph: expect.any(Function),
      newGraph: expect.any(Function),
      traversePostorder: expect.any(Function)
    })
  })

  test('has ip methods', () => {
    const mod = require('./ip')
    expect(mod).toEqual({
      isIp: expect.any(Function),
      lookupIp: expect.any(Function)
    })
  })

  test('has lang methods', () => {
    const mod = require('./lang')

    // NOTE BRN: There are values exported from here that cause extremely long diffs to happen. A match is much simpler than an equals check and does not cause that to happe for this folder.
    expect(mod).toMatchObject({
      arrayConcat: expect.any(Function),
      arrayFlatten: expect.any(Function),
      arrayForEach: expect.any(Function),
      arrayFromIterator: expect.any(Function),
      arrayLikeIterator: expect.any(Function),
      arrayLikeKeys: expect.any(Function),
      arrayLikeReduce: expect.any(Function),
      arrayLikeReduceRight: expect.any(Function),
      arrayLikeSlice: expect.any(Function),
      assignPropertyDescriptors: expect.any(Function),
      baseGetTag: expect.any(Function),
      clonePropertyDescriptors: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // freeGlobal: expect.any(Object),

      indexEndOffset: expect.any(Function),
      isArguments: expect.any(Function),
      isArray: expect.any(Function),
      isArrayBuffer: expect.any(Function),
      isArrayLike: expect.any(Function),
      isBoolean: expect.any(Function),
      isDate: expect.any(Function),
      isElement: expect.any(Function),
      isError: expect.any(Function),
      isFunction: expect.any(Function),
      isGenerator: expect.any(Function),
      isGeneratorFunction: expect.any(Function),
      isIndex: expect.any(Function),
      isInfinity: expect.any(Function),
      isInteger: expect.any(Function),
      isIterable: expect.any(Function),
      isIterator: expect.any(Function),
      isKey: expect.any(Function),
      isLength: expect.any(Function),
      isMap: expect.any(Function),
      isNaN: expect.any(Function),
      isNativeObject: expect.any(Function),
      isNil: expect.any(Function),
      isNull: expect.any(Function),
      isNumber: expect.any(Function),
      isObject: expect.any(Function),
      isObjectLike: expect.any(Function),
      isPlainFunction: expect.any(Function),
      isPlainObject: expect.any(Function),
      isPromise: expect.any(Function),
      isPrototype: expect.any(Function),
      isRegExp: expect.any(Function),
      isSet: expect.any(Function),
      isString: expect.any(Function),
      isSymbol: expect.any(Function),
      isTransformer: expect.any(Function),
      isTypedArray: expect.any(Function),
      isUndefined: expect.any(Function),
      isUrl: expect.any(Function),
      isWeakMap: expect.any(Function),
      isWeakSet: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // nodeTypes: expect.any(Object),

      objectCreate: expect.any(Function),
      objectDefineProperty: expect.any(Function),
      objectGetOwnPropertyDescriptor: expect.any(Function),
      objectGetOwnPropertySymbols: expect.any(Function),
      objectHasOwnProperty: expect.any(Function),
      objectIterator: expect.any(Function),
      objectKeys: expect.any(Function),
      objectToString: expect.any(Function),

      // NOTE BRN: This is commented out because it causes an extremely long diff to happen in Jest
      // root: expect.any(Object),

      reflectOwnKeys: expect.any(Function),
      stringToLowerCase: expect.any(Function),
      toFinite: expect.any(Function),
      toFunctionName: expect.any(Function),
      toInteger: expect.any(Function),
      toNumber: expect.any(Function),
      toObject: expect.any(Function),
      toString: expect.any(Function),
      toStringTag: expect.any(Function),
      toType: expect.any(Function)
    })
  })

  test('has logging methods', () => {
    const mod = require('./logging')
    expect(mod).toEqual({
      log: expect.any(Function)
    })
  })

  test('has logic methods', () => {
    const mod = require('./logic')
    expect(mod).toEqual({
      and: expect.any(Function),
      isEmpty: expect.any(Function),
      not: expect.any(Function),
      or: expect.any(Function)
    })
  })

  test('has math methods', () => {
    const mod = require('./math')
    expect(mod).toEqual({
      randomInt: expect.any(Function)
    })
  })

  test('has mime methods', () => {
    const mod = require('./mime')
    expect(mod).toEqual({
      contentTypeToCharset: expect.any(Function),
      contentTypeToExtension: expect.any(Function),
      lookupContentType: expect.any(Function),
      toContentType: expect.any(Function)
    })
  })

  test('has path methods', () => {
    const mod = require('./path')
    expect(mod).toEqual({
      findPath: expect.any(Function)
    })
  })

  test('has stream methods', () => {
    const mod = require('./stream')
    expect(mod).toEqual({
      bufferToStream: expect.any(Function),
      isReadableStream: expect.any(Function),
      Readable: expect.any(Function),
      ReadableBufferStream: expect.any(Function),
      readableStream: expect.any(Function),
      stringToStream: expect.any(Function)
    })
  })

  test('has string methods', () => {
    const mod = require('./string')
    expect(mod).toEqual({
      asciiSize: expect.any(Function),
      asciiToArray: expect.any(Function),
      camelCase: expect.any(Function),
      capitalize: expect.any(Function),
      castSlice: expect.any(Function),
      charCount: expect.any(Function),
      createCaseFirst: expect.any(Function),
      createPadding: expect.any(Function),
      hasUnicode: expect.any(Function),
      lowerCase: expect.any(Function),
      padStart: expect.any(Function),
      repeat: expect.any(Function),
      split: expect.any(Function),
      splitMapJoin: expect.any(Function),
      stringSize: expect.any(Function),
      stringToArray: expect.any(Function),
      toLower: expect.any(Function),
      toUpper: expect.any(Function),
      trim: expect.any(Function),
      unicodeSize: expect.any(Function),
      unicodeToArray: expect.any(Function),
      unicodeWords: expect.any(Function),
      upperFirst: expect.any(Function),
      words: expect.any(Function)
    })
  })

  test('has transducer methods', () => {
    const mod = require('./transducer')
    expect(mod).toEqual({
      xfBase: expect.any(Object),
      xmap: expect.any(Function),
      xwrap: expect.any(Function)
    })
  })
})
