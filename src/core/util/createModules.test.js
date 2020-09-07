import createModules from './createModules'

test('createModules correctly combines modules', () => {
  const context = {}

  const modules = {
    bar: (modContext) => {
      expect(modContext).toBe(context)
      return {
        prop: 'bar'
      }
    },
    baz: (modContext) => {
      expect(modContext).toBe(context)
      return {
        prop: 'baz'
      }
    }
  }

  expect(createModules(context, modules)).toEqual({
    bar: {
      prop: 'bar'
    },
    baz: {
      prop: 'baz'
    }
  })
})
