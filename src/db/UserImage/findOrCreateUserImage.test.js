import { createImage, deleteImage } from '../Image'
import { createUser, deleteUser } from '../User'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import deleteUserImage from './deleteUserImage'
import findOrCreateUserImage from './findOrCreateUserImage'

const spec = describe('findOrCreateUserImage', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let user
    let image
    let result
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user'
      })
    })

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
    })

    it('can create a UserImage', async () => {
      image = await createImage(context, {
        contentType: 'image/jpeg',
        hash: '6c6d079d5711b57ce0af901b000be888',
        path: '/path/to/image.jpeg',
        storageBucket: 'wat-test.appspot.com'
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
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id
      })
    })
  })
})
