import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const Host = {
  collectionName: 'Hosts',
  name: 'Host',
  schema: Entity.keys({
    domain: Joi.string().required(),
    subDomain: Joi.string().allow(null).required(),
    topLevelDomain: Joi.string().required()
  })
}

export default Host
