import { createInternalPhoneNumber, deleteInternalPhoneNumber } from '../InternalPhoneNumber'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import findPhoneNumberByHash from './findPhoneNumberByHash'

const spec = describe('findPhoneNumberByHash', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let internalPhoneNumber

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      internalPhoneNumber = await createInternalPhoneNumber(context, {
        phoneNumber: '19282356681'
      })
    }, 20000)

    afterEach(async () => {
      try {
        await deleteInternalPhoneNumber(context, internalPhoneNumber.id)
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('finds an PhoneNumber by hash', async () => {
      const result = await findPhoneNumberByHash(context, internalPhoneNumber.hash)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: '531cac1ef11ff444d19958b44c90a9b3ac766221324517b044c744d5e8a01b2d',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: '+19282356681',
        removedAt: null,
        type: 'internal',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
