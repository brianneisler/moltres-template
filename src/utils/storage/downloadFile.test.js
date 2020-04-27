import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import downloadFile from './downloadFile'

const spec = describe('downloadFile', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
    }, 20000)

    afterEach(async () => {
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('Can download a file', async () => {
      const buffer = await downloadFile(
        context,
        'images/cl2M4TbpJMFvuOY0qoeO/cl2M4TbpJMFvuOY0qoeO.jpeg'
      )
      context.logger.log('buffer:', buffer)
    }, 20000)
  })
})
