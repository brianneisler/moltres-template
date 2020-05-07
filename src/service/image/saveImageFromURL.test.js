import { deleteImage } from '../../db/Image'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import saveImageFromURL from './saveImageFromURL'

const spec = describe('saveImageFromUrl', () => {
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
          await deleteImage(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    test('correctly saves an image from url', async () => {
      result = await saveImageFromURL(context, 'https://s3.amazonaws.com/wat-prod/usgs-girl.jpg')

      expect(result).toEqual({
        contentType: 'image/jpeg',
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: '9af6be7f0c95eda89a408209259e4adcfaa981545fa5074a9b46ff7681f814c7',
        height: 637,
        id: expect.stringMatching(/^[a-zA-Z0-9_-]*$/),
        length: 106129,
        path: expect.any(String),
        removedAt: null,
        storageBucket: expect.any(String),
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        width: 850
      })
    }, 30000)
  })
})
