import createNotificationSend from './createNotificationSend'
import refNotificationSendById from './refNotificationSendById'
import updateNotificationSend from './updateNotificationSend'

const saveNotificationSend = async (context, data) => {
  const ids = [data.notificationId, data.id]
  const notificationSend = await refNotificationSendById(context, ids)
  if (notificationSend) {
    return updateNotificationSend(context, ids, data)
  }
  return createNotificationSend(context, data)
}

export default saveNotificationSend
