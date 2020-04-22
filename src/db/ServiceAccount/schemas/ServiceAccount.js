import { Entity } from '../../Entity'
import Joi from '@hapi/joi'

const ServiceAccount = {
  collectionName: 'ServiceAccounts',
  idField: 'uid',
  name: 'ServiceAccount',
  schema: Entity.keys({
    name: Joi.string().required(),
    uid: Joi.string().required()
  })
}

export default ServiceAccount
