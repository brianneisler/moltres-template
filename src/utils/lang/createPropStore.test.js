import { channel as createChannel } from 'redux-saga'

import createPropStore from './createPropStore'

describe('createPropStore', () => {
  test('throws error if no channel is provided', () => {
    expect(() => {
      createPropStore()
    }).toThrow(/^Channel is required$/)
  })

  test('props start as an empty object', () => {
    const propStore = createPropStore(createChannel())
    expect(propStore.getProps()).toEqual({})
  })

  test('handles an error action', () => {
    const propStore = createPropStore(createChannel())
    propStore.put({
      error: { foo: 'bar' },
      key: '$',
      type: 'error'
    })
    expect(propStore.getProps()).toEqual({
      error: { foo: 'bar' }
    })
  })

  test('handles an assoc action', () => {
    const propStore = createPropStore(createChannel())
    propStore.put({
      key: '$',
      type: 'assoc',
      value: { foo: 'bar' }
    })
    expect(propStore.getProps()).toEqual({
      foo: 'bar'
    })
  })

  test('setting error unsets existing props', () => {
    const propStore = createPropStore(createChannel())
    propStore.put({
      key: '$',
      type: 'assoc',
      value: { foo: 'bar' }
    })
    propStore.put({
      error: { bar: 'baz' },
      key: '$',
      type: 'error'
    })

    expect(propStore.getProps()).toEqual({
      error: { bar: 'baz' }
    })
  })

  test('setting props to an empty object on the first call puts an empty object to the channel', async () => {
    const channel = createChannel()
    const propStore = createPropStore(channel)

    propStore.put({
      key: '$',
      type: 'assoc',
      value: {}
    })

    const result = await propStore.take()

    expect(result).toEqual({})
    expect(propStore.getProps()).toBe(result)
  })

  test('setting an error twice does not push duplicate ', async () => {
    const channel = createChannel()
    const propStore = createPropStore(channel)
    const error1 = new Error('baz')
    const error2 = new Error('baz')

    propStore.put({
      error: error1,
      key: '$',
      type: 'error'
    })
    propStore.put({
      error: error2,
      key: '$',
      type: 'error'
    })

    const result = await new Promise((resolve) => {
      channel.take((value) => resolve(value))
    })
    const result2 = await Promise.race([
      new Promise((resolve) => {
        channel.take((value) => resolve(value))
      }),
      new Promise((resolve) => {
        setTimeout(() => resolve({ timeout: true }), 1000)
      })
    ])

    expect(result).toEqual({ type: 'refresh' })
    expect(result2).toEqual({ timeout: true })

    expect(propStore.getProps().error).toBe(error1)
    expect(propStore.getProps().error).not.toBe(error2)
  })
})
