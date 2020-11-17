import { ChannelType, NotificationSendState } from '../../../../constants'
import { createError } from '../../../../modules/error'
import {
  renderNotification,
  validateNotification
} from '../../../../modules/notification'
import {
  createNotificationSend,
  updateNotificationSend
} from '../../../../modules/notification_send'
import {
  generateSMSChannel,
  sendSMSMessageToChannel
} from '../../../../modules/sms'
import { nowTimestamp } from 'moltres/db'
import { call } from 'moltres/redux'

const sendNotification = function* (context, enhancedNotification) {
  const smsChannel = yield call(generateSMSChannel, context, {
    userId: enhancedNotification.userId
  })
  const notificationSend = yield call(createNotificationSend, {
    channels: {
      sms: {
        channelId: smsChannel.id
      }
    },
    errorId: null,
    notificationId: enhancedNotification.id,
    sentAt: null,
    state: NotificationSendState.SENDING,
    userId: enhancedNotification.userId
  })
  // TODO BRN: This is where we would find the user's preferences for
  // notifications and determine whether this notification should be sent and to
  // which channels.
  // NOTE BRN: For right now we just hard code to always sending SMS

  const channelType = ChannelType.SMS

  try {
    // TODO BRN: This needs to be enhanced without being watched. Need to add that
    // feature.
    // const enhancer = enhanceNotification(context, channelType, '$')(identity)
    // notification = yield call(enhancer, notification)
    if (!validateNotification(context, channelType, enhancedNotification)) {
      return yield call(
        updateNotificationSend,
        [enhancedNotification.id, notificationSend.id],
        {
          state: NotificationSendState.ABORTED
        }
      )
    }

    const body = renderNotification(context, channelType, enhancedNotification)
    yield sendSMSMessageToChannel(context, {
      body,
      smsChannel
    })
    return yield call(
      updateNotificationSend,
      [enhancedNotification.id, notificationSend.id],
      {
        sentAt: nowTimestamp(context),
        state: NotificationSendState.COMPLETED
      }
    )
  } catch (error) {
    context.logger.error(error)
    const dbError = yield call(createError, {
      code: error.code,
      message: error.message,
      source: context.source,
      stack: error.stack
    })
    yield call(
      updateNotificationSend,
      [enhancedNotification.id, notificationSend.id],
      {
        errorId: dbError.id,
        state: NotificationSendState.ERROR
      }
    )
  }
}

export default sendNotification
