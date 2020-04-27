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

const spec = describe('setupSSRApp', () => {
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
