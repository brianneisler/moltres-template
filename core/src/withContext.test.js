import call from './call'
import compose from './compose'
import createEngine from './createEngine'
import runSaga from './runSaga'
import setContext from './setContext'
import withContext from './withContext'

describe('withContext', () => {
  test('has the context injected as a paremeter', async () => {
    const engine = createEngine({}, {})
    const testContext = {
      foo: 'bar',
      bim: 'bop'
    }

    const enhance = compose(withContext('foo'))
    const handler = enhance(function*(data) {
      return data
    })
    const method = function*(val) {
      yield setContext(val)
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method, testContext)).toEqual({
      foo: 'bar',
      bam: 'bow'
    })
  })
})
