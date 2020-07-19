import { createSelector } from '../utils/lang'
import { lockChannel } from '../utils/redux'

import generateEngine from './generateEngine'
import runSaga from './runSaga'
import withQuery from './withQuery'

describe('withQuery', () => {
  test('correctly builds normal query', async () => {
    const testProps = {
      foo: 'foo'
    }
    const testChannel = lockChannel()
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }

    const query = {
      onSnapshot: jest.fn((observer) => {
        observer.next({
          data: () => ({
            bar: 'bar'
          }),
          exists: true,
          id: 'bar1'
        })
        return () => {}
      })
    }
    const createQuery = jest.fn(() => query)
    const queryExtensions = {}
    const statePath = 'bar'
    const selector = createSelector(['foo'], (foo) => ({ foo }))

    const enhancer = withQuery({
      createQuery,
      queryExtensions,
      selector,
      statePath
    })

    const factory = enhancer((props, channel, context) => {
      expect(channel).toBe(testChannel)
      expect(context).toBe(testContext)
      return props
    })
    expect(factory).toBeInstanceOf(Function)

    const engine = generateEngine({}, {}, testContext)
    expect(
      await runSaga(engine, factory, testProps, testChannel, testContext)
    ).toEqual({
      bar: {
        bar: 'bar',
        id: 'bar1'
      },
      foo: 'foo'
    })
    expect(query.onSnapshot).toHaveBeenCalledWith({
      error: expect.any(Function),
      next: expect.any(Function)
    })
  })

  test("if props don't change, should not call query builder", async () => {
    const testChannel = lockChannel()
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }

    const query = {
      onSnapshot: jest.fn((observer) => {
        observer.next({
          data: () => ({
            bar: 'bar'
          }),
          exists: true,
          id: 'bar1'
        })
        return () => {}
      })
    }
    const createQuery = jest.fn(() => query)
    const queryExtensions = {}
    const queryOptions = {}
    const statePath = 'bar'
    const selector = createSelector(['foo'], (foo) => ({ foo }))

    const enhancer = withQuery({
      createQuery,
      queryExtensions,
      queryOptions,
      selector,
      statePath
    })
    const factory = enhancer((props) => props)
    const engine = generateEngine({}, {}, testContext)
    await runSaga(
      engine,
      factory,
      {
        foo: 'foo'
      },
      testChannel,
      testContext
    )

    await runSaga(
      engine,
      factory,
      {
        foo: 'foo'
      },
      testChannel,
      testContext
    )

    expect(createQuery).toHaveBeenCalledWith(
      testContext,
      {
        foo: 'foo'
      },
      queryOptions
    )
    expect(createQuery).toHaveBeenCalledTimes(1)
  })

  test('correctly builds single wildcard document query', async () => {
    const testProps = {
      foo1: {
        barId: 'bar1',
        foo: 'foo1'
      }
    }
    const testChannel = lockChannel()
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }

    const query = {
      onSnapshot: jest.fn((observer) => {
        observer.next({
          data: () => ({
            bar: 'bar-data1'
          }),
          exists: true,
          id: 'bar1'
        })
        return () => {}
      })
    }
    const createQuery = jest.fn((context, props) => {
      expect(props.barId).toBe('bar1')
      return query
    })
    const queryExtensions = {}
    const statePath = ':foo.bar'
    const selector = createSelector([':foo.barId'], (barId) => ({ barId }))

    const enhancer = withQuery({
      createQuery,
      queryExtensions,
      selector,
      statePath
    })

    const factory = enhancer((props, channel, context) => {
      expect(channel).toBe(testChannel)
      expect(context).toBe(testContext)
      return props
    })
    expect(factory).toBeInstanceOf(Function)

    const engine = generateEngine({}, {}, testContext)
    expect(
      await runSaga(engine, factory, testProps, testChannel, testContext)
    ).toEqual({
      foo1: {
        bar: {
          bar: 'bar-data1',
          id: 'bar1'
        },
        barId: 'bar1',
        foo: 'foo1'
      }
    })
    expect(query.onSnapshot).toHaveBeenCalledWith({
      error: expect.any(Function),
      next: expect.any(Function)
    })
  })

  test('correctly builds single wildcard multi query', async () => {
    const testProps = {
      foo1: {
        barId: 'bar1',
        foo: 'foo-data1'
      },
      foo2: {
        barId: 'bar2',
        foo: 'foo-data2'
      },
      foo3: {
        barId: 'bar3',
        foo: 'foo-data3'
      }
    }
    const testChannel = lockChannel()
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }

    const docs = {
      bar1: {
        data: () => ({
          bar: 'bar-data1'
        }),
        exists: true,
        id: 'bar1'
      },
      bar2: {
        data: () => ({
          bar: 'bar-data2'
        }),
        exists: true,
        id: 'bar2'
      },
      bar3: {
        data: () => ({
          bar: 'bar-data3'
        }),
        exists: true,
        id: 'bar3'
      }
    }
    const createQuery = (context, { barId }) => {
      const doc = docs[barId]
      return {
        onSnapshot: jest.fn((observer) => {
          observer.next(doc)
          return () => {}
        })
      }
    }
    const queryExtensions = {}
    const statePath = ':fooId.bar'
    const selector = createSelector([':fooId.barId'], (barId) => ({ barId }))

    const enhancer = withQuery({
      createQuery,
      queryExtensions,
      selector,
      statePath
    })

    const factory = enhancer((props, channel, context) => {
      expect(channel).toBe(testChannel)
      expect(context).toBe(testContext)
      return props
    })
    expect(factory).toBeInstanceOf(Function)

    const engine = generateEngine({}, {}, testContext)
    expect(
      await runSaga(engine, factory, testProps, testChannel, testContext)
    ).toEqual({
      foo1: {
        bar: {
          bar: 'bar-data1',
          id: 'bar1'
        },
        barId: 'bar1',
        foo: 'foo-data1'
      },
      foo2: {
        bar: {
          bar: 'bar-data2',
          id: 'bar2'
        },
        barId: 'bar2',
        foo: 'foo-data2'
      },
      foo3: {
        bar: {
          bar: 'bar-data3',
          id: 'bar3'
        },
        barId: 'bar3',
        foo: 'foo-data3'
      }
    })
  })
})
