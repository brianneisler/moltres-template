import reduce from './reduce'

const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reduce((newState, reducer) => reducer(newState, value, ...args), prevState, reducers)

export default reduceReducers
