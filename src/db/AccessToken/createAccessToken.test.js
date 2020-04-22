import { createUser, deleteUser } from '../User'
import { prop } from 'ramda'
import {
  setupTestAdminContext,
  setupTestAnonymousContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestAnonymousContext,
  tearDownTestServiceAccountContext
} from '../../test'
import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'
import uuidv4 from 'uuid/v4'

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
    let result
    let user
    beforeEach(async () => {
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      result = null
    })

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (result) {
          await deleteAccessToken(adminContext, prop('id', result))
        }
      } catch (error) {
        context.logger.error(error)
      }

      context = await tearDownTestServiceAccountContext(context)
    })

    it('can create an AccessToken', async () => {
      const data = {
        token: uuidv4(),
        userId: user.id,
        valid: true
      }
      result = await createAccessToken(context, data)
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

    it('throws an error when token is incorrect', async () => {
      const data = {
        token: 'abc',
        userId: user.id,
        valid: true
      }
      result = await expect(createAccessToken(context, data)).rejects.toThrow(
        /^"token" must be a valid GUID/
      )
    })
  })

  describe('Anonymous user', () => {
    let anonymousContext
    let testContext
    let result
    let user
    beforeEach(async () => {
      testContext = await setupTestServiceAccountContext(adminContext)
      anonymousContext = await setupTestAnonymousContext(adminContext, testContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      result = null
    })

    afterEach(async () => {
      try {
        if (user) {
          await deleteUser(adminContext, prop('id', user))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      try {
        if (result) {
          await deleteAccessToken(adminContext, prop('id', result))
        }
      } catch (error) {
        testContext.logger.error(error)
      }
      testContext = await tearDownTestServiceAccountContext(testContext)
      anonymousContext = await tearDownTestAnonymousContext(anonymousContext)
    })

    it('throws an error when creating an AccessToken', async () => {
      const data = {
        token: uuidv4(),
        userId: user.id,
        valid: true
      }
      result = await expect(createAccessToken(anonymousContext, data)).rejects.toThrow(
        /Missing or insufficient permissions/
      )
    })

    it('throws an error when token is incorrect', async () => {
      const data = {
        token: 'abc',
        userId: user.id,
        valid: true
      }
      result = await expect(createAccessToken(anonymousContext, data)).rejects.toThrow(
        /"token" must be a valid GUID/
      )
    })
  })
})
