import Joi from '@hapi/joi'

const Dimensions = {
  schema: Joi.object().keys({
    fontScale: Joi.number()
      .integer()
      .required(),
    height: Joi.number()
      .integer()
      .required(),
    scale: Joi.number()
      .integer()
      .required(),
    width: Joi.number()
      .integer()
      .required()
  }),
  type: 'dimensions.Dimensions'
}

export default Dimensions
