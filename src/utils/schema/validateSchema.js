import Joi from '@hapi/joi'

import { assocPath, createPath, curry, getProp, keys, reduce } from '../lang'

const validateSchema = curry(({ schema }, data) => {
  data = reduce(
    (accum, key) => assocPath(createPath(key), getProp(key, data), accum),
    {},
    keys(data)
  )
  return Joi.attempt(data, schema)
})

export default validateSchema
