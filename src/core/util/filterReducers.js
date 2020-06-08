import { assoc, getProp, keys, reduce } from '../../utils/data'

const filterReducers = (modules) =>
  reduce(
    (reducers, key) => {
      const { reducer } = getProp(key, modules)
      if (reducer) {
        return assoc(key, reducer, reducers)
      }
      return reducers
    },
    {},
    keys(modules)
  )

export default filterReducers
