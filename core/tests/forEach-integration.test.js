import {createEngine, forEach, runSaga } from '../src'

describe('forEach integration tests', () => {
  test('resolves a promise to generator and continues execution', async () => {
    const engine = createEngine()

    const returnValue = (arg1, arg2) => arg1 + arg2

    const runGenerator = function*(arg1, arg2) {
      return yield apply(null, returnValue, [arg1, arg2])
    }

    const asyncReturnGenerator = async (arg1, arg2) => {
      return runGenerator(arg1, arg2)
    }

    const method = function*() {
      return yield apply(null, asyncReturnGenerator, ['abc', 123])

      return forEachSeries(function* (value, idx) {

      }, [])
    }

    expect(await runSaga(engine, method)).toBe('abc123')
  })
})
