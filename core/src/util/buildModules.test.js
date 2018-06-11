import buildModules from './buildModules'

test('buildModules correctly combines modules', () => {
  const modules = {
    foo: (config) => {
      expect(config).toBe('abc')
      return {
        prop: 'foo'
      }
    },
    bar: (config) => {
      expect(config).toBe(undefined)
      return {
        prop: 'bar'
      }
    },
    baz: {
      prop: 'baz'
    }
  }
  const config = {
    foo: 'abc'
  }
  expect(buildModules(modules, config)).toEqual({
    foo: {
      prop: 'foo'
    },
    bar: {
      prop: 'bar'
    },
    baz: {
      prop: 'baz'
    }
  })
})
