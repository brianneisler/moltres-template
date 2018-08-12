import createConfig from './createConfig'

describe('createConfig', () => {
  test('creates an empty config object when no modules are given', () => {
    expect(createConfig()).toEqual({})
  })

  test('calls generateConfig method on modules', () => {
    const testContext = {
      foo: 'bar'
    }
    const modules = {
      foo: {
        generateConfig: (context) => {
          expect(context).toBe(testContext)
          return (config) => {
            expect(config).toEqual({})
            return {
              ...config,
              foo: context.foo
            }
          }
        }
      },
      bar: {
        generateConfig: (context) => {
          expect(context).toBe(testContext)
          return (config) => {
            expect(config).toEqual({
              foo: 'bar'
            })
            return {
              ...config,
              bar: 'baz'
            }
          }
        }
      },
      baz: {}
    }
    const config = createConfig(modules, testContext)

    expect(config).toEqual({
      foo: 'bar',
      bar: 'baz'
    })
  })
})
