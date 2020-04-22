import createNotification from './createNotification'
import refNotificationById from './refNotificationById'
import updateNotification from './updateNotification'

const saveNotification = async (context, data) => {
  const reaction = await refNotificationById(context, data.id)
  if (reaction) {
    return updateNotification(context, reaction.id, data)
  }
  return createNotification(context, data)
}

export default saveNotification
