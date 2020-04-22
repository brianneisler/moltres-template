import { deleteInternalPhoneNumber } from '../InternalPhoneNumber'
import { deletePendingUser, registerPendingUser } from '../../service/auth'
import { generateInternalPhoneNumber } from '../../service/phone_number'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import deleteSMSChannel from './deleteSMSChannel'
import findOrCreateSMSChannel from './findOrCreateSMSChannel'

const TIMEOUT = 20000

const spec = describe('findOrCreateSMSChannel', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let internalPhoneNumber
    let phoneNumber
    let result
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      internalPhoneNumber = await generateInternalPhoneNumber(context, {
        phoneNumber: '19282183571‬'
      })
      ;({ phoneNumber, user } = await registerPendingUser(context, {
        phoneNumber: '19282356681'
      }))
    })

    afterEach(async () => {
      try {
        if (result) {
          await deleteSMSChannel(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deleteInternalPhoneNumber(adminContext, internalPhoneNumber.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deletePendingUser(adminContext, user.id)
          phoneNumber = undefined
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it(
      'can create SMSChannel',
      async () => {
        const data = {
          internalPhoneNumberId: internalPhoneNumber.id,
          userPhoneNumberId: phoneNumber.id
        }
        result = await findOrCreateSMSChannel(context, data)
        expect(result).toEqual({
          createdAt: expect.any(context.firebase.firestore.Timestamp),
          id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
          internalPhoneNumberId: internalPhoneNumber.id,
          updatedAt: expect.any(context.firebase.firestore.Timestamp),
          userPhoneNumberId: phoneNumber.id
        })
      },
      TIMEOUT
    )
  })
})
