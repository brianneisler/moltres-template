import { createUser, deleteUser } from '../User'
import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'
import getAccessTokenById from './getAccessTokenById'
import uuidv4 from 'uuid/v4'

const spec = describe('getAccessTokenById', () => {
  let adminContext
  beforeAll(async () => {
    adminContext = await setupTestAdminContext(spec)
  })

  afterAll(async () => {
    adminContext = await tearDownTestAdminContext(adminContext)
  })

  describe('ServiceAccount', () => {
    let context
    let result
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(context, {
        name: 'test-user',
        state: 'pending'
      })
    })

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
    })

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
        token: data.token,
        updatedAt: expect.any(context.firebase.firestore.Timestamp),
        userId: user.id,
        valid: data.valid
      })
    })
  })
})
