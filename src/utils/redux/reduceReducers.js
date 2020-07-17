import reduce from '../lang/reduce'

const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState,
    reducers
  )

export default reduceReducers
