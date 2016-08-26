import _ from 'mudash'

export default function mapReducer(mapped) {
  return (state, action) => {
    return _.reduce(mapped, (currentState, reducer, path) => {
      const currentStatePart = _.get(state, path)
      const nextStatePart = reducer(currentState, action)
      if (_.isEqual(currentStatePart, nextStatePart)) {
        return currentState
      }
      return _.set(currentState, path, nextStatePart)
    }, state)
  }
}
