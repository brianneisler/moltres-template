import generateEngine from './generateEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('setContext', () => {
  it('sets the context correctly', async () => {
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, {}, testContext)
    const method = function* () {
      yield* setContext('foo', 'bar')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    })
  })

  it('sets the context correctly using an array', async () => {
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, {}, testContext)
    const method = function* () {
      yield* setContext(['foo', 'bar'], 'baz')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: {
        bar: 'baz'
      },
      logger: console,
      source: 'https://moltres.io/test'
    })
  })

  it('sets the context correctly using an empty array', async () => {
    const testContext = {
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, {}, testContext)
    const method = function* () {
      yield* setContext([], { foo: 'bar' })
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar'
    })
  })
})
