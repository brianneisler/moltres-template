import createEngine from './createEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('setContext', () => {
  test('sets the context correctly', async () => {
    const engine = createEngine({}, {})
    const testContext = { foo: 'bar' }
    const method = function*(val) {
      yield setContext(val)
      return yield* getContext()
    }

    expect(await runSaga(engine, method, testContext)).toBe(testContext)
  })
})
