import bodyParser from 'body-parser'

import { Code, StatusCode } from '../../../constants'
import { withConfig, withContext } from '../../../core'
import { registerValidUser } from '../../../modules/auth'
import { UserRegisteredAction } from '../../../modules/auth/schemas'
import { getPhoneNumberById } from '../../../modules/phone_number'
import {
  generateSMSChannel,
  generateUserAndSMSChannel,
  sendSMSMessageToChannel
} from '../../../modules/sms'
import {
  createSMSChallenge,
  getSMSChallengeById,
  updateSMSChallenge
} from '../../../modules/sms_challenge'
import { findUserPhoneNumberByPhoneNumberId } from '../../../modules/user_phone_number'
import { findUserRoleByUserId } from '../../../modules/user_role'
import { createCustomToken } from '../../../utils/auth'
import { nowTimestamp } from '../../../utils/db'
import { expected } from '../../../utils/error'
import { asyncHandler } from '../../../utils/express'
import { assoc, compose } from '../../../utils/lang'
import { handleAction, takeEvery } from '../../../utils/redux'
import { parseDuration } from '../../../utils/time'

import { randomSMSCode, sendSMSChallenge } from './util'

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const mod = () => ({
  *run() {
    yield takeEvery(
      UserRegisteredAction.type,
      handleAction(
        enhance(function* (context, action) {
          const { config } = context
          const { payload } = action
          if (payload.method === 'sms') {
            const smsChannel = yield generateSMSChannel(context, {
              userPhoneNumberId: payload.data.phoneNumberId
            })
            yield sendSMSMessageToChannel(context, {
              body: `Hi, I'm the WAT Duck! Thanks for joining WAT! Add me to your contacts so that it's easier to communicate. You can send me a photo with the text "wat this?" to add it to WAT ${config.app.url}`,
              media: `${config.api.url}/vcard`,
              smsChannel
            })
          }
        })
      )
    )
  },

  setupRouter(router) {
    const jsonParser = bodyParser.json()

    router.post(
      '/api/v1/auth/sms',
      jsonParser,
      asyncHandler(async (request, response) => {
        const { context } = request
        const payload = request.body
        const { phoneNumber, smsChannel } = await generateUserAndSMSChannel(
          context,
          {
            unformattedPhoneNumber: payload.phoneNumber
          }
        )
        const smsChallenge = await createSMSChallenge(context, {
          code: randomSMSCode(6),
          expiresIn: '10m',
          phoneNumberId: phoneNumber.id,
          smsChannelId: smsChannel.id,
          valid: true
        })
        await sendSMSChallenge(context, { smsChallenge, smsChannel })
        return response.json({
          smsChallengeId: smsChallenge.id
        })
      })
    )

    router.post(
      '/api/v1/auth/sms/:smsChallengeId',
      jsonParser,
      asyncHandler(async (request, response) => {
        // https://firebase.google.com/docs/auth/admin/create-custom-tokens
        // https://firebase.google.com/docs/auth/admin/verify-id-tokens

        const { adminContext, context } = request
        const { code } = request.body
        const { smsChallengeId } = request.params

        const smsChallenge = await getSMSChallengeById(context, smsChallengeId)

        // NOTE BRN: We purposely return both non-existent SMSChallenges and and
        // wrong codes as 403 to obscure whether an SMSChallenge exists or not.
        if (!smsChallenge || code !== smsChallenge.code) {
          throw expected({
            code: Code.ACCESS_DENIED,
            message: 'Access code was incorrect',
            statusCode: StatusCode.ACCESS_DENIED
          })
        }

        if (
          !smsChallenge.valid ||
          context.system.now() >
            smsChallenge.createdAt.toMillis() +
              parseDuration(smsChallenge.expiresIn)
        ) {
          throw expected({
            code: Code.ACCESS_DENIED,
            message: 'Access code has expired',
            statusCode: StatusCode.ACCESS_DENIED
          })
        }

        if (smsChallenge.usedAt) {
          throw expected({
            code: Code.ACCESS_DENIED,
            message: 'Access code has already been used',
            statusCode: StatusCode.ACCESS_DENIED
          })
        }

        // - server validates the received code from client matches the code on the
        //   challenge
        // - if code matches
        //   - server checks for existing user that owns phone number
        //   - if no user exists
        //     - server checks challenge for existing claims of phone number by user
        //       accounts.
        //     - if a claim exists
        //       - server upgrades PhoneNumberClaim to UserPhoneNumber
        //     - else
        //       - server creates a user account
        //   - server generates firebase custom access token
        //   - server returns firebase custom access token

        const phoneNumber = await getPhoneNumberById(
          context,
          smsChallenge.phoneNumberId,
          {
            includeRemoved: true
          }
        )
        if (!phoneNumber) {
          throw expected({
            code: Code.NOT_FOUND,
            message: 'Phone number does not exist',
            statusCode: StatusCode.NOT_FOUND
          })
        }

        const userPhoneNumber = await findUserPhoneNumberByPhoneNumberId(
          context,
          smsChallenge.phoneNumberId,
          { includeRemoved: true }
        )

        let uid
        if (userPhoneNumber) {
          if (userPhoneNumber.removedAt) {
            throw expected({
              code: Code.ACCESS_DENIED,
              message:
                'This phone number has been disabled. Please contact support@wat.app.',
              statusCode: StatusCode.ACCESS_DENIED
            })
          }
          uid = userPhoneNumber.userId
        } else {
          if (phoneNumber.removedAt) {
            throw expected({
              code: Code.ACCESS_DENIED,
              message:
                'This phone number has been disabled. Please contact support@wat.app.',
              statusCode: StatusCode.ACCESS_DENIED
            })
          }
          const { user } = await registerValidUser(context, {
            phoneNumber: phoneNumber.phoneNumber
          })
          uid = user.id
        }

        await updateSMSChallenge(context, smsChallenge.id, {
          usedAt: nowTimestamp(context)
        })

        let claims = {}
        const role = await findUserRoleByUserId(context, uid)
        if (role) {
          claims = assoc('role', role.role, claims)
        }
        const token = await createCustomToken(adminContext, uid, claims)
        return response.json({
          token
        })
      })
    )

    return router
  }
})

export default mod
