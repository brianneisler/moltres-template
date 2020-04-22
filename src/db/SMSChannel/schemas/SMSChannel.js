import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

const SMSChannel = {
  collectionName: 'SMSChannels',
  indexes: [['userPhoneNumberId', 'internalPhoneNumberId']],
  name: 'SMSChannel',
  schema: Entity.keys({
    internalPhoneNumberId: id().required(),
    userPhoneNumberId: id().required()
  })
}

export default SMSChannel
