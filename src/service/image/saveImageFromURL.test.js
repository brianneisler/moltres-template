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

      expect(result).toBe({
        createdAt: expect.any(Number),
        id: expect.stringMatching(/^-[a-zA-Z0-9_-]*$/),
        path: expect.any(String),
        removedAt: null,
        updatedAt: expect.any(Number)
      })
    }, 30000)
  })
})
