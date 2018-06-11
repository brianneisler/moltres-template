import { assoc, keys, prop, reduce } from 'ramda'

const filterReducers = (modules) => reduce(
  (reducers, key) => {
    const { reducer } = prop(key, modules)
    if (reducer) {
      return assoc(key, reducer, reducers)
    }
    return reducers
  },
  {},
  keys(modules)
)

export default filterReducers
