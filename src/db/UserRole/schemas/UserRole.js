import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const UserRole = {
  collectionName: 'UserRoles',
  idField: 'userId',
  name: 'UserRole',
  schema: Entity.keys({
    role: Joi.string().valid('admin').required(),
    userId: id().required()
  })
}

export default UserRole
