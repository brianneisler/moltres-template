import { call } from 'redux-saga/effects'

import generateEngine from './generateEngine'
import runSaga from './runSaga'
import withConfig from './withConfig'

describe('withConfig', () => {
  test('has the config injected as a paremeter selected using a string', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withConfig('foo')(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      foo: 'bar'
    })
  })

  test('selects deep config with array path', async () => {
    const testConfig = {
      bar: 'baz',
      foo: {
        bay: 'bee',
        bim: 'bop'
      }
    }
    const testContext = {
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withConfig(['foo', 'bim'])(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      foo: {
        bim: 'bop'
      }
    })
  })

  test('executes selector when selector is a function', async () => {
    const testConfig = {
      bim: 'bop',
      foo: 'bar'
    }
    const testContext = {
      config: testConfig,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const selector = jest.fn((config) => ({
      bim: config.bim
    }))
    const handler = withConfig(selector)(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop'
    })
    expect(selector).toHaveBeenCalledWith(testConfig)
  })
})
