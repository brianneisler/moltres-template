import { curry, getPath, split } from '../../utils/lang'

const renderNotification = curry((context, channelType, notification) => {
  const render = getPath(
    [...split('.', notification.type), channelType, 'render'],
    context.notifications
  )
  return render({ context, ...notification })
})

export default renderNotification
