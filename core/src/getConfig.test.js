import createEngine from './createEngine'
import getConfig from './getConfig'
import runSaga from './runSaga'
import setConfig from './setConfig'

describe('getConfig', () => {
  test('gets the whole config when no args are given', async () => {
    const engine = createEngine({}, {})
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setConfig(val)
      return yield* getConfig()
    }

    expect(await runSaga(engine, method, testConfig)).toBe(testConfig)
  })

  test('gets the specified config path correctly', async () => {
    const engine = createEngine({}, {})
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setConfig(val)
      return yield* getConfig('bim')
    }

    expect(await runSaga(engine, method, testConfig)).toEqual({
      bim: 'bop'
    })
  })

  test('executes the given selector function on the config', async () => {
    const engine = createEngine({}, {})
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const method = function*(val) {
      yield setConfig(val)
      return yield* getConfig((config) => ({
        it: config.bim
      }))
    }

    expect(await runSaga(engine, method, testConfig)).toEqual({
      it: 'bop'
    })
  })
})
