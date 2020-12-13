import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import createList from './createList'
import deleteList from './deleteList'

const spec = describe('createList', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteList(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can create a List', async () => {
      result = await createList(context, {
        parentEntityId: null,
        parentEntityType: null
      })
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        parentEntityId: null,
        parentEntityType: null,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
