import createContext from './createContext'
import generateEngine from './generateEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('setContext', () => {
  it('sets the context correctly', async () => {
    const testContext = {
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      yield* setContext('foo', 'bar')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual(
      expect.objectContaining({
        foo: 'bar',
        source: 'https://moltres.io/test'
      })
    )
  })

  it('sets the context correctly using an array', async () => {
    const testContext = {
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      yield* setContext(['foo', 'bar'], 'baz')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual(
      expect.objectContaining({
        foo: {
          bar: 'baz'
        },
        source: 'https://moltres.io/test'
      })
    )
  })

  it('sets the context correctly using an empty array', async () => {
    const testContext = {
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      yield* setContext([], createContext({ foo: 'bar' }))
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual(
      expect.objectContaining({
        foo: 'bar'
      })
    )
  })
})
