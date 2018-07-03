import createEngine from './createEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('getContext', () => {
  test('gets the whole context when no args are given', async () => {
    const engine = createEngine({}, {})
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setContext(val)
      return yield* getContext()
    }

    expect(await runSaga(engine, method, testContext)).toBe(testContext)
  })

  test('gets the specified context path correctly', async () => {
    const engine = createEngine({}, {})
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setContext(val)
      return yield* getContext('bim')
    }

    expect(await runSaga(engine, method, testContext)).toEqual({
      bim: 'bop'
    })
  })

  test('executes the given selector function on the context', async () => {
    const engine = createEngine({}, {})
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setContext(val)
      return yield* getContext((context) => ({
        it: context.bim
      }))
    }

    expect(await runSaga(engine, method, testContext)).toEqual({
      it: 'bop'
    })
  })
})
