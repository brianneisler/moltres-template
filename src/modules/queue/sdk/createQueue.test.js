// import { createUser, deleteUser } from '../User'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import createQueue from './createQueue'
import deleteQueue from './deleteQueue'

const spec = describe('createQueue', () => {
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
          await deleteQueue(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can create a Queue', async () => {
      const data = {
        parentEntityId: null,
        parentEntityType: null
      }
      result = await createQueue(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        headIndex: 0,
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        length: 0,
        parentEntityId: null,
        parentEntityType: null,
        removedAt: null,
        tailIndex: -1,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
