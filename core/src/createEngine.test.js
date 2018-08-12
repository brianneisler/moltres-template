import createEngine from './createEngine'

describe('createEngine', () => {
  test('correctly creates an engine with no modules', () => {
    const testModules = {}
    const testConfig = { foo: 'bar' }
    const testContext = { bim: ' bop' }
    const engine = createEngine(testModules, testConfig, testContext)

    expect(engine.getModules()).toMatchObject({
      core: expect.any(Object)
    })

    expect(engine.getConfig()).toBe(testConfig)
    expect(engine.getContext()).toBe(testContext)
  })
})
