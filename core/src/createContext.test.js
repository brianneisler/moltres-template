import createContext from './createContext'

describe('createContext', () => {
  test('creates a context object', () => {
    const context = createContext()
    expect(context).toEqual({
      get: expect.any(Function),
      has: expect.any(Function),
      merge: expect.any(Function),
      set: expect.any(Function),
      toJSON: expect.any(Function),
      toObject: expect.any(Function)
    })
  })

  test('context data is available', () => {
    const data = {
      foo: 'bar'
    }
    const context = createContext(data)

    expect(context.get('foo')).toEqual('bar')
    expect(context.has('foo')).toEqual(true)
    expect(context.has('bar')).toEqual(false)
    expect(context.toJSON()).toEqual(JSON.stringify(data))
    expect(context.toObject()).toBe(data)
  })

  test('setting context returns new value', () => {
    const data = {
      foo: 'bar'
    }
    const context = createContext(data)

    const context2 = context.set('foo', 'bop')
    expect(context.get('foo')).toEqual('bar')
    expect(context2.get('foo')).toEqual('bop')
    expect(context).not.toBe(context2)
  })
})
