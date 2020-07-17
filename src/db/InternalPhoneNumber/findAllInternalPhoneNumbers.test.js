import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import findAllInternalPhoneNumbers from './findAllInternalPhoneNumbers'

const spec = describe('findAllInternalPhoneNumbers', () => {
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

    it('throws an error that cache is missing', async () => {
      delete context.cache
      await expect(
        (async () => findAllInternalPhoneNumbers(context))()
      ).rejects.toThrow(/Cache is missing/)
    })
  })
})
