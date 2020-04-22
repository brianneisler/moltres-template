import createModules from './createModules'

test('createModules correctly combines modules', () => {
  const config = {
    bim: 'bop',
    foo: 'abc'
  }
  const context = {}

  const modules = {
    bar: (modConfig, modContext) => {
      expect(modConfig).toBe(config)
      expect(modContext).toBe(context)
      return {
        prop: 'bar'
      }
    },
    baz: {
      prop: 'baz'
    }
  }

  expect(createModules(config, context, modules)).toEqual({
    bar: {
      prop: 'bar'
    },
    baz: {
      prop: 'baz'
    }
  })
})
