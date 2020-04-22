import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import findAllInternalPhoneNumbers from './findAllInternalPhoneNumbers'

const spec = describe('findAllInternalPhoneNumbers', () => {
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

    it('throws an error that cache is missing', async () => {
      delete context.cache
      await expect(findAllInternalPhoneNumbers(context)).rejects.toThrow(/Cache is missing/)
    })
  })
})
