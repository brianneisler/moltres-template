import call from './call'
import createEngine from './createEngine'
import runSaga from './runSaga'
import withConfig from './withConfig'

describe('withConfig', () => {
  test('has the config injected as a paremeter selected using a string', async () => {
    const testConfig = {
      foo: 'bar',
      bim: 'bop'
    }
    const engine = createEngine({}, testConfig)
    const handler = withConfig('foo')(function*(data) {
      return data
    })
    const method = function*() {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar',
      bam: 'bow'
    })
  })

  test('selects deep config with path', async () => {
    const testConfig = {
      foo: {
        bim: 'bop',
        bay: 'bee'
      },
      bar: 'baz'
    }
    const engine = createEngine({}, testConfig)
    const handler = withConfig('foo.bim')(function*(data) {
      return data
    })
    const method = function*() {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      foo: {
        bim: 'bop'
      },
      bam: 'bow'
    })
  })

  test('executes selector when selector is a function', async () => {
    const testConfig = {
      foo: 'bar',
      bim: 'bop'
    }
    const engine = createEngine({}, testConfig)
    const selector = jest.fn((config) => ({
      bim: config.bim
    }))
    const handler = withConfig(selector)(function*(data) {
      return data
    })
    const method = function*() {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bim: 'bop',
      bam: 'bow'
    })
    expect(selector).toHaveBeenCalledWith(testConfig)
  })
})
