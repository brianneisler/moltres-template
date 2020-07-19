import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import {
  createInternalPhoneNumber,
  deleteInternalPhoneNumber
} from '../InternalPhoneNumber'

import getPhoneNumberById from './getPhoneNumberById'

// TODO BRN: Rework this test to use setupTestConfig
const spec = describe('getPhoneNumberById', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let internalPhoneNumber

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      internalPhoneNumber = await createInternalPhoneNumber(context, {
        phoneNumber: '19282183571'
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (internalPhoneNumber) {
          await deleteInternalPhoneNumber(context, internalPhoneNumber.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('finds an PhoneNumber by id', async () => {
      const data = {
        phoneNumber: '19282356681'
      }
      const created = await createInternalPhoneNumber(context, data)
      const result = await getPhoneNumberById(context, created.id)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash:
          '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: '+19282356681',
        removedAt: null,
        type: 'internal',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
