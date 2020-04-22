import generateEngine from './generateEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('setContext', () => {
  it('sets the context correctly', async () => {
    const engine = generateEngine({}, {}, {})
    const method = function* () {
      yield* setContext('foo', 'bar')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar'
    })
  })

  it('sets the context correctly using an array', async () => {
    const engine = generateEngine({}, {}, {})
    const method = function* () {
      yield* setContext(['foo', 'bar'], 'baz')
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: {
        bar: 'baz'
      }
    })
  })

  it('sets the context correctly using an empty array', async () => {
    const engine = generateEngine({}, {}, {})
    const method = function* () {
      yield* setContext([], { foo: 'bar' })
      return yield* getContext()
    }
    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar'
    })
  })
})
