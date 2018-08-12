import createEngine from './createEngine'
import getConfig from './getConfig'
import runSaga from './runSaga'
import setConfig from './setConfig'

describe('setConfig', () => {
  test('sets the config correctly', async () => {
    const engine = createEngine()

    const method = function*() {
      yield* setConfig('foo', 'bar')
      return yield* getConfig()
    }

    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar'
    })
  })
})
