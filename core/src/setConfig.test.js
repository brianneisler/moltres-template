import createEngine from './createEngine'
import getConfig from './getConfig'
import runSaga from './runSaga'
import setConfig from './setConfig'

describe('setConfig', () => {
  test('sets the config correctly', async () => {
    const engine = createEngine({}, {})
    const testConfig = { foo: 'bar' }
    const method = function*(val) {
      yield setConfig(val)
      return yield* getConfig()
    }

    expect(await runSaga(engine, method, testConfig)).toBe(testConfig)
  })
})
