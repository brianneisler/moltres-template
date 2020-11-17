import { curry, getPath } from 'moltres/lang'

const selectScrollTargetDistanceFromBottom = curry((name, state) =>
  getPath(['scroll', 'targets', name, 'distanceFromBottom'], state)
)

export default selectScrollTargetDistanceFromBottom
