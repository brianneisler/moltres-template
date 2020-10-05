import { v4 as uuidv4 } from 'uuid'

import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createUser, deleteUser } from '../../user/sdk'

import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'
import getAccessTokenById from './getAccessTokenById'

const spec = describe('getAccessTokenById', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
    }, 20000)

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, user.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (result) {
          await deleteAccessToken(adminContext, result.id)
        }
      } catch (error) {
        context.logger.error(error)
      }
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('finds an AccessToken by id', async () => {
      const data = {
        token: uuidv4(),
        userId: user.id,
        valid: true
      }
      const created = await createAccessToken(context, data)
      result = await getAccessTokenById(context, created.id)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        removedAt: null,
        token: data.token,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id,
        valid: data.valid
      })
    })
  })
})
