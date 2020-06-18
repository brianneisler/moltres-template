import { reduce } from '../lang'

const keyValuesById = (vals) =>
  reduce(
    (accum, value) => {
      accum[value.id] = value
      return accum
    },
    {},
    vals
  )

export default keyValuesById
