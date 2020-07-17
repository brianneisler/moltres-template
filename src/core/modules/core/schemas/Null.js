import Joi from '@hapi/joi'

const Null = {
  name: 'core.Null',
  schema: Joi.any().valid(null)
}

export default Null
