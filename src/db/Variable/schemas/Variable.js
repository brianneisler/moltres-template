import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const Variable = {
  collectionName: 'Variables',
  name: 'Variable',
  schema: Entity.keys({
    value: Joi.any()
  })
}

export default Variable
