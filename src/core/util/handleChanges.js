import _ from 'mudash'

export default function handleChanges(handlers, nextValues, values = {}) {
  _.each(handlers, (handler, path) => {
    const value = _.get(values, path)
    const nextValue = _.get(nextValues, path)
    if (!_.isEqual(value, nextValue)) {
      handler(nextValue, value)
    }
  })
}
