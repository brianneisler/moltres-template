import { call, createEngine, runSaga } from '../src'

describe('call integration tests', () => {
  test('resolves a promise to generator and continues execution', async () => {
    const engine = createEngine()

    const returnValue = (arg1, arg2) => arg1 + arg2
    const runGenerator = function*(arg1, arg2) {
      return yield call(returnValue, arg1, arg2)
    }
    const asyncReturnGenerator = async (arg1, arg2) => {
      return runGenerator(arg1, arg2)
    }

    const method = function*() {
      return yield call(asyncReturnGenerator, 'abc', 123)
    }

    expect(await runSaga(engine, method)).toBe('abc123')
  })
})
