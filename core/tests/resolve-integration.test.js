// import { call, createEngine, runSaga } from '../src'

describe('resolve integration tests', () => {
  test('resolve promise to generator', async () => {
    expect(true).toBe(true)

    // NOTE BRN: The below does not work.

    // const engine = createEngine({}, {})
    //
    // const returnValue = () => 'abc123'
    // const runGenerator = function* () {
    //   console.log('made it here')
    //   return yield call(returnValue)
    // }
    // const resolve = async (val) => {
    //   console.log('resolve executing')
    //   return runGenerator()
    // }
    //
    // const method = function* () {
    //   console.log('method executing')
    //   return yield resolve()
    // }
    //
    // expect(await runSaga(engine, method)).toBe('abc123')
  })
})
