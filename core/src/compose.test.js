import call from './call'
import compose from './compose'
import createEngine from './createEngine'
import runSaga from './runSaga'

describe('compose', () => {
  test('composes generators for use with redux saga', async () => {
    const engine = createEngine({}, {})
    const add1 = async (val) => new Promise(
      (resolve, reject) => setTimeout(() => resolve(val + 1), 0)
    )
    const method = compose(
      function* (val) {
        return yield call(add1, val)
      },
      (val) => val + 2
    )

    expect(await runSaga(engine, method, 1)).toBe(4)
  })
})
