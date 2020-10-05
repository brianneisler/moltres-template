import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { Image, createImage, deleteImage } from '../../image'
import { createQueue, deleteQueue } from '../../queue'

import createQueueEntity from './createQueueEntity'
import deleteQueueEntity from './deleteQueueEntity'

const spec = describe('createQueueEntity', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    let queue
    let image

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      queue = await createQueue(adminContext, {
        parentEntityId: null,
        parentEntityType: null
      })
      image = await createImage(context, {
        contentType: 'image/jpeg',
        hash: '6c6d079d5711b57ce0af901b000be888',
        height: 0,
        length: 0,
        path: '/path/to/image.jpeg',
        storageBucket: 'fitpath-test.appspot.com',
        width: 0
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
        if (image) {
          await deleteImage(adminContext, image.id)
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
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create a QueueEntity', async () => {
      const data = {
        entityId: image.id,
        entityType: Image.name,
        index: 0,
        queueId: queue.id
      }
      result = await createQueueEntity(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        entityId: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        entityType: expect.stringMatching(Image.name),
        id: '0',
        index: 0,
        queueId: queue.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    }, 20000)
  })
})
