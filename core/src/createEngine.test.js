import createEngine from './createEngine'

describe('createEngine', () => {
  test('correctly creates an engine with no modules', () => {
    const testModules = {}
    const testConfig = { foo: 'bar' }
    const engine = createEngine(testModules, testConfig)

    expect(engine.getModules()).toMatchObject({
      core: expect.any(Object)
    })

    expect(engine.getConfig()).toBe(testConfig)
  })
})
