import { deletePendingUser } from '../auth'
import { deleteSMSChannel } from '../../db/SMSChannel'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import generateInternalPhoneNumber from '../phone_number/generateInternalPhoneNumber'
import generateUserAndSMSChannel from './generateUserAndSMSChannel'

const spec = describe('generateUserAndSMSChannel', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let smsChannel
    let user

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      await generateInternalPhoneNumber(context, { phoneNumber: '19282183571' })
    }, 20000)

    afterEach(async () => {
      try {
        if (smsChannel) {
          await deleteSMSChannel(context, smsChannel.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deletePendingUser(context, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can generate a new User and SMSChannel', async () => {
      const data = {
        unformattedPhoneNumber: '1 (703) 975 8449'
      }

      let phoneNumber
      ;({ phoneNumber, smsChannel, user } = await generateUserAndSMSChannel(
        context,
        data
      ))

      expect(smsChannel).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        internalPhoneNumberId: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userPhoneNumberId: phoneNumber.id
      })
    }, 20000)
  })
})
