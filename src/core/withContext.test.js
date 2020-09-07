import { call } from 'redux-saga/effects'

import compose from '../utils/lang/compose'

import generateEngine from './generateEngine'
import runSaga from './runSaga'
import withConfig from './withConfig'
import withContext from './withContext'

describe('withContext', () => {
  test('has the context injected as a paremeter selected using a string', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withContext('foo')(function* (data) {
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

  test('selects deep context with path', async () => {
    const testContext = {
      bar: 'baz',
      foo: {
        bay: 'bee',
        bim: 'bop'
      },
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withContext(['foo', 'bim'])(function* (data) {
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
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const selector = jest.fn((context) => ({
      bim: context.bim
    }))
    const handler = withContext(selector)(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop'
    })
    expect(selector).toHaveBeenCalledWith(testContext)
  })

  test('returns entire context when no parameters', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withContext()(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    })
  })

  test('returns entire context when no parameters', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const handler = withContext()(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop',
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    })
  })

  test('Integration: works in compose', async () => {
    const testConfig = {
      fig: 'ure'
    }
    const testContext = {
      bim: 'bop',
      config: testConfig,
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const enhance = compose(
      withContext(),
      withConfig((config) => ({
        config
      }))
    )
    const handler = enhance(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop',
      config: {
        fig: 'ure'
      },
      foo: 'bar',
      logger: console,
      source: 'https://moltres.io/test'
    })
  })
})
