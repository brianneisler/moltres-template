import createContext from './createContext'
import createEngine from './createEngine'
import getContext from './getContext'
import runSaga from './runSaga'
import setContext from './setContext'

describe('setContext', () => {
  test('sets the context correctly', async () => {
    const engine = createEngine({}, {}, createContext({}))
    const method = function*() {
      yield* setContext('foo', 'bar')
      return yield* getContext()
    }

    expect(await runSaga(engine, method)).toEqual({
      foo: 'bar'
    })
  })
})
