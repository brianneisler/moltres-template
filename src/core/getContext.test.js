import generateEngine from './generateEngine'
import getContext from './getContext'
import runSaga from './runSaga'

describe('getContext', () => {
  test('gets the whole context when no args are given', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getContext()
    }

    expect(await runSaga(engine, method)).toEqual(
      expect.objectContaining(testContext)
    )
  })

  test('gets the specified context path correctly', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getContext('bim')
    }

    expect(await runSaga(engine, method)).toEqual('bop')
  })

  test('executes the given selector function on the context', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getContext((context) => ({
        it: context.bim
      }))
    }

    expect(await runSaga(engine, method, testContext)).toEqual({
      it: 'bop'
    })
  })

  test('returns the whole context when undefined', async () => {
    const testContext = {
      bim: 'bop',
      foo: 'bar',
      source: 'https://moltres.io/test'
    }
    const engine = generateEngine({}, testContext)
    const method = function* () {
      return yield* getContext()
    }

    expect(await runSaga(engine, method, testContext)).toEqual(
      expect.objectContaining(testContext)
    )
  })
})
