import { assoc, getProperty, keys, reduce } from '../../utils/lang'

const filterReducers = (modules) =>
  reduce(
    (reducers, key) => {
      const { reducer } = getProperty(key, modules)
      if (reducer) {
        return assoc(key, reducer, reducers)
      }
      return reducers
    },
    {},
    keys(modules)
  )

export default filterReducers
