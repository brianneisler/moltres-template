import handleAction from './handleAction'

describe('handleAction', () => {
  test('correctly prefixes with an empty object if only an event is received', () => {
    const testEvent = { type: 'bar' }
    const testResult = { foo: 'bar' }
    const internalHandler = (context, event) => {
      expect(context).toEqual({})
      expect(event).toBe(testEvent)
      return testResult
    }
    const handler = handleAction(internalHandler)
    const result = handler(testEvent)
    expect(result).toBe(testResult)
  })

  test('leaves context in place if sent as argument', () => {
    const testEvent = { type: 'bar' }
    const testResult = { foo: 'bar' }
    const testContext = { bim: 'bop' }
    const internalHandler = (context, event) => {
      expect(context).toBe(testContext)
      expect(event).toBe(testEvent)
      return testResult
    }
    const handler = handleAction(internalHandler)
    const result = handler(testContext, testEvent)
    expect(result).toBe(testResult)
  })

  test('filters event by string type', () => {
    const testEvent = { type: 'bar' }
    const testResult = { foo: 'bar' }
    const testContext = { bim: 'bop' }
    const internalHandler = (context, event) => {
      expect(context).toBe(testContext)
      expect(event).toBe(testEvent)
      return testResult
    }
    const handler = handleAction(internalHandler, 'bar')
    const result = handler(testContext, testEvent)
    expect(result).toBe(testResult)

    const filteredHandler = handleAction(() => {}, 'baz')
    const filteredResult = filteredHandler(testContext, testEvent)
    expect(filteredResult).toBe(testContext)
  })

  test('handler defaults to identity', () => {
    const testEvent = { type: 'bar' }
    const testContext = { bim: 'bop' }
    const handler = handleAction()
    const resultEventOnly = handler(testEvent)
    expect(resultEventOnly).toEqual({})

    const resultWithContext = handler(testContext, testEvent)
    expect(resultWithContext).toBe(testContext)
  })

  test('handler returns empty object when given no args', () => {
    const handler = handleAction()
    const resultNoArgs = handler()
    expect(resultNoArgs).toEqual({})
  })

  test('handler accepts object with throw and next', () => {
    const testEvent = { type: 'bar' }
    const testResult = { foo: 'bar' }
    const testContext = { bim: 'bop' }
    const throwHandler = () => {}
    const nextHandler = (context, event) => {
      expect(context).toBe(testContext)
      expect(event).toBe(testEvent)
      return testResult
    }
    const handler = handleAction({
      next: nextHandler,
      throw: throwHandler
    })
    const result = handler(testContext, testEvent)
    expect(result).toBe(testResult)
  })

  test('handler accepts handler object with throw and next', () => {
    const testEvent = { type: 'bar' }
    const testResult = { foo: 'bar' }
    const testContext = { bim: 'bop' }
    const throwHandler = () => {}
    const nextHandler = (context, event) => {
      expect(context).toBe(testContext)
      expect(event).toBe(testEvent)
      return testResult
    }
    const handler = handleAction({
      next: nextHandler,
      throw: throwHandler
    })
    const result = handler(testContext, testEvent)
    expect(result).toBe(testResult)
  })

  test('handler defaults throw and next to identity with empty object', () => {
    const testEvent = { type: 'bar' }
    const testContext = { bim: 'bop' }
    const handler = handleAction({})
    const resultEventOnly = handler(testEvent)
    expect(resultEventOnly).toEqual({})

    const resultWithContext = handler(testContext, testEvent)
    expect(resultWithContext).toBe(testContext)
  })

  test('throw handler is executed when error is set', () => {
    const testErrorEvent = { type: 'bar', payload: new Error('test'), error: true }
    const testResult = { foo: 'bar' }
    const testContext = { bim: 'bop' }
    const throwHandler = (context, event) => {
      expect(context).toBe(testContext)
      expect(event).toBe(testErrorEvent)
      return testResult
    }
    const nextHandler = () => {}
    const handler = handleAction({
      next: nextHandler,
      throw: throwHandler
    })
    const result = handler(testContext, testErrorEvent)
    expect(result).toBe(testResult)
  })
})
