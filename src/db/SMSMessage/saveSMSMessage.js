import { SMSMessage } from './schemas'
import { cleanseData } from '../../utils/db'
import { validateSchema } from '../../utils/schema'
import createSMSMessage from './createSMSMessage'
import findSMSMessageById from './findSMSMessageById'
import updateSMSMessage from './updateSMSMessage'

const saveSMSMessage = async (context, data) => {
  const value = validateSchema(SMSMessage, cleanseData(data))
  const existingSMSMessage = await findSMSMessageById(context, value.messageSid, {
    includeRemoved: true
  })

  if (existingSMSMessage) {
    return updateSMSMessage(context, existingSMSMessage.id, value)
  }
  return createSMSMessage(context, value)
}

export default saveSMSMessage
