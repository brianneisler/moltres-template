import generateEngine from './generateEngine'
import getConfig from './getConfig'
import runSaga from './runSaga'

describe('getConfig', () => {
  test('gets the whole config when no args are given', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      logger: console
    }
    const engine = generateEngine({}, testConfig, testContext)
    const method = function* () {
      return yield* getConfig()
    }

    expect(await runSaga(engine, method, testConfig)).toBe(testConfig)
  })

  test('gets the specified config path correctly', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      logger: console
    }
    const engine = generateEngine({}, testConfig, testContext)
    const method = function* () {
      return yield* getConfig('bim')
    }

    expect(await runSaga(engine, method, testConfig)).toEqual('bop')
  })

  test('executes the given selector function on the config', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      logger: console
    }
    const engine = generateEngine({}, testConfig, testContext)
    const method = function* () {
      return yield* getConfig((config) => ({
        it: config.bim
      }))
    }

    expect(await runSaga(engine, method, testConfig)).toEqual({
      it: 'bop'
    })
  })
})
