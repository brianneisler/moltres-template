import { cancelled, createEngine, stop, take } from '../src'

describe('integration: start and stop engine', () => {
  test('starts the engine and calls the setup and start methods', async () => {
    let wasCancelled = false
    const testModule = {
      run: function*() {
        try {
          yield take('NEVER_GONNA_HAPPEN')
        } finally {
          if (yield cancelled()) {
            wasCancelled = true
          }
        }
      },
      finally: jest.fn(),
      setup: jest.fn(),
      start: jest.fn(),
      stop: jest.fn()
    }
    const engine = createEngine(
      {
        test: testModule
      },
      {}
    )

    expect(testModule.setup).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.start).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    await stop(engine)

    expect(testModule.stop).toHaveBeenCalledWith(engine, testModule)
    expect(testModule.finally).toHaveBeenCalledWith(engine, testModule)
    expect(wasCancelled).toBe(true)
  })
})
