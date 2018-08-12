import call from './call'
import createContext from './createContext'
import createEngine from './createEngine'
import runSaga from './runSaga'
import withContext from './withContext'

describe('withContext', () => {
  test('has the context injected as a paremeter selected using a string', async () => {
    const testContext = createContext({
      foo: 'bar',
      bim: 'bop'
    })
    const engine = createEngine({}, {}, testContext)
    const handler = withContext('foo')(function*(data) {
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

  test('selects deep context with path', async () => {
    const testContext = createContext({
      foo: {
        bim: 'bop',
        bay: 'bee'
      },
      bar: 'baz'
    })
    const engine = createEngine({}, {}, testContext)
    const handler = withContext('foo.bim')(function*(data) {
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
    const testData = {
      foo: 'bar',
      bim: 'bop'
    }
    const testContext = createContext(testData)
    const engine = createEngine({}, {}, testContext)
    const selector = jest.fn((context) => ({
      bim: context.bim
    }))
    const handler = withContext(selector)(function*(data) {
      return data
    })
    const method = function*() {
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method)).toEqual({
      bim: 'bop',
      bam: 'bow'
    })
    expect(selector).toHaveBeenCalledWith(testData)
  })
})
