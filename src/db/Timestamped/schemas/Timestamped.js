import Joi from '@hapi/joi'

const Timestamped = Joi.object().keys({
  // NOTE BRN: We don't make these required because the validation for creation
  // is done before the timestamps are added.
  createdAt: Joi.object(),
  removedAt: Joi.object().allow(null),
  updatedAt: Joi.object()
})

export default Timestamped
