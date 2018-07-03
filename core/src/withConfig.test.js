import call from './call'
import compose from './compose'
import createEngine from './createEngine'
import runSaga from './runSaga'
import setConfig from './setConfig'
import withConfig from './withConfig'

describe('withConfig', () => {
  test('has the config injected as a paremeter', async () => {
    const engine = createEngine({}, {})
    const testConfig = {
      foo: 'bar',
      bim: 'bop'
    }

    const enhance = compose(withConfig('foo'))
    const handler = enhance(function*(data) {
      return data
    })
    const method = function*(val) {
      yield setConfig(val)
      return yield call(handler, { bam: 'bow' })
    }

    expect(await runSaga(engine, method, testConfig)).toEqual({
      foo: 'bar',
      bam: 'bow'
    })
  })
})
