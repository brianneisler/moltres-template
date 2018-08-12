import createContext from './createContext'
import createEngine from './createEngine'
import getContext from './getContext'
import runSaga from './runSaga'

describe('getContext', () => {
  test('gets the whole context when no args are given', async () => {
    const testContext = createContext({
      bim: 'bop',
      foo: 'bar'
    })
    const engine = createEngine({}, {}, testContext)
    const method = function*() {
      return yield* getContext()
    }

    expect(await runSaga(engine, method, testContext)).toBe(testContext.toObject())
  })

  test('gets the specified context path correctly', async () => {
    const testContext = createContext({
      bim: 'bop',
      foo: 'bar'
    })
    const engine = createEngine({}, {}, testContext)
    const method = function*() {
      return yield* getContext('bim')
    }

    expect(await runSaga(engine, method)).toEqual('bop')
  })

  test('executes the given selector function on the context', async () => {
    const testContext = createContext({
      bim: 'bop',
      foo: 'bar'
    })
    const engine = createEngine({}, {}, testContext)
    const method = function*() {
      return yield* getContext((context) => ({
        it: context.bim
      }))
    }

    expect(await runSaga(engine, method, testContext)).toEqual({
      it: 'bop'
    })
  })
})
