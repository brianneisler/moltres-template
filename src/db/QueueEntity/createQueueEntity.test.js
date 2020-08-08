import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import { Image, createImage, deleteImage } from '../Image'
import { createQueue, deleteQueue } from '../Queue'
import { createUser, deleteUser } from '../User'

import createQueueEntity from './createQueueEntity'
import deleteQueueEntity from './deleteQueueEntity'

const spec = describe('createQueue', () => {
  describe('ServiceAccount', () => {
    let context
    let result
    let adminContext
    let user
    let queue
    let image

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, { state: 'pending' })
      const queueData = {
        userId: user.id
      }
      queue = await createQueue(adminContext, queueData)
      const imageData = {
        contentType: 'image/jpeg',
        hash: '6c6d079d5711b57ce0af901b000be888',
        height: 0,
        length: 0,
        path: '/path/to/image.jpeg',
        storageBucket: 'fitpath-test.appspot.com',
        width: 0
      }
      image = await createImage(context, imageData)
    })

    afterEach(async () => {
      try {
        if (result) {
          await deleteQueueEntity(adminContext, result.id)
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
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    })

    it('can create a QueueEntity', async () => {
      const data = {
        entityId: image.id,
        entityType: Image.name,
        queueId: queue.id
      }
      result = await createQueueEntity(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        entityId: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        entityType: expect.stringMatching(Image.name),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        queueId: queue.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
