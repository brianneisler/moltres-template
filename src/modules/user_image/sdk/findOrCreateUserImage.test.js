import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'
import { createImage, deleteImage } from '../../image'
import { createUser, deleteUser } from '../../user'

import deleteUserImage from './deleteUserImage'
import findOrCreateUserImage from './findOrCreateUserImage'

const spec = describe('findOrCreateUserImage', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let user
    let image
    let result

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        state: 'pending'
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteUserImage(context, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (image) {
          await deleteImage(context, image.id)
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

    it('can create a UserImage', async () => {
      image = await createImage(context, {
        contentType: 'image/jpeg',
        hash: '6c6d079d5711b57ce0af901b000be888',
        height: 480,
        length: 32000,
        path: '/path/to/image.jpeg',
        storageBucket: 'wat-test.appspot.com',
        width: 640
      })
      const data = {
        imageId: image.id,
        userId: user.id
      }
      result = await findOrCreateUserImage(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        imageId: image.id,
        removedAt: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    })
  })
})
