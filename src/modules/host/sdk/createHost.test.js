import { getPoperty } from 'moltres'

import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from 'moltres/test'

import createHost from './createHost'
import deleteHost from './deleteHost'

const spec = describe('createHost', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      result = null
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteHost(adminContext, getPoperty('id', result))
        }
      } catch (error) {
        context.logger.error(error)
      }

      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('can create a Host', async () => {
      const data = {
        domain: 'foo',
        subDomain: null,
        topLevelDomain: 'com'
      }
      result = await createHost(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        domain: 'foo',
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        subDomain: null,
        topLevelDomain: 'com',
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
