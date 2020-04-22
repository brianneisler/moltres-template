import { createInternalPhoneNumber, deleteInternalPhoneNumber } from '../InternalPhoneNumber'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import getPhoneNumberById from './getPhoneNumberById'

// TODO BRN: Rework this test to use setupTestConfig
const spec = describe('getPhoneNumberById', () => {
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
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      internalPhoneNumber = await createInternalPhoneNumber(context, { phoneNumber: '19282183571' })
    })

    afterEach(async () => {
      try {
        if (internalPhoneNumber) {
          await deleteInternalPhoneNumber(context, internalPhoneNumber.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
    })

    it('finds an PhoneNumber by id', async () => {
      const data = {
        phoneNumber: '19282356681'
      }
      const created = await createInternalPhoneNumber(context, data)
      const result = await getPhoneNumberById(context, created.id)
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
