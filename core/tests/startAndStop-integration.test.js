import { cancelled, createEngine, take } from '../src'

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

    expect(testModule.setup).toHaveBeenCalledWith(engine)
    expect(testModule.start).toHaveBeenCalledWith(engine)
    expect(testModule.stop).not.toHaveBeenCalled()
    expect(wasCancelled).toBe(false)

    engine.stop()

    expect(testModule.stop).toHaveBeenCalledWith(engine)
    expect(wasCancelled).toBe(true)
  })
})
