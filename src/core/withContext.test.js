import { call } from 'redux-saga/effects'
import compose from '../utils/data/compose'
import generateEngine from './generateEngine'
import runSaga from './runSaga'
import withConfig from './withConfig'
import withContext from './withContext'

describe('withContext', () => {
  test('has the context injected as a paremeter selected using a string', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const engine = generateEngine({}, {}, testContext)
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
      }
    }
    const engine = generateEngine({}, {}, testContext)
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
      foo: 'bar'
    }
    const engine = generateEngine({}, {}, testContext)
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
      foo: 'bar'
    }
    const engine = generateEngine({}, {}, testContext)
    const handler = withContext()(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop',
      foo: 'bar'
    })
  })

  test('returns entire context when no parameters', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const engine = generateEngine({}, {}, testContext)
    const handler = withContext()(function* (data) {
      return data
    })
    const method = function* () {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bam: 'bow',
      bim: 'bop',
      foo: 'bar'
    })
  })

  test('Integration: works in compose', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar'
    }
    const testConfig = {
      fig: 'ure'
    }
    const engine = generateEngine({}, testConfig, testContext)
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
      foo: 'bar'
    })
  })
})