/**
 * @jest-environment node
 */

import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../test'
import setupSSRApp from './setupSSRApp'

const spec = describe('createAccessToken', () => {
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

    it('renders SSR app without error', async () => {
      const render = setupSSRApp()

      expect(typeof render).toBe('function')

      const request = {
        context,
        originalUrl: '/'
      }
      const result = await render(request)

      expect(result).toMatchSnapshot()
    })
  })
})
