import { curry, getPath, split, weakMemoize } from '../../../utils/lang'

const enhanceNotification = curry(
  weakMemoize((channelType, statePath) => (next) => {
    return (notification, channel, context, ...rest) => {
      const enhancer = getPath(
        [...split('.', notification.type), channelType, 'enhancer'],
        context.notifications
      )
      if (enhancer) {
        return enhancer(statePath)(next)(notification, ...rest)
      }
      return next(notification, ...rest)
    }
  })
)

export default enhanceNotification
