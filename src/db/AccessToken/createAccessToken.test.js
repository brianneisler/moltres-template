import { ACCESS_DENIED } from '../../constants/Code'
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
import { v4 as uuidv4 } from 'uuid'
import createAccessToken from './createAccessToken'
import deleteAccessToken from './deleteAccessToken'

const spec = describe('createAccessToken', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      result = null
    }, 20000)

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
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

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
    let adminContext
    let anonymousContext
    let testContext
    let result
    let user
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      testContext = await setupTestServiceAccountContext(adminContext)
      anonymousContext = await setupTestAnonymousContext(adminContext, testContext)
      user = await createUser(adminContext, {
        name: 'test-user',
        state: 'pending'
      })
      result = null
    }, 20000)

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
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('throws an error when creating an AccessToken', async () => {
      const data = {
        token: uuidv4(),
        userId: user.id,
        valid: true
      }
      result = await expect(createAccessToken(anonymousContext, data)).rejects.toThrow(
        expect.objectContaining({
          code: ACCESS_DENIED
        })
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
