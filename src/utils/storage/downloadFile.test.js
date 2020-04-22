import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import downloadFile from './downloadFile'

const spec = describe('downloadFile', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
    })

    afterEach(async () => {
      context = await tearDownTestServiceAccountContext(context)
    })

    it('Can download a file', async () => {
      const buffer = await downloadFile(
        context,
        'images/cl2M4TbpJMFvuOY0qoeO/cl2M4TbpJMFvuOY0qoeO.jpeg'
      )
      context.logger.log('buffer:', buffer)
    }, 20000)
  })
})
