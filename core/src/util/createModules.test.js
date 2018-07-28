import createModules from './createModules'

test('createModules correctly combines modules', () => {
  const bim = {
    createModule: (config, name, creator) => {
      expect(creator).toBe(bim)
      expect(config).toBe('bop')
      expect(name).toBe('bim')
      return {
        prop: 'bim'
      }
    }
  }
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
    },
    bim
  }
  const config = {
    foo: 'abc',
    bim: 'bop'
  }
  expect(createModules(config, modules)).toEqual({
    foo: {
      prop: 'foo'
    },
    bar: {
      prop: 'bar'
    },
    baz: {
      prop: 'baz'
    },
    bim: {
      prop: 'bim'
    }
  })
})
