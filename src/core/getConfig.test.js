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
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getConfig()
    }

    expect(await runSaga(engine, method)).toBe(testConfig)
  })

  test('gets the specified config path correctly', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getConfig('bim')
    }

    expect(await runSaga(engine, method)).toEqual('bop')
  })

  test('executes the given selector function on the config', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getConfig((config) => ({
        it: config.bim
      }))
    }

    expect(await runSaga(engine, method)).toEqual({
      it: 'bop'
    })
  })
})
