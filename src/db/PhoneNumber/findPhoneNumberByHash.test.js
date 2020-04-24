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
        hash: '5cf11f82c489fc9bbfbe2aada155ac2cbcbca6889bf3670c5b7f74a7945331bc',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: '+1‪9282356681',
        type: 'internal',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
