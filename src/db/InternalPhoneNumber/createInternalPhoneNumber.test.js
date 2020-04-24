import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import createInternalPhoneNumber from './createInternalPhoneNumber'
import deleteInternalPhoneNumber from './deleteInternalPhoneNumber'

const spec = describe('createInternalPhoneNumber', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteInternalPhoneNumber(context, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }

      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create an InternalPhoneNumber', async () => {
      result = await createInternalPhoneNumber(context, {
        phoneNumber: '1 928 235 6682'
      })
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: 'e4870af8d7c53ee588608ae35b86ec4baabcb5e545f1b133717f5ed2d06e1ad4',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        phoneNumber: '+19282356682',
        removedAt: null,
        type: 'internal',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
