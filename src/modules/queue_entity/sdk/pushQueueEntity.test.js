import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import { createQueue, deleteQueue, getQueueById } from '../../queue'
import { User, createUser, deleteUser } from '../../user'

import deleteQueueEntity from './deleteQueueEntity'
import pushQueueEntity from './pushQueueEntity'

const spec = describe('pushQueueEntity', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    let user
    let queue

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, { state: 'pending' })
      queue = await createQueue(context, {
        parentEntityId: null,
        parentEntityType: null
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteQueueEntity(adminContext, [queue.id, result.id])
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (queue) {
          await deleteQueue(adminContext, queue.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can push a QueueEntity', async () => {
      const data = {
        entityId: user.id,
        entityType: User.name,
        queueId: queue.id
      }
      result = await pushQueueEntity(context, data)
      const queueResult = await getQueueById(context, queue.id)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        entityId: user.id,
        entityType: User.name,
        id: '0',
        index: 0,
        queueId: queue.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
      expect(queueResult).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        headIndex: 0,
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        length: 1,
        parentEntityId: null,
        parentEntityType: null,
        removedAt: null,
        tailIndex: 0,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
