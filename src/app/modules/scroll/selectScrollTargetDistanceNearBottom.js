import { curry, getPath } from 'moltres/lang'

const selectScrollTargetDistanceNearBottom = curry((name, distance, state) => {
  return (
    getPath(['scroll', 'targets', name, 'distanceFromBottom'], state) <=
    distance
  )
})

export default selectScrollTargetDistanceNearBottom
