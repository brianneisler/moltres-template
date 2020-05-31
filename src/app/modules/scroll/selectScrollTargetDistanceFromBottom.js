import { curry, getPath } from '../../../utils/data'

const selectScrollTargetDistanceFromBottom = curry((name, state) =>
  getPath(['scroll', 'targets', name, 'distanceFromBottom'], state)
)

export default selectScrollTargetDistanceFromBottom
