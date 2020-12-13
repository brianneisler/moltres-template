import { curry, getPath, split } from 'moltres/lang'

const validateNotification = curry((context, channelType, notification) => {
  const validate = getPath(
    [...split('.', notification.type), channelType, 'validate'],
    context.notifications
  )
  if (validate) {
    return validate(context, notification)
  }
  return true
})

export default validateNotification
