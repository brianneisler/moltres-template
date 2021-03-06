import { StatusCode } from '../../../constants'
import { findRecentChannelContextByChannelId } from '../../../modules/channel_context'
import { generateUserAndSMSChannel } from '../../../modules/sms'
import { saveSMSMessage } from '../../../modules/sms_message'
import { asyncHandler } from '../../../utils/express'
import { getProperty } from '../../../utils/lang'

import {
  generateSMSResponse,
  parseSMSMessage,
  setupSMSCommands,
  verifyTwilioRequest
} from './util'

const REGEX_HI = /^[\s]*hi[\s.!?,]*/i
const containsHiCommand = (text) => text.match(REGEX_HI)

const COMMANDS = {
  hi: {
    exec: async ({ config }) => {
      return {
        media: `${config.api.url}/vcard`,
        message: `Hi! I'm the WAT Duck! Add me to your contacts so that it's easier to communicate. You can send me a photo with the text "wat this?" to add it to WAT ${config.app.url}`
      }
    },
    match: ({ isNewUser, smsMessage }) =>
      isNewUser || containsHiCommand(smsMessage.body)
  }
}

const mod = () => ({
  setupRouter(router, store) {
    const commands = setupSMSCommands(COMMANDS, store)
    router.post(
      '/api/v1/sms',
      asyncHandler(async (request, response) => {
        const { context } = request

        // Only validate that requests came from Twilio when the function has been
        // deployed to production.
        if (process.env.NODE_ENV === 'production') {
          if (!verifyTwilioRequest(context, request)) {
            // Halt early if the request was not sent from Twilio
            return response
              .type('text/plain')
              .status(StatusCode.ACCESS_DENIED)
              .send('Twilio Request Verification Failed.')
              .end()
          }
        }

        const smsMessageData = parseSMSMessage(request.body)

        context.logger.info('SMS Message received - ', smsMessageData)
        const { isNewUser, smsChannel, user } = await generateUserAndSMSChannel(
          context,
          {
            internalPhoneNumber: smsMessageData.to,
            unformattedPhoneNumber: smsMessageData.from
          }
        )

        // NOTE BRN: ChannelContext is optional
        const channelContext = await findRecentChannelContextByChannelId(
          context,
          smsChannel.id
        )

        const smsMessage = await saveSMSMessage(context, {
          ...smsMessageData,
          channelContextId: getProperty('id', channelContext),
          smsChannelId: smsChannel.id
        })

        return generateSMSResponse(context, {
          channelContext,
          commands,
          isNewUser,
          response,
          smsChannel,
          smsMessage,
          user
        })
      })
    )

    return router
  }
})

export default mod
