import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'

import createUser from './createUser'
import deleteUser from './deleteUser'

const spec = describe('createUser', () => {
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
          await deleteUser(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create an User', async () => {
      const data = {
        name: undefined,
        state: 'pending'
      }
      result = await createUser(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        state: 'pending',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
