import createModules from './createModules'

test('createModules correctly combines modules', () => {
  const context = {
    foo: 'bar'
  }

  const modules = {
    bar: (modContext) => {
      expect(modContext).toEqual(expect.objectContaining(context))
      return {
        prop: 'bar'
      }
    },
    baz: (modContext) => {
      expect(modContext).toEqual(expect.objectContaining(context))
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
