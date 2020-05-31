import { StatusCode } from '../../../constants'
import { asyncHandler } from '../../../utils/express'
import { findRecentChannelContextByChannelId } from '../../../db/ChannelContext'
import { generateSMSResponse, parseSMSMessage, setupSMSCommands } from './util'
import { generateUserAndSMSChannel } from '../../../service/sms'
import { getProp } from '../../../utils/data'
import { saveSMSMessage } from '../../../db/SMSMessage'
import twilio from 'twilio'

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
    match: ({ isNewUser, smsMessage }) => isNewUser || containsHiCommand(smsMessage.body)
  }
}

const mod = {
  setupRouter: (router, store) => {
    const commands = setupSMSCommands(COMMANDS, store)
    const config = store.getConfig()
    router.post(
      '/api/v1/sms',
      asyncHandler(async (request, response) => {
        const { context } = request
        let isValid = true

        // Only validate that requests came from Twilio when the function has been
        // deployed to production.
        if (process.env.NODE_ENV === 'production') {
          isValid = twilio.validateExpressRequest(request, config.sms.authToken, {
            url: `${config.api.url}/sms`
          })
        }

        // Halt early if the request was not sent from Twilio
        if (!isValid) {
          return response
            .type('text/plain')
            .status(StatusCode.ACCESS_DENIED)
            .send('Twilio Request Validation Failed.')
            .end()
        }

        const smsMessageData = parseSMSMessage(request.body)

        context.logger.info('SMS Message received - ', smsMessageData)
        const { isNewUser, smsChannel, user } = await generateUserAndSMSChannel(context, {
          internalPhoneNumber: smsMessageData.to,
          unformattedPhoneNumber: smsMessageData.from
        })

        // NOTE BRN: ChannelContext is optional
        const channelContext = await findRecentChannelContextByChannelId(context, smsChannel.id)

        const smsMessage = await saveSMSMessage(context, {
          ...smsMessageData,
          channelContextId: getProp('id', channelContext),
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
}

export default mod
