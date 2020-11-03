import { curry, isUndefined, keys, pick, reject } from '../lang'

const cleanseData = curry((Schema, data) => {
  // TODO BRN: Right now this pick is only shallow against the first layer.
  // Instead it should cleanse deep data as well based on the given schema.
  const fieldNames = keys(Schema.schema.describe().keys)
  return reject(isUndefined, pick(fieldNames, data))
})

export default cleanseData
